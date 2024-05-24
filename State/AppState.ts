export class DOMUpdatesHandler<T> {
  #stateElements: HTMLElement[]
  #stateId: string
  #stateWrapper: HTMLElement
  #isCustomRenderEnabled: boolean
  #onRender: (state: T) => string
  constructor(
    stateId: string,
    stateWrapper: HTMLElement,
    isCustomRenderEnabled: boolean,
    onRender: (state: T) => string
  ) {
    this.#stateId = stateId
    this.#stateWrapper = stateWrapper
    this.#isCustomRenderEnabled = isCustomRenderEnabled
    this.#stateElements = Array.from(
      this.#stateWrapper.querySelectorAll(`[data-state="${this.#stateId}"]`)
    )
    this.#onRender = onRender
  }

  updateDOMElements(state: T) {
    for (const element of this.#stateElements) {
      if (this.#isCustomRenderEnabled) {
        this.#handleObjectStateRendering(state, element)
        continue
      }
      this.#handleSingleValueStateRendering(state, element)
    }
  }
  #handleObjectStateRendering(state: T, element: HTMLElement) {
    if (typeof state !== 'object') return
    const content = this.#onRender(state)
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
  constructor({
    id,
    initial,
    wrapper = document.body,
    onChange = () => {},
    onRender
  }: {
    id: string
    initial: T
    wrapper?: HTMLElement
    onChange?: (state: T, prevState: T) => void
    onRender?: (state: T) => string
  }) {
    if (!id || typeof id !== 'string') throw new Error('id must be a non-empty string')
    if (!(wrapper instanceof HTMLElement))
      throw new Error('stateWrapper must be an instance of HTMLElement')

    this.#stateId = id
    this.#stateInitial = initial
    this.#stateCurrent = initial
    this.onStateChange = onChange
    // if an onRender function is provided, it will be used to render the state
    // therefore 'custom rendering' will be enabled
    // otherwise, the default rendering will be used
    this.#isCustomRenderEnabled = onRender != null
    if (onRender != null) this.onRender = onRender
    else this.onRender = () => ``
    // create an dom handler instance to manage the DOM updates
    this.#domHandler = new DOMUpdatesHandler(
      id,
      wrapper,
      this.#isCustomRenderEnabled,
      this.onRender
    )
    // update dom elements with the initial state
    this.#domHandler.updateDOMElements(this.#stateCurrent)
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
    this.#domHandler.updateDOMElements(state)
    this.#changeState(state)
  }
  // this method resets the state to the initial state
  reset() {
    this.#changeState(this.#stateInitial)
    this.#domHandler.updateDOMElements(this.#stateCurrent)
  }
}
