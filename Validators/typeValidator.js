import {
  isArray,
  isDate,
  isBool,
  isFun,
  isNumber,
  isString,
  isObject,
} from "./validators.js"

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

console.log("====================================")
console.log(CheckType("89", "string"))
console.log(CheckType({ name: "khushi" }, "object"))
console.log(CheckType([4, 2, 32], "Array"))
console.log(CheckType(328493492, "number"))
console.log(CheckType(new Date(), "date"))
console.log(CheckType(true, "boolean"))
console.log(CheckType(CheckType, "function"))
console.log("-------------")
console.log(CheckType(NaN, "number"))
console.log(CheckType(+Infinity, "number"))
console.log(CheckType("123", "number"))
console.log(CheckType(null, "object"))
console.log(CheckType([], "object"))
console.log("====================================")
