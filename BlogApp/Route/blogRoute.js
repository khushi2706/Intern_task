const KoaRouter = require("koa-router")
const blogRouter = new KoaRouter({ prefix: "/blog" })
const { addBlogMid, CheckCredential } = require("../midleware/blogMiddleware")
const { checkLogin } = require("../midleware/authMiddleware.js")
const compose = require("koa-compose")
const {
  addBlog,
  viewBlog,
  likeBlog,
  updateBlogCon,
  deleteBlogCon,
  addNewComment,
  deleteComment,
  getCommentByBlog,
} = require("../controllers/blogController")

const middlewareUD = compose([checkLogin, CheckCredential("o", "m", "a")])
blogRouter.post("/addNew", checkLogin, addBlogMid, addBlog)
blogRouter.get("/view", viewBlog)
blogRouter.get("/view/:id", viewBlog)
blogRouter.get("/like/:id", checkLogin, likeBlog)
blogRouter.patch("/update", middlewareUD, updateBlogCon)
blogRouter.delete("/delete", middlewareUD, deleteBlogCon)
blogRouter.post("/comment", checkLogin, addNewComment)
blogRouter.delete("/deleteComment", checkLogin, deleteComment)
blogRouter.get("/getComment/:blogId", getCommentByBlog)
module.exports = blogRouter
