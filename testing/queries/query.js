const db = require("../../BlogApp/config/mongoDb")
const getAllBlog = async () => {
  const blog = db.getDB().collection("blogs").find().toArray()
  return blog
}
module.exports = { getAllBlog }
