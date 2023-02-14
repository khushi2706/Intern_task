const db = require("../config/mongoDb")
const blogSchema = {
  title: {
    type: "string",
    require: true,
  },
  desc: {
    type: "string",
    require: true,
  },
  writenBy: {
    type: "string",
    require: true,
  },
  ownerId: {
    type: "string",
    require: true,
  },
}

const { CheckType } = require("./typeValidator")

const Verifyblog = async (blog) => {
  let finalAns = true // variable to check the all field types

  // itrate the schema
  for (let key in blogSchema) {
    // if require object
    if (blogSchema[key].unique) {
      const Blog = await db.getDB().collection("blogs")
      const count = await Blog.find({ [key]: blog[key] }).count()

      if (count != 0) return { isValid: false, message: "blog Already exist" }
    }
    if (blogSchema[key].require && blog[key] == undefined) {
      return { isValid: false, message: `${key} is require !` }
    }
    if (blog[key]) {
      typeof blogSchema[key] == "string"
        ? (finalAns = finalAns && blog[key] == blog[key].trim())
        : (finalAns = finalAns && CheckType(blog[key], blogSchema[key].type))
    }
  }
  return { isValid: finalAns, message: "Not Valid" }
}

module.exports = Verifyblog
