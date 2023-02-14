const { sendResponse } = require("../utills/sendResponse")
const jwt = require("jsonwebtoken")
const Secret = "thisIsSecretMessage!"

const checkLogin = async (ctx, next) => {
  try {
    const jwtToken = ctx.header.authtoken
    const Decrypt = jwt.verify(jwtToken, Secret)
    ctx.state.id = Decrypt.id
    ctx.state.userType = Decrypt.userType
    ctx.state.ownerId = Decrypt.ownerId || Decrypt.id
    return await next()
  } catch (error) {
    console.log(error)
    return sendResponse(ctx, 400, error)
  }
}

module.exports = { checkLogin }
