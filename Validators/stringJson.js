import { isObject, isString } from "./validators.js"
function converter(data) {
  if (isString(data)) {
    try {
      return JSON.parse(data)
    } catch (error) {
      return undefined
    }
  }
  return JSON.stringify(data)
}

let obj = {
  name: "khushi",
  age: 20,
}
let str = `{"name":"khushi","age":20}`
let num = 329832
//let str = "khushieeeyuihks"
console.log(converter(obj))
console.log(converter(str))
console.log(typeof converter(num))
