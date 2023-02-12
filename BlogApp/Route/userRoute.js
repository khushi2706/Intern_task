const Koa = require("koa")
const KoaRouter = require("koa-router")

const userRouter = new KoaRouter({ prefix: "/user" })
const {
  updateRoleMid,
  allowAccessMid,
  checkUser,
} = require("../midleware/userMiddleware")
const {
  addUser,
  loginUser,
  inviteUser,
  acceptInv,
  updateRole,
  allowAccess,
} = require("../controllers/userController")

userRouter.post("/signUp", addUser)
userRouter.post("/signup/:encrypt", addUser)
userRouter.post("/login", loginUser)
userRouter.get("/accept/:encrypt", acceptInv)
userRouter.post("/invite", checkUser, inviteUser)
userRouter.post("/updateRole", updateRoleMid, updateRole)
userRouter.post("/updateAccess", allowAccessMid, allowAccess)
module.exports = userRouter
