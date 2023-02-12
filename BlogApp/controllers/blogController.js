const db = require("../config/mongoDb")
const Verifyblog = require("../validator/blogValidator")
const { sendResponse } = require("../utills/sendResponse")
const { verify } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const { BSON } = require("mongodb")
const Secret = "thisIsSecretMessage!"

const addBlog = async (ctx) => {
  let { title, desc, owenerId } = ctx.request.body
  const jwtToken = ctx.header.authtoken
  const Decrypt = jwt.verify(jwtToken, Secret)
  const blog = {
    title,
    desc,
    writenBy: Decrypt.id,
    owenerId,
    Liked: [],
    comments: [],
  }

  if (!Decrypt.id)
    return sendResponse(ctx, 400, { success: false, msg: "Unauthorized!" })
  let checkValid = await Verifyblog(blog)
  if (!checkValid.isValid) {
    return sendResponse(ctx, 400, { success: false, msg: checkValid.message })
  }
  const Blog = await db.getDB().collection("blogs")
  await Blog.insertOne(blog)
  return sendResponse(ctx, 200, { success: true, msg: "added successfully !" })
}

const viewBlog = async (ctx) => {
  const { id } = ctx.params
  try {
    const Blog = await db.getDB().collection("blogs")
    let data
    if (id) data = await Blog.findOne({ _id: new BSON.ObjectId(id) })
    else data = await Blog.find().toArray()
    return sendResponse(ctx, 200, { success: true, data })
  } catch (error) {
    return sendResponse(ctx, 400, { success: false, error })
  }
}

const likeBlog = async (ctx) => {
  const { id } = ctx.params
  const Blog = await db.getDB().collection("blogs")

  const userid = ctx.state.id
  try {
    await Blog.updateOne(
      { _id: new BSON.ObjectId(id) },
      { $addToSet: { Liked: userid } }
    )
  } catch (error) {
    return sendResponse(ctx, 400, { success: false, error })
  }
  return sendResponse(ctx, 200, {
    success: true,
    message: "Liked Successfully!",
  })
}

const updateBlog = async (ctx) => {
  const { blogId, title, desc } = ctx.request.body

  const Blog = await db.getDB().collection("blogs")
  let obj = new Map()
  if (title) obj.set("title", title) //

  if (desc) obj.set("desc", desc) //
  await Blog.updateOne({ _id: new BSON.ObjectId(blogId) }, { $set: obj })
  return sendResponse(ctx, 200, {
    success: true,
    message: "updated Successfully!",
  })
}

const deleteBlog = async (ctx) => {
  const { blogId } = ctx.request.body

  const Blog = await db.getDB().collection("blogs")

  await Blog.deleteOne({ _id: new BSON.ObjectId(blogId) })
  return sendResponse(ctx, 200, {
    success: true,
    message: "deleted Successfully!",
  })
}

const addNewComment = async (ctx) => {
  const { blogId, comment } = ctx.request.body

  const userId = ctx.state.id
  const obj = {
    blogId,
    userId,
    comment,
  }
  try {
    const Comment = await db.getDB().collection("comments")

    await Comment.insertOne(obj)
  } catch (error) {
    return sendResponse(ctx, 400, { success: false, error })
  }
  return sendResponse(ctx, 200, {
    success: true,
    message: "comment added Successfully!",
  })
}

const deleteComment = async (ctx) => {
  const { commentId } = ctx.request.body
  const userId = ctx.state.id
  const userType = ctx.state.userType
  const Comments = await db.getDB().collection("comments")
  let ack
  if (userType == "owner" || userType == "manager" || userType == "owner") {
    ack = await Comments.deleteOne({ _id: new BSON.ObjectId(commentId) })
  } else {
    ack = await Comments.deleteOne({
      _id: new BSON.ObjectId(commentId),
      userId,
    })
  }
  if (ack.deletedCount) return sendResponse(ctx, 200, "deleted!")
  else return sendResponse(ctx, 200, "comment Not found")
}
module.exports = {
  addBlog,
  viewBlog,
  likeBlog,
  updateBlog,
  deleteBlog,
  addNewComment,
  deleteComment,
}
