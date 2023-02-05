const Redis = require("ioredis")
const redis = new Redis({
  host: process.env.URL_REDIS,
  port: 15439,
  password: process.env.PASSWORD_REDIS,
})

const addNewClientId = (username, socketId) => {
  redis.exists(username, async (err, reply) => {
    if (reply == 1) {
      const valueOfArr = (await getListOfClientId(username)) || []
      console.log(valueOfArr)
      valueOfArr.push(socketId)
      await redis.hset(username, "Ids", JSON.stringify(valueOfArr))
    } else {
      let arr = [socketId]
      const res = await redis.hset(username, "Ids", JSON.stringify(arr))
    }
  })
}

const getListOfClientId = async (username) => {
  console.log(username)
  const value = await redis.hget(username, "Ids", (err, value) => {
    console.log(JSON.parse(value))
    return JSON.parse(value)
  })
  return JSON.parse(value)
}

module.exports = { addNewClientId, getListOfClientId }
