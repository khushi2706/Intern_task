const isNumber = (data) => {
  if (isNaN(data)) return false
  if (data == Infinity) return false

  return typeof Number(data) === "number"
}

const isString = (data) => typeof data === "string"

const isObject = (data) => {
  if (data == null) return false
  if (isDate(data) || isArray(data)) return false
  return typeof data === "object"
}

const isBool = (data) => typeof data === "boolean"

const isDate = (data) => data.constructor === Date

const isArray = (data) => Array.isArray(data)

const isFun = (data) => typeof data === "function"

export { isArray, isDate, isBool, isFun, isNumber, isString, isObject }
