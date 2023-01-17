import { isObject, isString } from "./validators.js"
function converter(data) {
  if (isObject(data)) return JSON.stringify(data)
  else if (isString(data)) {
    try {
      return JSON.parse(data)
    } catch (error) {
      return undefined
    }
  }
  return undefined
}

let obj = {
  name: "khushi",
  age: 20,
}
let str = `{"name":"khushi","age":20}`
//let str = "khushieeeyuihks"
console.log(converter(obj))
console.log(converter(str))
