const Koa = require("koa")
const db = require("./config/config")
db.connectToServer()
const userRoute = require("./route/user")
const groupRoute = require("./route/group")
const bodyparser = require("koa-bodyparser")
const app = new Koa()
app.use(bodyparser())

app.use(userRoute.routes()).use(userRoute.allowedMethods())
app.use(groupRoute.routes()).use(groupRoute.allowedMethods())

// response

const PORT = 5000
app.listen(PORT, () => {
  console.log("Listening at...", PORT)
})
