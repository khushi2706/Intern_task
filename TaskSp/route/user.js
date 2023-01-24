const Koa = require("koa")
const KoaRouter = require("koa-router")
const {
  addUser,
  loginUser,
  inviteUser,
} = require("../Controller/UserController")

const router = new KoaRouter({ prefix: "/user" })

router.post("/signup", addUser)
router.post("/signup/:userType/:ownerId", addUser)
router.post("/login", loginUser)
router.post("/invite", inviteUser)

module.exports = router
