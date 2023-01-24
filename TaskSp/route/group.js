const Koa = require("koa")
const KoaRouter = require("koa-router")
const {
  addNewGroup,
  viewAllGroup,
  viewGroup,
} = require("../Controller/GroupController")

const router = new KoaRouter({ prefix: "/group" })

router.post("/addGroup", addNewGroup)
router.get("/viewAllGroup", viewAllGroup)
router.get("/viewGroup/:groupId", viewGroup)
module.exports = router
