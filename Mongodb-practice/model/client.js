const mongoose = require("mongoose")

const Schema = mongoose.Schema

const clientSchema = new Schema({
  clientId: {
    type: String,
    require: true,
  },
  autoApprove: {
    type: Number,
    require: true,
  },
  appDesc: {
    type: String,
    require: true,
  },
  appWeb: {
    type: String,
    require: true,
  },
  secret: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
})

clientSchema.set("timestamps", true)

module.exports = mongoose.model("Client", clientSchema)
