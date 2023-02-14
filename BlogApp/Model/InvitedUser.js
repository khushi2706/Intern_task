const db = require("../config/mongoDb")
const invitedUser = db.getDB().collection("invitedUser")

const insertInvUser = async (data) => await invitedUser.insertOne(data)
const deleteInvUser = async (data) => await invitedUser.deleteOne(data)

module.exports = { insertInvUser, deleteInvUser }
