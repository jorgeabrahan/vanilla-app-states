export const determinePossibleValuesType = (possibleValues: (string | number)[]) => {
  if (possibleValues.every((pv) => typeof pv === 'string')) return 'string'
  if (possibleValues.every((pv) => typeof pv === 'number')) return 'number'
  return 'unknown'
}
const isPossibleValuesValid = (possibleValues: (string | number)[], type: string) => {
  const isAnArray = possibleValues instanceof Array
  const isNotAnArrayError = 'The "possible values" of an enum state must be an array'
  if (!isAnArray) {
    console.error(isNotAnArrayError)
    return false
  }
  const isAnEmptyArray = possibleValues.length === 0
  const isEmptyArrayError = 'The "possible values" of an enum state must NOT be an empty array'
  if (isAnEmptyArray) {
    console.error(isEmptyArrayError)
    return false
  }
  const hasInvalidItem = type === 'unknown' || (type !== 'string' && type !== 'number')
  const hasInvalidItemError =
    'The "possible values" of an enum state must be an array of strings or numbers'
  if (hasInvalidItem) {
    console.error(hasInvalidItemError)
    return false
  }
  return true
}
const isInitialStateValid = <T>(initial: T, possibleValuesType: string) => {
  const isInvalidType = typeof initial !== possibleValuesType
  const isInvalidTypeError = `The "initial value" of your enum state must be a ${possibleValuesType}`
  if (isInvalidType) {
    console.error(isInvalidTypeError)
    return false
  }
  return true
}
const isUpdateStateValid = <T>(
  state: T,
  possibleValues: (string | number)[],
  possibleValuesType: string
) => {
  const isInvalidType = typeof state !== possibleValuesType
  const isInvalidTypeError = `The "state" of your enum state must be a ${possibleValuesType}`
  if (isInvalidType) {
    console.error(isInvalidTypeError)
    return false
  }
  const isNotAPossibleValue = !possibleValues.includes(state as string | number)
  const isNotAPossibleValueError = `The "state" of your enum state must be one of the possible values`
  if (isNotAPossibleValue) {
    console.error(isNotAPossibleValueError)
    return false
  }
  return true
}

export const enumStateValidators = {
  isPossibleValuesValid,
  isInitialStateValid,
  isUpdateStateValid
}

const isIdValid = (id: string) => {
  const isNotString = typeof id !== 'string'
  const isNotStringError = 'The "id" of your state must be of type string'
  if (isNotString) {
    console.error(isNotStringError)
    return false
  }
  const isEmptyString = id === ''
  const isEmptyStringError = 'The "id" of your state must be a non-empty string'
  if (isEmptyString) {
    console.error(isEmptyStringError)
    return false
  }
  return true
}
const isWrapperValid = (wrapper: HTMLElement) => {
  const isInstanceOfHTMLElement = wrapper instanceof HTMLElement
  const isNotInstanceOfHTMLElementError =
    'The "wrapper" of your state must be an instance of HTMLElement'
  if (!isInstanceOfHTMLElement) {
    console.error(isNotInstanceOfHTMLElementError)
    return false
  }
  return true
}

export const stateValidators = {
  isIdValid,
  isWrapperValid
}

export const stateErrorMessages = {
  couldNotCreate: 'An error occurred while creating the state',
  couldNotUpdate: 'An error occurred while updating the state'
}
