const express = require("express")
const app = express()
const { Account } = require("./model/account")
const { Client } = require("./model/client")
const { User } = require("./model/users")
const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/MongoPrac")
  .then(() => {
    console.log("connected!")
  })
  .catch((err) => {
    console.log("error")
  })

app.listen(5000)
