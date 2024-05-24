export class DOMUpdatesHandler<T> {
  #stateElements: HTMLElement[]
  #stateWrapper: HTMLElement
  #state: State<T>
  constructor(state: State<T>, stateWrapper: HTMLElement) {
    this.#state = state
    this.#stateWrapper = stateWrapper
    this.#stateElements = Array.from(
      this.#stateWrapper.querySelectorAll(`[data-state="${this.#state.id}"]`)
    )
  }
  updateDOMElements(state: T) {
    for (const element of this.#stateElements) {
      if (this.#state.isCustomRenderEnabled) {
        this.#handleCustomStateRendering(state, element)
        continue
      }
      this.#handleSingleValueStateRendering(state, element)
    }
  }
  #handleCustomStateRendering(state: T, element: HTMLElement) {
    // rendering state content with the onRender function
    const content = this.#state.onRender(state)
    if (typeof content !== 'string') throw new Error('onRender must return a string')
    if (element.innerHTML !== content) element.innerHTML = content
  }
  #handleSingleValueStateRendering(state: T, element: HTMLElement) {
    if (typeof state === 'string' || typeof state === 'number' || typeof state === 'bigint') {
      const newContent = `${state}`
      // if newContent is the same as the current content, do nothing
      if (element.textContent === newContent) return
      // otherwise, update the text content of the element
      element.textContent = newContent
      return
    }
    if (typeof state === 'boolean') {
      // boolean states are used to toggle the visibility of an element
      const display = state ? '' : 'none'
      if (element.style.display === display) return
      element.style.display = display
    }
  }
}

export class State<T> {
  #stateId: string
  #stateInitial: T
  #stateCurrent: T
  onStateChange: (state: T, prevState: T) => void
  onRender: (state: T) => string
  #possibleValues: (string | number)[]
  // this value determines if a possible values array is used
  #isEnum: boolean
  #isCustomRenderEnabled: boolean
  #domHandler: DOMUpdatesHandler<T>

  // since stateId and stateCurrent are readonly properties
  // they are declared as private and a getter is provided
  get id(): string {
    return this.#stateId
  }
  get current(): T {
    return this.#stateCurrent
  }
  get isCustomRenderEnabled(): boolean {
    return this.#isCustomRenderEnabled
  }
  get isEnum(): boolean {
    return this.#isEnum
  }
  get possibleValues(): (string | number)[] {
    return this.#possibleValues
  }
  constructor({
    id,
    initial,
    wrapper = document.body,
    onChange = () => {},
    onRender,
    possibleValues
  }: {
    id: string
    initial: T
    wrapper?: HTMLElement
    onChange?: (state: T, prevState: T) => void
    onRender?: (state: T) => string
    possibleValues?: (string | number)[]
  }) {
    if (!id || typeof id !== 'string') throw new Error('id must be a non-empty string')
    if (!(wrapper instanceof HTMLElement))
      throw new Error('stateWrapper must be an instance of HTMLElement')

    this.#stateId = id
    this.#stateInitial = initial
    this.#stateCurrent = initial
    this.onStateChange = onChange
    // if a possible values array is provided, then the state will be considered an enum
    // therefore when setting the state, the value must be one of the possible values
    this.#isEnum = possibleValues != null
    if (possibleValues != null) {
      this.#possibleValues = possibleValues
      this.#validatePossibleValues()
    } else this.#possibleValues = []
    // if an onRender function is provided, it will be used to render the state
    // therefore 'custom rendering' will be enabled
    // otherwise, the default rendering will be used
    this.#isCustomRenderEnabled = onRender != null
    if (onRender != null) this.onRender = onRender
    else this.onRender = () => ``
    // create an dom handler instance to manage the DOM updates
    this.#domHandler = new DOMUpdatesHandler(this, wrapper)
    // update dom elements with the initial state
    this.#domHandler.updateDOMElements(this.#stateCurrent)
  }
  #validatePossibleValues() {
    if (!(this.#possibleValues instanceof Array)) {
      throw new Error('possibleValues must be an array')
    }
    if (this.#possibleValues.some((value) => typeof value !== 'string' && typeof value !== 'number'))
      throw new Error('possibleValues must be an array of strings or numbers')
    if (this.#possibleValues.length === 0) throw new Error('possibleValues must NOT be an empty array')
    // currently, the possible values array must be a string or a number
    // therefore the state could only be set to a string or a number
    if (typeof this.#stateInitial !== 'string' && typeof this.#stateInitial !== 'number')
      throw new Error('initial must be a string or a number if possibleValues is provided')
  }
  // this is the only method that changes the stateCurrent property
  // also, it triggers the onStateChange callback with the current and previous states
  #changeState(state: T) {
    const prevState = this.#stateCurrent
    this.#stateCurrent = state
    this.onStateChange(state, prevState)
  }
  // this method is used to change the state value and update the DOM
  update(state: T) {
    // if the state is an enum, then the state must be of type string or number
    // also the state must be one of the possible values
    if (this.#isEnum) {
      if (typeof state !== 'string' && typeof state !== 'number') {
        console.error('State must be a string or a number to match one of the possible values')
        return
      }
      if (!this.#possibleValues.includes(state)) {
        console.error(
          `State must be one of the possible values ${JSON.stringify(this.#possibleValues)}`
        )
        return
      }
    }
    this.#domHandler.updateDOMElements(state)
    this.#changeState(state)
  }
  // this method resets the state to the initial state
  reset() {
    this.#changeState(this.#stateInitial)
    this.#domHandler.updateDOMElements(this.#stateCurrent)
  }
}
