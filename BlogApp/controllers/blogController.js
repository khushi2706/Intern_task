const db = require("../config/mongoDb")
const Verifyblog = require("../validator/blogValidator")
const { sendResponse } = require("../utills/sendResponse")
const jwt = require("jsonwebtoken")
const { BSON } = require("mongodb")
const Secret = "thisIsSecretMessage!"
const {
  findBlog,
  insertBlog,
  updateBlog,
  deleteBlog,
} = require("../Model/Blog")

const addBlog = async (ctx) => {
  let { title, desc, ownerId } = ctx.request.body
  const id = ctx.state.id
  const blog = {
    title,
    desc,
    writenBy: id,
    ownerId,
    Liked: [],
  }

  let checkValid = await Verifyblog(blog)
  if (!checkValid.isValid) {
    return sendResponse(ctx, 400, { success: false, msg: checkValid.message })
  }
  await insertBlog(blog)
  return sendResponse(ctx, 200, { success: true, msg: "added successfully !" })
}

const viewBlog = async (ctx) => {
  const { id } = ctx.params
  try {
    const Blog = db.getDB().collection("blogs")
    let data
    if (id) data = await findBlog({ _id: new BSON.ObjectId(id) })
    else data = await findBlog()
    return sendResponse(ctx, 200, { success: true, data })
  } catch (error) {
    return sendResponse(ctx, 400, { success: false, e: error.message })
  }
}

const likeBlog = async (ctx) => {
  const { id } = ctx.params

  const userid = ctx.state.id
  try {
    await updateBlog(
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

const updateBlogCon = async (ctx) => {
  const { blogId, title, desc } = ctx.request.body

  let obj = new Map()
  if (title) obj.set("title", title) //

  if (desc) obj.set("desc", desc) //
  await updateBlog({ _id: new BSON.ObjectId(blogId) }, { $set: obj })
  return sendResponse(ctx, 200, {
    success: true,
    message: "updated Successfully!",
  })
}

const deleteBlogCon = async (ctx) => {
  const { blogId } = ctx.request.body

  await deleteBlog({ _id: new BSON.ObjectId(blogId) })
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
const getCommentByBlog = async (ctx) => {
  const { blogId } = ctx.params
  try {
    const Comment = db.getDB().collection("comments")
    const comments = await Comment.find({ blogId }).toArray()
    sendResponse(ctx, 200, { success: true, comments })
  } catch (error) {
    console.log(error)
    sendResponse(ctx, 400, { success: false, message: error.message })
  }
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
  updateBlogCon,
  deleteBlogCon,
  addNewComment,
  deleteComment,
  getCommentByBlog,
}
