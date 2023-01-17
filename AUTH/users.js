let users = []
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const fs = require("fs")

fs.readFile("./user.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
    users = JSON.parse(jsonString)
  } catch (err) {
    console.log("Error parsing JSON string:", err)
  }
})

function getUsers() {
  return users
}

function saveUser(user) {
  user["email"] = user["email"].trim()
  const emailRegX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  let email = user["email"]
  let phnNo = user["mNum"]

  if (!emailRegX.test(email)) throw Error("Enter valid Email")
  // check for
  if (phnNo.length != 10) throw Error("Phone Number length should be 10")
  users.forEach((user) => {
    if (user.email == email) {
      throw Error("Email must be unique!")
    }
  })

  let encrpt = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(user.password)
  )

  user.password = encrpt

  const token = jwt.sign({ _id: user.email }, "thisissecretemsg", {
    expiresIn: "7 days",
  })

  user["token"] = token

  users.push(user)
  saveFile()

  return token
}

function loginUser(user) {
  const email = user.email

  console.log("====================================")
  console.log(email)
  console.log("====================================")

  const finduser = users.filter((user) => user.email == email)

  console.log(finduser)
  if (finduser.length == 0) {
    throw Error("incorrect Email")
  }

  let encrpt = finduser[0].password.toString()
  let decript = CryptoJS.enc.Base64.parse(encrpt).toString(CryptoJS.enc.Utf8)

  if (decript != user.password) throw Error("incorrect password")

  const token = jwt.sign({ _id: user.email }, "thisissecretemsg", {
    expiresIn: "7 days",
  })

  user["token"] = token

  saveFile()
  return token
}

function saveFile() {
  const jsonString = JSON.stringify(users)
  fs.writeFile("./user.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err)
    } else {
      console.log("Successfully wrote file")
    }
  })
}

function getMe(token) {
  const decode = jwt.verify(token, "thisissecretemsg")
  console.log("====================================")
  console.log(decode)
  console.log("====================================")
  const user = users.filter((user) => user.email == decode._id)
  if (user.length == 0) {
    throw Error("UnAuthenticated !")
  }
  return user[0]
}

function deleteMe(token) {
  const decode = jwt.verify(token, "thisissecretemsg")

  const index = users.findIndex((user) => user.email == decode._id)
  if (index == -1) {
    throw Error("UnAuthenticated !")
  }
  users.splice(index, 1)
  saveFile()
}
const Users = function () {}

Users.prototype.getUsers = getUsers
Users.prototype.saveUser = saveUser
Users.prototype.loginUser = loginUser
Users.prototype.getMe = getMe
Users.prototype.deleteMe = deleteMe
module.exports = new Users()
