const Koa = require("koa")
var bodyParser = require("koa-bodyparser")
const db = require("./config/mongoDb")
const bodyparser = require("koa-bodyparser")
db.connectToServer()
var app = new Koa()
app.use(bodyParser())
const userRouter = require("./Route/userRoute")
const blogRouter = require("./Route/blogRoute")

app.use(bodyparser())

app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(blogRouter.routes()).use(blogRouter.allowedMethods())
app.listen(5000, () => {
  console.log("App started at ", 5000)
})
