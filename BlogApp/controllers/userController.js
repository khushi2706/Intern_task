const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Secret = "thisIsSecretMessage!"
const { sendEmail } = require("../utills/sendEmail")
const { BSON } = require("mongodb")
const { sendResponse } = require("../utills/sendResponse")
const { signUpUsingLinkUser } = require("../utills/getUserForSignUp")
const { insertInvUser, deleteInvUser } = require("../Model/InvitedUser")
const { insertUser, findUser, countUser, updateUser } = require("../Model/User")

const addUser = async (ctx) => {
  let jwtToken
  let userType, ownerId
  const user = ctx.state.user
  try {
    if (ctx.params.encrypt) {
      //if param is there then we will create diffrent user
      const decrypt = jwt.verify(ctx.params.encrypt, Secret)
      userType = decrypt.userType
      ownerId = decrypt.ownerId
      try {
        await signUpUsingLinkUser(user, ownerId, userType)
      } catch (error) {
        return sendResponse(ctx, 400, error.message)
      }
    } else {
      userType = "owner"
      user.userType = userType
    }

    // hashing the password
    const hashPass = await bcrypt.hash(user.password, 8)
    user.password = hashPass
    const us = await insertUser(user)
    const id = us._id
    const email = user.email
    // create jwtToken
    jwtToken = jwt.sign({ id, email, userType, ownerId }, Secret)
  } catch (error) {
    console.log(error)
    return sendResponse(ctx, 401, { success: false, msg: error.message })
  }
  return sendResponse(ctx, 200, { success: true, jwtToken })
}

const loginUser = async (ctx) => {
  let { email, password, ownerId } = ctx.request.body
  let jwtToken
  try {
    let user, userType

    if (ownerId) {
      // find user
      user = await findUser({
        email: email,
        "ownerDetails.ownerId": ownerId,
      })
      userType = user.ownerDetails[0].userType
    } else {
      // find owner
      user = await findUser({ email })
      console.log(user)
      userType = "owner"
    }

    if (user) {
      let id = user._id
      const data = bcrypt.compare(password, user.password)
      if (data) {
        jwtToken = jwt.sign({ id, userType, ownerId }, Secret)
        return sendResponse(ctx, 200, { success: true, jwtToken, userType })
      } else {
        return sendResponse(ctx, 401, {
          success: false,
          msg: "Password is Wrong!",
        })
      }
    } else {
      return sendResponse(ctx, 401, {
        success: false,
        msg: "User not Exists !",
      })
    }
  } catch (error) {
    return sendResponse(ctx, 401, { success: false, error })
  }
}

const updateProfile = async (ctx) => {
  const { name, password } = ctx.request.body
  const id = ctx.state.id
  let obj = {}
  if (name) obj["name"] = name
  if (password) obj["password"] = await bcrypt.hash(password, 8)
  try {
    await updateUser({ _id: new BSON.ObjectId(id) }, { $set: obj })
    return sendResponse(ctx, 200, "updated!")
  } catch (error) {
    sendResponse(ctx, 400, { success: false, e: error.message })
  }
}

const inviteUser = async (ctx) => {
  const { email, userType } = ctx.request.body

  const ownerId = ctx.state.ownerId

  //if user is already invited
  const user = await findUser({
    email: email,
    "ownerDetails.ownerId": ownerId,
  })
  if (user)
    return sendResponse(ctx, 400, { success: false, msg: "already invited" })

  // if email id is already signup
  const ExistUser = await countUser({ email: email })

  let link
  if (ExistUser) link = "http://localhost:5000/user/accept/" // accept link
  else link = "http://localhost:5000/user/signup/"

  await insertInvUser({
    ownerId,
    email,
  })

  const encrypted = jwt.sign({ ownerId, userType, email }, Secret)
  link += encrypted

  await sendEmail(link)
  return sendResponse(ctx, 200, { success: true, msg: "mail sent!" })
}

const acceptInv = async (ctx) => {
  const decrypt = jwt.verify(ctx.params.encrypt, Secret)
  userType = decrypt.userType
  ownerId = decrypt.ownerId
  email = decrypt.email

  try {
    const resp = await deleteInvUser({
      ownerId,
      email,
    })
    const access = userType == "cs" ? false : true
    if (resp.deletedCount == 0)
      return sendResponse(ctx, 400, "already accepted!")
    await updateUser(
      { email: email },
      { $push: { ownerDetails: { userType, ownerId, access } } }
    )
  } catch (error) {
    return sendResponse(ctx, 400, error.message)
  }
  return sendResponse(ctx, 200, "added sucessfully")
}

module.exports = {
  addUser,
  loginUser,
  updateProfile,
  inviteUser,
  acceptInv,
}

setTimeout
