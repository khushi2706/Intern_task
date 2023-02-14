const db = require("../config/mongoDb")
const User = db.getDB().collection("users")
const insertUser = async (data) => await User.insertOne(data)
const findUser = async (data) => await User.findOne(data)
const countUser = async (data) => await User.countDocuments(data)
const updateUser = async (cond, data) => await User.updateOne(cond, data)
const deleteUser = async (data) => await User.deleteMany(data)
module.exports = { insertUser, findUser, countUser, updateUser, deleteUser }
