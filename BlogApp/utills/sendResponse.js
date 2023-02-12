const sendResponse = (ctx, status, body) => {
  ctx.status = status
  ctx.body = body
}

module.exports = { sendResponse }
