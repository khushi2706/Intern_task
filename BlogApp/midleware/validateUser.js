const VerifyUser = require("../validator/userValidator")
const { sendResponse } = require("../utills/sendResponse")

const validateUser = async (ctx, next) => {
  let user = ctx.request.body

  // validating user object before adding to db
  const isValidObj = await VerifyUser(user)
  console.log(isValidObj)
  if (!isValidObj.isValid) {
    return sendResponse(ctx, 400, { success: false, msg: isValidObj.message })
  }
  ctx.state.user = user
  await next()
}

module.exports = { validateUser }
