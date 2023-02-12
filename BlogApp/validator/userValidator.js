const db = require("../config/mongoDb")
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

      if (count != 0) return { isValid: false, message: "User Already exist" }
    }
    if (userSchema[key].require && user[key] == undefined) {
      return { isValid: false, message: `${key} is require !` }
    }
    if (user[key]) {
      typeof userSchema[key] == "string"
        ? (finalAns = finalAns && user[key] == user[key].trim())
        : (finalAns = finalAns && CheckType(user[key], userSchema[key].type))
    }
  }
  return { isValid: finalAns, message: "Not Valid" }
}

module.exports = VerifyUser
