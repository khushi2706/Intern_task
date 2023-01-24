const isNumber = (data) => {
  if (isNaN(data)) return false
  if (data == Infinity) return false

  return typeof Number(data) === "number"
}

const isString = (data) => typeof data === "string"

const isObject = (data) => {
  if (data == null) return false
  if (data.constructor != Object) return false
  return typeof data === "object"
}

const isBool = (data) => typeof data === "boolean"

const isDate = (data) => data.constructor === Date

const isArray = (data) => Array.isArray(data)

const isFun = (data) => typeof data === "function"

module.exports = {
  isArray,
  isDate,
  isBool,
  isFun,
  isNumber,
  isString,
  isObject,
}
