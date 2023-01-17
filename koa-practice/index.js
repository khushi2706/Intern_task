const Koa = require("koa")
const app = new Koa()
const path = require("path")
const koaRouter = require("koa-router")
const notesRoute = require("./router/notesRoute")
const router = new koaRouter()
const render = require("koa-ejs")
const bodyparser = require("koa-bodyparser")

app.use(bodyparser())
// render(app, {
//   root: path.join(__dirname, "views"),
//   layout: "layout",
//   viewExt: "html",
//   cache: false,
//   debug: false,
// })

app.use(notesRoute.routes())
app.use(notesRoute.allowedMethods())

// response
router.get("/test", async (ctx) => (ctx.body = "hello form ctx"))

app.listen(5000, () => {
  console.log("App started at PORT 5000")
})
