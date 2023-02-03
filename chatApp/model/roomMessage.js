const db = require("../utils/connectMongo")

const getMessageInRoom = async (room) => {
  const RoomMsg = db.getDB().collection("RoomMsg")
  const messages = await RoomMsg.find({ room: room })
    .sort({ date: 1 })
    .toArray()
  return messages
}

const storeInRoom = async (room, message, from) => {
  const RoomMsg = db.getDB().collection("RoomMsg")

  const msg = await RoomMsg.insertOne({
    room,
    message,
    from,
    date: Date.now(),
  })
  console.log(msg)
}

module.exports = { getMessageInRoom, storeInRoom }
