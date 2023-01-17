const koaRouter = require("koa-router")
const notesRoute = new koaRouter()

let notes = ["Read Book ", "Meditation"]

notesRoute.get("/", async (ctx) => {
  return (ctx.body = notes)
})
notesRoute.get("/addNew", async (ctx) => {
  await ctx.render("add")
})
notesRoute.post("/addNew", add)
async function add(ctx) {
  const body = ctx.request.body
  console.log(body)
  const note = body.note
  notes.push(note)
  ctx.redirect("/")
}

notesRoute.delete("/")

module.exports = notesRoute
