const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["team", "admin", "owner"],
  },
})

userSchema.set("timestamps", true)

module.exports = mongoose.model("User", userSchema)
