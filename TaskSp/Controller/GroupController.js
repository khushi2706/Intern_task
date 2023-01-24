const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../config/config")
const VerifyGroup = require("../validator/groupValidator")
const { ObjectID } = require("bson")
const Secret = "thisIsSecretMessage!"

const addNewGroup = async (ctx) => {
  const { title, decs, listOfMember } = ctx.request.body

  const jwtToken = ctx.header.authtoken

  const Decrypt = jwt.verify(jwtToken, Secret)

  if (Decrypt.userType != "owner") {
    ctx.status = 400
    ctx.body = "Unauthorized!"
    return
  }

  const group = { title, decs, listOfMember }

  if (!VerifyGroup(group)) {
    ctx.status = 400
    ctx.body = {
      success: false,
      messgage: "Please add Valid Data",
    }
    return
  }

  try {
    const Group = db.getDB().collection("group")
    Group.insert(group)

    ctx.status = 200
    ctx.body = {
      success: true,
      messgage: "Group Added Successfully!",
    }
    return
  } catch (error) {
    ctx.status = 400
    ctx.body = { success: false, error }
  }
}

const viewAllGroup = async (ctx) => {
  const jwtToken = ctx.header.authtoken
  const Decrypt = jwt.verify(jwtToken, Secret)

  if (Decrypt.userType != "owner") {
    ctx.status = 400
    ctx.body = "Unauthorized!"
    return
  }
  try {
    const Group = db.getDB().collection("group")
    const groups = await Group.find({}).toArray()

    ctx.status = 200
    ctx.body = {
      success: true,
      groups,
    }
    return
  } catch (error) {
    ctx.status = 400
    ctx.body = { success: false, error }
  }
}

const viewGroup = async (ctx) => {
  const jwtToken = ctx.header.authtoken
  const Decrypt = jwt.verify(jwtToken, Secret)

  const userId = Decrypt.id
  const groupId = ctx.params.groupId
  const userType = Decrypt.userType

  try {
    const Group = db.getDB().collection("group")
    const group = await Group.findOne({ _id: new ObjectID(groupId) })

    if (userType != "owner" && !group.listOfMember.includes(userId)) {
      ctx.status = 400
      ctx.body = {
        success: false,
        messgage: "You're not authenticated !",
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      success: true,
      group,
    }
    return
  } catch (error) {
    ctx.status = 400
    ctx.body = { success: false, error }
  }
}

module.exports = { addNewGroup, viewAllGroup, viewGroup }
