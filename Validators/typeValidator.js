const isNumber = (data) => typeof data == "number"

const isString = (data) => typeof data == "string"

const isObject = (data) => typeof data == "object"

const isBool = (data) => typeof data == "boolean"

const isDate = (data) => data.constructor == Date

const isArray = (data) => data.constructor == Array

const isFun = (data) => typeof data == "function"

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
      return undefined
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
console.log("====================================")
