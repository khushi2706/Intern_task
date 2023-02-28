const db = require("../../BlogApp/config/mongoDb")
const getAllBlog = async () => {
  console.log("I am real one")
  const blog = db.getDB().collection("blogs").find().toArray()
  return blog
}
module.exports = { getAllBlog }
