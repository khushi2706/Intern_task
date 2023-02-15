const Verifyblog = require("../validator/blogValidator")
const { sendResponse } = require("../utills/sendResponse")

const validateBlog = async (ctx, next) => {
  let { title, desc, ownerId } = ctx.request.body

  const id = ctx.state.id
  const blog = {
    title,
    desc,
    writenBy: id,
    ownerId,
    Liked: [],
  }
  let checkValid = await Verifyblog(blog)
  if (!checkValid.isValid) {
    return sendResponse(ctx, 400, { success: false, msg: checkValid.message })
  }
  ctx.state.blog = blog
  await next()
}

module.exports = { validateBlog }
