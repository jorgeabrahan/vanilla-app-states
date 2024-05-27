import morphdom from 'morphdom'
import { State } from './State'
import { domManagerErrorMessages, domManagerValidators } from './utils/DOMManager/utils'

export class DOMManager<T> {
  #state: State<T>
  #elementsUsingState: HTMLElement[]

  constructor(state: State<T>) {
    this.#state = state
    this.#elementsUsingState = Array.from(
      this.#state.wrapper.querySelectorAll(`[data-state="${this.#state.id}"]`)
    )
  }
  #renderContentFromOnRender(state: T, element: HTMLElement) {
    const contentToRender = this.#state.onRender(state)
    if (!domManagerValidators.isContentToRenderValid(contentToRender))
      return console.error(domManagerErrorMessages.couldNotUpdateStateInDOM)
    const clonedElement = element.cloneNode() as HTMLElement
    clonedElement.innerHTML = contentToRender
    morphdom(element, clonedElement)
  }
  #conditionallyShowElementBasedOnShowIfAttr(state: T, element: HTMLElement) {
    const showIfAttr = element.getAttribute('data-show-if') ?? ''
    if (!domManagerValidators.isShowIfAttributeValid(this.#state, showIfAttr))
      return console.error(domManagerErrorMessages.couldNotUpdateStateInDOM)
    element.style.display = `${state}` === showIfAttr ? '' : 'none'
  }
  #conditionallyShowElementBasedOnBooleanState(state: boolean, element: HTMLElement) {
    const display = state ? '' : 'none'
    if (element.style.display === display) return
    element.style.display = display
  }
  #renderContentFromState(state: string | number | bigint, element: HTMLElement) {
    if (typeof state === 'object') return // to prevent eslint warning
    const newContent = `${state}`
    if (element.textContent === newContent) return
    element.textContent = newContent
  }
  updateElements(state: T) {
    const updateElement = (elementUsingState: HTMLElement) => {
      if (this.#state.isUsingOnRender) {
        this.#renderContentFromOnRender(state, elementUsingState)
        return
      }
      if (elementUsingState.getAttribute('data-show-if') != null) {
        this.#conditionallyShowElementBasedOnShowIfAttr(state, elementUsingState)
        return
      }
      if (typeof state === 'boolean') {
        this.#conditionallyShowElementBasedOnBooleanState(state, elementUsingState)
        return
      }
      if (typeof state === 'string' || typeof state === 'number' || typeof state === 'bigint') {
        this.#renderContentFromState(state, elementUsingState)
      }
    }
    this.#elementsUsingState.forEach(updateElement)
  }
}