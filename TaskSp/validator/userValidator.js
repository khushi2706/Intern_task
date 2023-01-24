const db = require("../config/config")
const userSchema = {
  name: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
    require: true,
    unique: true,
  },
  password: {
    type: "string",
    require: true,
  },
}

const { CheckType } = require("./typeValidator")

const VerifyUser = async (user) => {
  let finalAns = true // variable to check the all field types

  // itrate the schema
  for (let key in userSchema) {
    // if require object
    if (userSchema[key].unique) {
      const User = await db.getDB().collection("users")
      const count = await User.find({ [key]: user[key] }).count()

      if (count != 0) return false
    }
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
