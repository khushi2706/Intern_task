const db = require("../config/mongoDb")
const { sendResponse } = require("../utills/sendResponse")
const { BSON } = require("mongodb")
const { countBlog } = require("../Model/Blog")

const addBlogMid = async (ctx, next) => {
  try {
    const { id, ownerId, userType } = ctx.state
    if (userType == "cs") {
      const cs = await db
        .getDB()
        .collection("users")
        .aggregate([
          { $match: { _id: new BSON.ObjectId(id) } },
          {
            $project: {
              ownerDetails: {
                $filter: {
                  input: "$ownerDetails",
                  as: "od",
                  cond: { $eq: ["$$od.ownerId", ownerId] },
                },
              },
            },
          },
        ])
        .toArray()
      if (cs && !cs[0].ownerDetails[0].access)
        return sendResponse(ctx, 400, { success: false, msg: "Unauthorized!" })
    }

    return await next()
  } catch (e) {
    console.log(e)
    return sendResponse(ctx, 400, e)
  }
}

const CheckCredential =
  (...arg) =>
  async (ctx, next) => {
    try {
      const { blogId } = ctx.request.body
      const { id, ownerId, userType } = ctx.state
      // check if blog is written by themself or not
      let asCheck = await countBlog({
        _id: new BSON.ObjectId(blogId),
        writenBy: id,
      })

      let userArr = []

      let dict = {
        o: "owner",
        a: "admin",
        m: "manager",
      }
      for (c of arg) userArr.push(dict[c])

      console.log(userArr.includes(userType))
      // if not then we check that userType nd ownerId
      if (userArr.includes(userType))
        asCheck = await countBlog({
          _id: new BSON.ObjectId(blogId),
          ownerId,
        })

      if (asCheck) return await next()

      return sendResponse(ctx, 400, "unAuthrized!")
    } catch (error) {
      console.log(error)
      return sendResponse(ctx, 400, error.message)
    }
  }

module.exports = {
  addBlogMid,
  CheckCredential,
}
