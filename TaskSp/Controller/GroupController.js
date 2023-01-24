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
    return sendResponse(ctx, 401, { success: false, msg: "Anauthorized !" })
  }

  const group = { title, decs, listOfMember }

  if (!VerifyGroup(group)) {
    return sendResponse(ctx, 401, { success: false, msg: "Enter valid Data!" })
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
    return sendResponse(ctx, 401, { success: false, error })
  }
}

const viewAllGroup = async (ctx) => {
  const jwtToken = ctx.header.authtoken
  const Decrypt = jwt.verify(jwtToken, Secret)

  if (Decrypt.userType != "owner") {
    return sendResponse(ctx, 401, { success: false, msg: "Anauthorized !" })
  }
  try {
    const Group = db.getDB().collection("group")
    const groups = await Group.find({}).toArray()

    return sendResponse(ctx, 200, { success: true, groups })
  } catch (error) {
    return sendResponse(ctx, 401, { success: false, error })
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
      return sendResponse(ctx, 400, { success: false, msg: "Anauthorized !" })
    }

    return sendResponse(ctx, 200, { success: true, group })
  } catch (error) {
    return sendResponse(ctx, 400, { success: false, error })
  }
}

module.exports = { addNewGroup, viewAllGroup, viewGroup }
