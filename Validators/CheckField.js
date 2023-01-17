import { CheckType } from "./typeValidator.js"

const objSchema = {
  name: {
    type: "string",
  },
  email: {
    type: "string",
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
  age: {
    type: "number",
  },
}

function checkField(obj) {
  let finalAns = true // variable to check the all field types

  // itrate the schema
  for (let key in objSchema) {
    // if require object
    if (objSchema[key].require && obj[key] == undefined) {
      return false
    }
    if (obj[key]) {
      typeof objSchema[key] == "string"
        ? (finalAns = finalAns && obj[key] == obj[key].trim())
        : (finalAns = finalAns && CheckType(obj[key], objSchema[key].type))
    }
  }
  return finalAns
}

let obj = {
  name: "khushi",
  email: "khushi@mail.com",
  password: "abc",
}

console.log(checkField(obj))
