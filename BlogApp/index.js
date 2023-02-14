const Koa = require("koa")
var bodyParser = require("koa-bodyparser")
const db = require("./config/mongoDb")
const bodyparser = require("koa-bodyparser")
db.connectToServer()
var app = new Koa()
app.use(bodyParser())
const userRouter = require("./Route/userRoute")
const blogRouter = require("./Route/blogRoute")
const dotenv = require("dotenv")
dotenv.config()

app.use(bodyparser())

app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(blogRouter.routes()).use(blogRouter.allowedMethods())
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("App started at ", PORT)
})
