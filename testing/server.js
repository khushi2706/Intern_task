const koa = require("koa")
const router = require("koa-router")
const bodyparser = require("koa-bodyparser")

const app = new koa()
const port = 5000
const route = router()

app.use(bodyparser())
route.get("/", (ctx) => {
  ctx.status = 200
  ctx.body = { msg: "Hi" }
})

route.post("/data", (ctx) => {
  const { name, age } = ctx.request.body
  if (!name || !age) {
    ctx.status = 400
    ctx.body = { success: false }
  } else {
    ctx.status = 200
    ctx.body = { success: true }
  }
})
app.use(route.routes())

app.listen(port, () => {
  console.log(`Server started on port`)
})

// module.exports = route
