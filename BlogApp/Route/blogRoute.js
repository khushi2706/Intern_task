const Koa = require("koa")
const KoaRouter = require("koa-router")

const blogRouter = new KoaRouter({ prefix: "/blog" })

const { updateBlogMid, checkLogin } = require("../midleware/blogMiddleware")
const {
  addBlog,
  viewBlog,
  likeBlog,
  updateBlog,
  deleteBlog,
  addNewComment,
  deleteComment,
} = require("../controllers/blogController")

blogRouter.post("/addNew", addBlog)
blogRouter.get("/view", viewBlog)
blogRouter.get("/view/:id", viewBlog)
blogRouter.get("/like/:id", checkLogin, likeBlog)
blogRouter.patch("/update", updateBlogMid, updateBlog)
blogRouter.delete("/delete", updateBlogMid, deleteBlog)
blogRouter.post("/comment", checkLogin, addNewComment)
blogRouter.delete("/deleteComment", checkLogin, deleteComment)
module.exports = blogRouter
