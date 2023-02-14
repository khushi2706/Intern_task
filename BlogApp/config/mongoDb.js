const { MongoClient } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "BlogApp"

const client = new MongoClient(connectionURL)

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect()
    } catch (error) {
      console.log("error ")
    }
  },
  getDB: function () {
    return client.db(databaseName)
  },
}
