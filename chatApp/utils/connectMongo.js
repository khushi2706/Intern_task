const { MongoClient } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "ChatApp"

let _db
module.exports = {
  connectToServer: async function (callback) {
    try {
      const client = new MongoClient(connectionURL)
      await client.connect()
      _db = client.db(databaseName)
    } catch (error) {
      console.log("error ")
    }
  },

  getDB: function () {
    return _db
  },
}
