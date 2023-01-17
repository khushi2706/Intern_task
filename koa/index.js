const Koa = require("koa")
const app = new Koa()
const path = require("path")
const koaRouter = require("koa-router")
const router = new koaRouter()
const render = require("koa-ejs")
const bodyparser = require("koa-bodyparser")

app.use(bodyparser)
render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
})

app.use(router.routes()).use(router.allowedMethods())

// response
router.get("/test", async (ctx) => (ctx.body = "hello form ctx"))

let notes = ["Read Book ", "Meditation"]
router.get("/", async (ctx) => {
  await ctx.render("index", {
    notes: notes,
  })
})

router.get("/addNew", async (ctx) => {
  await ctx.render("add")
})

router.post("/addNew", add)

async function add(ctx) {
  const body = ctx.request.body
  console.log(body)
  //   const note = body.note
  // notes.push(note)
  ctx.redirect("/")
}
app.listen(5000, () => {
  console.log("App started at PORT 5000")
})
