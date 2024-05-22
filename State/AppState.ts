const isOneOfType = (types: string[], value: any) => types.some((type) => typeof value === type)

class DOMHandler<T> {
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
    this.#stateElements = Array.from(
      this.#stateWrapper.querySelectorAll(`[data-state="${this.#stateId}"]`)
    )
    this.#isCustomRenderEnabled = isCustomRenderEnabled
    this.#onRender = onRender
  }

  updateElements(state: T) {
    for (const element of this.#stateElements) {
      if (this.#isCustomRenderEnabled) {
        this.#handleCustomRendering(state, element);
        continue
      }
      this.#handleNativeRendering(state, element);
    }
  }
  #handleCustomRendering(state: T, element: HTMLElement) {
    const content = this.#onRender(state)
    if (typeof content === 'string') {
      if (element.innerHTML !== content) {
        element.innerHTML = content
      }
    } else {
      throw new Error('onRender must return a string')
    }
  }

  #handleNativeRendering(state: T, element: HTMLElement) {
    const types = ['string', 'number', 'bigint']
    if (isOneOfType(types, state)) {
      const newContent = `${state}`
      if (element.textContent !== newContent) {
        element.textContent = newContent
      }
    } else if (typeof state === 'boolean') {
      const display = state ? '' : 'none'
      if (element.style.display !== display) {
        element.style.display = display
      }
    }
  }
}

export class AppState<T> {
  #stateId: string
  #stateInitial: T
  #stateCurrent: T
  onStateChange: (state: T, prevState: T) => void
  onRender: (state: T) => string
  #isCustomRenderEnabled: boolean
  #domHandler: DOMHandler<T>
  get stateId(): string {
    return this.#stateId
  }
  get stateCurrent(): T {
    return this.#stateCurrent
  }
  constructor({
    stateId,
    stateWrapper = document.body,
    stateInitial,
    onStateChange = () => {},
    onRender
  }: {
    stateId: string
    stateWrapper: HTMLElement
    stateInitial: T
    onStateChange?: (state: T, prevState: T) => void
    onRender?: (state: T) => string
  }) {
    if (!stateId || typeof stateId !== 'string') {
      throw new Error('stateId must be a non-empty string')
    }
    if (!(stateWrapper instanceof HTMLElement)) {
      throw new Error('stateWrapper must be an instance of HTMLElement')
    }
    this.#stateId = stateId
    this.#stateInitial = stateInitial
    this.#stateCurrent = stateInitial
    this.onStateChange = onStateChange
    this.#isCustomRenderEnabled = onRender != null
    if (onRender != null) this.onRender = onRender
    else this.onRender = () => ``
    this.#domHandler = new DOMHandler(
      stateId,
      stateWrapper,
      this.#isCustomRenderEnabled,
      this.onRender
    )
    this.#domHandler.updateElements(this.#stateCurrent)
  }
  #changeState(state: T) {
    const prevState = this.#stateCurrent
    this.#stateCurrent = state
    this.onStateChange(state, prevState)
  }
  updateState(state: T) {
    this.#changeState(state)
    this.#domHandler.updateElements(this.#stateCurrent)
  }
  setInitialState() {
    this.#changeState(this.#stateInitial)
    this.#domHandler.updateElements(this.#stateCurrent)
  }
}
