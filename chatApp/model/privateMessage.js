const db = require("../utils/connectMongo")

const getMessageInPrivate = async (resp, username) => {
  const PrivateMsg = db.getDB().collection("PrivateMsg")
  const messages = await PrivateMsg.find({
    $or: [
      { $and: [{ sender: username }, { reciver: resp }] },
      { $and: [{ sender: resp }, { reciver: username }] },
    ],
  })
    .sort({ date: 1 })
    .toArray()
  return messages
}

const storeInPrivateChat = async (username, message, recipient) => {
  const PrivateMsg = db.getDB().collection("PrivateMsg")

  const msg = await PrivateMsg.insertOne({
    sender: username,
    reciver: recipient,
    message,
    date: Date.now(),
  })
  console.log(msg)
}

module.exports = { getMessageInPrivate, storeInPrivateChat }
