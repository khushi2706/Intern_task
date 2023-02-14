const db = require("../config/mongoDb")

const { BSON } = require("mongodb")
const signUpUsingLinkUser = async (user, ownerId, userType) => {
  console.log("signup")
  console.log(ownerId)
  const email = user.email
  // check that user is  invited or not!
  const invite = await db
    .getDB()
    .collection("invitedUser")
    .countDocuments({ ownerId, email })

  if (!invite) throw Error("Email is Not invited")

  // if user is not sign up as owner
  await db.getDB().collection("invitedUser").deleteOne({
    ownerId,
    email,
  })
  const isExist = await db
    .getDB()
    .collection("users")
    .countDocuments({
      _id: new BSON.ObjectId(ownerId),
    })
  if (isExist == 0) throw Error("Link is Expire")

  let access = userType == "cs" ? false : true // cs defualt access is false

  user["ownerDetails"] = [{ userType, ownerId, access }] // owner details

  console.log(user)
  return user
}

module.exports = { signUpUsingLinkUser }
