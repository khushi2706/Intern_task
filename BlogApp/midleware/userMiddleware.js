const { sendResponse } = require("../utills/sendResponse")

const CheckCredential =
  (...arg) =>
  async (ctx, next) => {
    const { userType } = ctx.state
    let userArr = []
    let dict = {
      o: "owner",
      a: "admin",
      m: "manager",
    }
    for (c of arg) userArr.push(dict[c])

    if (userArr.includes(userType)) return await next()

    return sendResponse(ctx, 401, { success: false, msg: "Unauthorized !" })
  }

module.exports = { CheckCredential }
