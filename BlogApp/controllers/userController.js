const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../config/mongoDb")
const VerifyUser = require("../validator/userValidator")
const Secret = "thisIsSecretMessage!"
const nodemailer = require("nodemailer")
const { BSON } = require("mongodb")
const { sendResponse } = require("../utills/sendResponse")

const addUser = async (ctx) => {
  console.log(ctx.params)
  let jwtToken
  let { name, email, password } = ctx.request.body
  const invitedUser = await db.getDB().collection("invitedUser")

  console.log(name, email, password)
  email = email.trim()

  let userType, ownerId
  if (ctx.params.encrypt) {
    const decrypt = jwt.verify(ctx.params.encrypt, Secret)
    userType = decrypt.userType
    ownerId = decrypt.ownerId

    const invite = await invitedUser.findOne({ ownerId })

    if (invite.email != email)
      return sendResponse(ctx, 400, {
        success: false,
        msg: "User email is not inivited !",
      })
  }

  const User = await db.getDB().collection("users")

  let user

  try {
    if (ownerId) {
      let access = userType == "cs" ? false : true
      user = {
        name,
        email,
        password,
        ownerDetails: [{ userType, ownerId, access }],
      }
    } else {
      userType = "owner"
      user = { name, email, password, userType }
    }

    const isValidObj = await VerifyUser(user)
    console.log(isValidObj)
    if (!isValidObj.isValid) {
      return sendResponse(ctx, 400, {
        success: false,
        msg: isValidObj.message,
      })
    }

    const hashPass = await bcrypt.hash(password, 8)
    user.password = hashPass
    console.log(hashPass)

    const us = await User.insertOne(user)
    await invitedUser.deleteOne({
      ownerId,
      email,
    })
    const id = us._id

    jwtToken = jwt.sign({ id, email, userType, ownerId }, Secret)
  } catch (error) {
    return sendResponse(ctx, 401, { success: false, error })
  }
  return sendResponse(ctx, 200, { success: true, jwtToken })
}

const loginUser = async (ctx) => {
  let { email, password, ownerId } = ctx.request.body
  let jwtToken
  try {
    const User = await db.getDB().collection("users")
    let user, userType
    if (ownerId) {
      user = await User.findOne({
        email: email,
        "ownerDetails.ownerId": ownerId,
      })
      userType = user.ownerDetails[0].userType
    } else {
      user = await User.findOne({ email: email })
      userType = "owner"
    }

    ownerId = ownerId ? ownerId : ""

    if (user != undefined) {
      let id = user._id
      const data = bcrypt.compare(password, user.password)
      if (data) {
        jwtToken = jwt.sign({ id, email, userType, ownerId }, Secret)
        return sendResponse(ctx, 200, { success: true, jwtToken, userType })
      } else {
        return sendResponse(ctx, 401, { success: false, msg: "Anauthorized !" })
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

const acceptInv = async (ctx) => {
  console.log(ctx.params.encrypt)
  const decrypt = jwt.verify(ctx.params.encrypt, Secret)
  console.log(decrypt)
  userType = decrypt.userType
  ownerId = decrypt.ownerId
  email = decrypt.email

  try {
    const User = await db.getDB().collection("users")

    await User.updateOne(
      { email: email },
      { $push: { ownerDetails: { userType, ownerId } } }
    )
  } catch (error) {
    return sendResponse(ctx, 400, error.message)
  }
  return sendResponse(ctx, 200, "added sucessfully")
}

const inviteUser = async (ctx) => {
  const { email, userType } = ctx.request.body

  const ownerId = ctx.state.ownerId
  const User = await db.getDB().collection("users")
  // if user is already invited
  const user = await User.findOne({
    $and: [
      { _id: new BSON.ObjectId(ownerId) },
      { invitedUser: { $elemMatch: { $eq: email } } },
    ],
  })

  if (user) {
    return sendResponse(ctx, 400, { success: false, msg: "already invited" })
  }

  // if email id is already signup
  const ExistUser = await User.count({ email: email })

  let link
  if (ExistUser) link = "http://localhost:5000/user/accept/"
  else link = "http://localhost:5000/user/signup/"

  const invitedUser = await db.getDB().collection("invitedUser")
  await invitedUser.insertOne({
    ownerId,
    email,
  })

  let testAccount = await nodemailer.createTestAccount()
  console.log("seding mail")
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  const encrypted = jwt.sign({ ownerId, userType, email }, Secret)
  link += encrypted
  let info = await transporter.sendMail({
    from: "khushindpatel27@gmail.com",
    to: "khushindpatel@gmail.com",
    subject: "Create Your account in SocialPilot",
    text: "Hello You're ivited to craete account here is link : -",
    html: `<a href=${link}>Link</a>`,
  })

  console.log("Message sent: %s", info.messageId)

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

  return sendResponse(ctx, 200, { success: true, msg: "mail sent!" })
}

const updateRole = async (ctx) => {
  const { id, newRole } = ctx.request.body

  let ownerId = ctx.state.ownerID
  const User = await db.getDB().collection("users")
  try {
    const ackg = await User.updateOne(
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

const allowAccess = async (ctx) => {
  const { id } = ctx.request.body
  const User = await db.getDB().collection("users")
  const ownerId = ctx.state.myId
  const update = await User.updateOne(
    {
      $and: [
        { _id: new BSON.ObjectId(id) },
        { "ownerDetails.ownerId": ownerId },
      ],
    },
    { $set: { "ownerDetails.$.access": true } }
  )

  if (update.matchedCount)
    return sendResponse(ctx, 200, { success: true, msg: "Updated!" })
  else return sendResponse(ctx, 400, { success: false, msg: "Can not find!" })
}

module.exports = {
  addUser,
  loginUser,
  inviteUser,
  acceptInv,
  updateRole,
  allowAccess,
}
