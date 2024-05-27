import { State } from "../../State"

const isContentToRenderValid = (content: string) => {
  const isInvalidType = typeof content !== 'string'
  const isInvalidTypeError = 'The "content" to render in the DOM must be a string'
  if (isInvalidType) {
    console.error(isInvalidTypeError)
    return false
  }
  return true
}
const isShowIfAttributeValid = <T>(state: State<T>, showIfAttr: string) => {
  const isNotEnumState = !state.isEnum
  const isNotEnumStateError = 'The "data-show-if" attribute is only supported for enum states'
  if (isNotEnumState) {
    console.error(isNotEnumStateError)
    return false
  }
  // the attribute from the element will always be a string
  // but if the possibile values of the state are numbers, then the show if attribute 'string' should be treated as a number
  // therefore the `rightTypeShowIfAttr` variable will store the show if attribute but with the right type
  // that means if possible values are strings then it will be a string, if possible values are numbers then it will be a number
  let rightTypeShowIfAttr: string | number = showIfAttr
  if (state.possibleValuesType === 'number') {
    // if possible values are numbers, then showIfAttr must be a number
    rightTypeShowIfAttr = Number(showIfAttr)
    const isNotANumber = isNaN(rightTypeShowIfAttr)
    const isNotANumberError = 'The "data-show-if" attribute must be a number if possible values are numbers'
    if (isNotANumber) {
      console.error(isNotANumberError)
      return false
    }
  }
  const isNotAPossibleValue = !state.possibleValues.includes(rightTypeShowIfAttr)
  const isNotAPossibleValueError = 'The "data-show-if" attribute must be one of the possible values of the state'
  if (isNotAPossibleValue) {
    console.error(isNotAPossibleValueError)
    return false
  }
  return true
}

export const domManagerValidators = {
  isContentToRenderValid,
  isShowIfAttributeValid
}

export const domManagerErrorMessages = {
  couldNotUpdateStateInDOM: 'An error occurred while updating the state in the DOM'
}
