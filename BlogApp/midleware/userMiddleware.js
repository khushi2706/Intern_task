const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../config/mongoDb")
const Secret = "thisIsSecretMessage!"
const { sendResponse } = require("../utills/sendResponse")

const updateRoleMid = async (ctx, next) => {
  const jwtToken = ctx.header.authtoken
  const Decrypt = jwt.verify(jwtToken, Secret)
  ctx.state.ownerID = Decrypt.id
  if (Decrypt.userType != "owner") {
    return sendResponse(ctx, 401, { success: false, msg: "Unauthorized !" })
  }
  await next()
}

const allowAccessMid = async (ctx, next) => {
  const jwtToken = ctx.header.authtoken
  const Decrypt = jwt.verify(jwtToken, Secret)
  ctx.state.myId = Decrypt.id
  // ctx.state.userType = Decrypt.userType
  if (Decrypt.userType == "owner") return await next()

  return sendResponse(ctx, 401, { success: false, msg: "Unauthorized !" })
}

const checkUser = async (ctx, next) => {
  const jwtToken = ctx.header.authtoken

  const Decrypt = jwt.verify(jwtToken, Secret)

  // check that user type is owner or not

  ctx.state.ownerId = Decrypt.id
  if (
    Decrypt.userType == "owner" ||
    Decrypt.userType == "manager" ||
    Decrypt.userType == "admin"
  ) {
    return await next()
  }
  return sendResponse(ctx, 401, { success: false, msg: "Unauthorized !" })
}
module.exports = { updateRoleMid, allowAccessMid, checkUser }
