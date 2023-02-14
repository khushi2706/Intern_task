const db = require("../config/mongoDb")
const Blog = db.getDB().collection("blogs")

const findBlog = async (data) => await Blog.find(data).toArray()
const insertBlog = async (data) => await Blog.insertOne(data)
const updateBlog = async (cond, data) => await Blog.updateOne(cond, data)
const deleteBlog = async (data) => await Blog.deleteMany(data)
const countBlog = async (data) => await Blog.countDocuments(data)
module.exports = { findBlog, insertBlog, updateBlog, deleteBlog, countBlog }
