const mongoose = require("mongoose")

const Schema = mongoose.Schema

const accountSchema = new Schema({
  accountName: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },

  accountId: {
    type: String,
    require: true,
  },
  accessToken: {
    type: String,
    require: true,
  },
  profileUniqueId: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    require: true,
  },

  loginId: {
    type: String,
    require: true,
    unique: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, // which user has login to this account (not sure about)
})

accountSchema.set("timestamps", true)

module.exports = mongoose.model("Account", accountSchema)
