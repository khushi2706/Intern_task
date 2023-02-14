const KoaRouter = require("koa-router")
const userRouter = new KoaRouter({ prefix: "/user" })
const { CheckCredential } = require("../midleware/userMiddleware")
const {
  addUser,
  loginUser,
  inviteUser,
  acceptInv,
  updateProfile,
} = require("../controllers/userController")
const {
  updateRole,
  deleteRole,
  updateAccess,
} = require("../controllers/roleController")
const { checkLogin } = require("../midleware/authMiddleware")
userRouter.post("/signUp", addUser)
userRouter.post("/signup/:encrypt", addUser)
userRouter.post("/login", loginUser)
userRouter.patch("/profile", checkLogin, updateProfile)
userRouter.get("/accept/:encrypt", acceptInv)
userRouter.post(
  "/invite",
  checkLogin,
  CheckCredential("o", "m", "a"),
  inviteUser
)
userRouter.patch(
  "/updateRole",
  checkLogin,
  CheckCredential("o", "a"),
  updateRole
)
userRouter.patch(
  "/updateAccess",
  checkLogin,
  CheckCredential("o", "a"),
  updateAccess
)
userRouter.patch(
  "/removeAccess",
  checkLogin,
  CheckCredential("o", "a"),
  deleteRole
)
module.exports = userRouter
