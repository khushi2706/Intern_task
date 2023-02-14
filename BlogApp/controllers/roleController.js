const db = require("../config/mongoDb")
const { BSON } = require("mongodb")
const { sendResponse } = require("../utills/sendResponse")
const { updateUser } = require("../Model/User")

const updateRole = async (ctx) => {
  const { id, newRole } = ctx.request.body

  let ownerId = ctx.state.ownerId
  try {
    const ackg = await updateUser(
      {
        $and: [
          { _id: new BSON.ObjectId(id) },
          { "ownerDetails.ownerId": ownerId },
        ],
      },
      { $set: { "ownerDetails.$.userType": newRole } }
    )
    if (ackg.matchedCount)
      return sendResponse(ctx, 200, { success: true, msg: "Updated!" })
    else
      return sendResponse(ctx, 400, {
        success: false,
        msg: "Not Found! User did't accept your invitation yet",
      })
  } catch (error) {
    return sendResponse(ctx, 401, { success: false, error })
  }
}

const deleteRole = async (ctx) => {
  const { userId } = ctx.request.body
  const ownerId = ctx.state.ownerId

  try {
    const ack = await updateUser(
      { _id: new BSON.ObjectId(userId) },
      { $pull: { ownerDetails: { ownerId: ownerId } } }
    )

    if (ack.modifiedCount)
      sendResponse(ctx, 400, { success: false, msg: "Can not match" })

    await User.deleteOne({ ownerDetails: { $exists: true, $size: 0 } })
  } catch (error) {
    sendResponse(ctx, 200, { success: false, error })
  }
  sendResponse(ctx, 200, { success: true, msg: "Role Removed!" })
}

const updateAccess = async (ctx) => {
  const { id, access } = ctx.request.body
  const User = await db.getDB().collection("users")
  const ownerId = ctx.state.ownerId
  const update = await updateUser(
    {
      $and: [
        { _id: new BSON.ObjectId(id) },
        { "ownerDetails.ownerId": ownerId },
      ],
    },
    { $set: { "ownerDetails.$.access": access } }
  )

  if (update.matchedCount)
    return sendResponse(ctx, 200, { success: true, msg: "Updated!" })
  else return sendResponse(ctx, 400, { success: false, msg: "Can not find!" })
}

module.exports = {
  updateAccess,
  updateRole,
  deleteRole,
}
