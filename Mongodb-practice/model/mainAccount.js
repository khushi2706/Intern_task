const mongoose = require("mongoose")

const Schema = mongoose.Schema

const mainAccountSchema = new Schema({
  // _id , admin of company

  accountName: {
    type: String,
    require: true,
  },

  isActive: {
    type: Boolean,
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
})

module.exports = mongoose.model("MainAccount", mainAccountSchema)
