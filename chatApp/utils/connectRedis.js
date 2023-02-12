const Redis = require("redis")
let redis
try {
  redis = Redis.createClient(6379, "127.0.0.1")
  redis.connect()
  redis.on("connection", () => {
    console.log("connected!")
  })
} catch (error) {}

const addNewClientId = async (username, socketId) => {
  try {
    let reply = await redis.exists(username)

    console.log(reply)
    if (reply == 1) {
      const valueOfArr = (await getListOfClientId(username)) || []
      console.log(valueOfArr)
      valueOfArr.push(socketId)
      await redis.hSet(username, "Ids", JSON.stringify(valueOfArr))
    } else {
      console.log("in else part")
      let arr = [socketId]
      const res = await redis.hSet(username, "Ids", JSON.stringify(arr))
    }
  } catch (error) {
    console.log(error)
  }
}

const getListOfClientId = async (username) => {
  console.log(username)
  const value = await redis.hGet(username, "Ids")
  return JSON.parse(value)
}

const removeTheId = async (username, key) => {
  const valueOfArr = await getListOfClientId(username)
}
module.exports = { addNewClientId, getListOfClientId }
