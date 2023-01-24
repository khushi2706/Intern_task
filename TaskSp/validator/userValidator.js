const userSchema = {
  name: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
}
const { CheckType } = require("./typeValidator")

const VerifyUser = (user) => {
  let finalAns = true // variable to check the all field types

  // itrate the schema
  for (let key in userSchema) {
    // if require object
    if (userSchema[key].require && user[key] == undefined) {
      return false
    }
    if (user[key]) {
      typeof userSchema[key] == "string"
        ? (finalAns = finalAns && user[key] == user[key].trim())
        : (finalAns = finalAns && CheckType(user[key], userSchema[key].type))
    }
  }
  return finalAns
}

module.exports = VerifyUser
