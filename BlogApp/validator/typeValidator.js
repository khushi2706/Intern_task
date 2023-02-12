const {
  isArray,
  isDate,
  isBool,
  isFun,
  isNumber,
  isString,
  isObject,
} = require("./validators.js")
function CheckType(data, type) {
  switch (type.toLowerCase()) {
    case "string":
      return isString(data)
    case "number":
      return isNumber(data)
    case "object":
      return isObject(data)
    case "boolean":
      return isBool(data)
    case "date":
      return isDate(data)
    case "array":
      return isArray(data)
    case "function":
      return isFun(data)
    default:
      return typeof data === type
  }
}

module.exports = { CheckType }
