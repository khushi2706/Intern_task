const Koa = require("koa")
const db = require("./utils/connectMongo")
db.connectToServer()
const bodyParser = require("koa-bodyparser")
const koaEjs = require("koa-ejs")
const path = require("path")
const koaRouter = require("koa-router")
const http = require("http")
const socketio = require("socket.io")
const router = koaRouter()
const { getMessageInRoom, storeInRoom } = require("./model/roomMessage")
const {
  getMessageInPrivate,
  storeInPrivateChat,
} = require("./model/privateMessage")
// redis

const app = new Koa()
koaEjs(app, {
  root: path.join(__dirname, "view"),
  layout: "layout",
  viewExt: "html",
})
const server = http.createServer(app.callback())
const io = socketio(server)
const clients = new Map()

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

function sendMessage(socket) {
  redis.lrange("message", "0", "-1", (err, data) => {
    console.log(data)
  })
}

io.on("connection", (socket) => {
  socket.on("joined", async ({ username, room, time }) => {
    console.log(username, room, time)
    if (!clients.has(username)) clients.set(username, socket.id)
    socket.join(room)
    let msg = { message: `${username} has joined`, from: "system", time }

    const msgHistory = await getMessageInRoom(room)
    socket.emit("sendHistory", msgHistory)
    socket.in(room).emit("message", msg)
  })

  socket.on("joinPrivate", async ({ username, recipient }) => {
    if (!clients.has(username)) clients.set(username, [socket.id])
    else clients.get(username).push(socket.id)
    const msgHistory = await getMessageInPrivate(recipient, username)
    socket.emit("sendHistory", msgHistory)
  })

  socket.on("sendPrivate", async ({ username, recipient, message }) => {
    const resIds = clients.get(recipient)
    const userIds = clients.get(username)

    await storeInPrivateChat(username, message, recipient)

    resIds &&
      resIds.forEach((resId) => {
        console.log(resId)
        const resSocket = io.sockets.sockets.get(resId)
        resSocket &&
          resSocket.emit("message", {
            message,
            from: username,
            time: new Date(),
          })
      })
    userIds &&
      userIds.forEach((resId) => {
        console.log(resId)
        const resSocket = io.sockets.sockets.get(resId)
        resSocket &&
          resSocket.emit("message", {
            message,
            from: username,
            time: new Date(),
          })
      })
  })

  socket.on("sendmessage", ({ message, from, room, time }) => {
    console.log(message, from, time)
    //   redis.rpush("message", `${from}:${message}`)

    storeInRoom(room, message, from)
    socket.in(room).emit("message", { message, from, time })
  })

  socket.on("disconnect", () => {})
})

router.get("/chat", async (ctx) => {
  await ctx.render("chat")
})

router.get("/oneToOne", async (ctx) => {
  await ctx.render("oneToOne")
})
router.get("/privatechat", async (ctx) => {
  await ctx.render("privatechat")
})

router.get("/", async (ctx) => {
  await ctx.render("index")
})
server.listen(5000, () => {
  console.log("App started At port 5000")
})
