const db = require("../config/mongoDb")
const Verifyblog = require("../validator/blogValidator")
const { sendResponse } = require("../utills/sendResponse")
const { verify } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const { BSON } = require("mongodb")
const Secret = "thisIsSecretMessage!"

const addBlogMid = async (ctx, next) => {
  try {
    const jwtToken = ctx.header.authtoken
    const Decrypt = jwt.verify(jwtToken, Secret)
    ctx.state.myID = Decrypt.id
    const id = Decrypt.id
    const { owenerId } = ctx.request.body
    if (Decrypt.userType == "cs") {
      const cs = User.findOne({
        $and: [{ _id: new BSON.ObjectId(id) }, { "type.ownerId": owenerId }],
      })
    }

    return await next()
  } catch (e) {
    return sendResponse(ctx, 400, e)
  }
}

const updateBlogMid = async (ctx, next) => {
  try {
    const jwtToken = ctx.header.authtoken
    const Decrypt = jwt.verify(jwtToken, Secret)
    const myId = Decrypt.id
    const { blogId } = ctx.request.body
    const Blog = await db.getDB().collection("blogs")
    const asCheck = Blog.countDocuments({
      _id: new BSON.ObjectId(blogId),
      writenBy: myId,
    })

    if (Decrypt.userType == "owner" || asCheck) return await next()

    return sendResponse(ctx, 400, "anAuthrized!")
  } catch (error) {
    return sendResponse(ctx, 400, error)
  }
}

const checkLogin = async (ctx, next) => {
  try {
    const jwtToken = ctx.header.authtoken
    const Decrypt = jwt.verify(jwtToken, Secret)
    ctx.state.id = Decrypt.id
    ctx.state.userType = Decrypt.userType
    if (Decrypt.userType == "owner" || Decrypt.userType == "admin")
      return await next()
  } catch (error) {
    console.log(error)
    return sendResponse(ctx, 400, error)
  }
}
module.exports = {
  addBlogMid,
  updateBlogMid,
  checkLogin,
}
