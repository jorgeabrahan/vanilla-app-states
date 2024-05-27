import { DOMManager } from './DOMManager'
import {
  determinePossibleValuesType,
  enumStateValidators,
  stateErrorMessages,
  stateValidators
} from './utils/State/utils'

export class State<T> {
  #isEnum: boolean
  #possibleValues: (string | number)[]
  #possibleValuesType: string

  #preserve: boolean

  #id: string
  #initial: T
  #current: T
  #wrapper: HTMLElement

  onChange: (state: T, prevState: T) => void
  #isUsingOnRender: boolean
  onRender: (state: T) => string

  #domManager: DOMManager<T>

  constructor({
    id,
    initial,
    wrapper,
    onChange,
    onRender,
    possibleValues,
    preserve
  }: {
    id: string
    initial: T
    wrapper?: HTMLElement
    onChange?: (state: T, prevState: T) => void
    onRender?: (state: T) => string
    possibleValues?: (string | number)[]
    preserve?: boolean
  }) {
    const stateWrapper = wrapper ?? document.body
    if (!stateValidators.isIdValid(id)) throw new Error(stateErrorMessages.couldNotCreate)
    if (!stateValidators.isWrapperValid(stateWrapper)) throw new Error(stateErrorMessages.couldNotCreate)

    this.#id = id
    this.#initial = initial
    this.#preserve = preserve ?? false
    this.#wrapper = stateWrapper
    const currentStateValue = (() => {
      if (this.#preserve) {
        const lsState = localStorage.getItem(id)
        if (lsState !== null) return JSON.parse(lsState) as T
      }
      return initial
    })()
    this.#current = currentStateValue
    this.onChange = onChange ?? (() => {})

    this.#isEnum = possibleValues != null
    this.#possibleValues = possibleValues ?? []
    const possibleValuesType = possibleValues != null
      ? determinePossibleValuesType(possibleValues)
      : 'unknown'
    this.#possibleValuesType = possibleValuesType
    if (possibleValues != null) {
      if (!enumStateValidators.isPossibleValuesValid(possibleValues, possibleValuesType))
        throw new Error(stateErrorMessages.couldNotCreate)
      if (!enumStateValidators.isInitialStateValid(initial, possibleValuesType))
        throw new Error(stateErrorMessages.couldNotCreate)
    }
    this.#isUsingOnRender = onRender != null
    this.onRender = onRender ?? (() => ``)

    this.#domManager = new DOMManager(this)
    this.#domManager.updateElements(currentStateValue)
  }
  #changeState(state: T) {
    const prevState = this.#current
    this.#current = state // this property is only changed in this method
    this.onChange(state, prevState)
  }
  update(state: T) {
    if (this.#isEnum) {
      if (
        !enumStateValidators.isUpdateStateValid(
          state,
          this.#possibleValues,
          this.#possibleValuesType
        )
      )
        return console.error(stateErrorMessages.couldNotUpdate)
    }
    this.#domManager.updateElements(state)
    this.#changeState(state)
    if (this.#preserve) localStorage.setItem(this.#id, JSON.stringify(state))
  }
  reset() {
    this.#domManager.updateElements(this.#initial)
    this.#changeState(this.#initial)
    if (this.#preserve) localStorage.removeItem(this.#id)
  }

  get id() {
    return this.#id
  }
  get current() {
    return this.#current
  }
  get isUsingOnRender() {
    return this.#isUsingOnRender
  }
  get isEnum() {
    return this.#isEnum
  }
  get possibleValues() {
    return this.#possibleValues
  }
  get possibleValuesType() {
    return this.#possibleValuesType
  }
  get wrapper() {
    return this.#wrapper
  }
}
