const Koa = require("koa")
const app = new Koa()
const query = require("./queries/query")
const bodyparser = require("koa-bodyparser")

//app.use(bodyparser)
app.use(async (ctx) => {
  if (ctx.path === "/blog") {
    const blog = await query.getAllBlog()
    // console.log(blog)
    ctx.body = { blog }
    ctx.status = 200
  }
  // if (ctx.path === "/time") {
  //   const currentTime = new Date().toISOString()
  //   ctx.body = currentTime
  // } else {
  //   ctx.status = 404
  //   ctx.body = "Not Found"
  // }
})

module.exports = app
