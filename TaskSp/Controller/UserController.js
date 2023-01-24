const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../config/config")
const VerifyUser = require("../validator/userValidator")
const Secret = "thisIsSecretMessage!"
const sendReq = require("../config/config")
const nodemailer = require("nodemailer")
const { ObjectID } = require("bson")
const { sendResponse } = require("../utills/sendResponse")

const addUser = async (ctx) => {
  console.log(ctx.params)
  let jwtToken
  let { name, email, password } = ctx.request.body

  email = email.trim()

  let userType, ownerId
  if (ctx.params.encrypt) {
    const decrypt = jwt.verify(ctx.params.encrypt, Secret)
    userType = decrypt.userType
    ownerId = decrypt.ownerId
  }

  const User = await db.getDB().collection("users")

  let user

  try {
    if (ownerId) {
      const owner = await User.findOne({ _id: new ObjectID(ownerId) })

      console.log(owner.invitedUser, email)
      if (!owner || !owner.invitedUser.includes(email)) {
        return sendResponse(ctx, 400, {
          success: false,
          msg: "User email is not inivited !",
        })
      }
      user = { name, email, password, userType, ownerId }
    } else {
      userType = "owner"
      user = { name, email, password, userType, invitedUser: [] }
    }

    const isValid = await VerifyUser(user)
    console.log(isValid)
    if (!isValid) {
      return sendResponse(ctx, 400, {
        success: false,
        msg: "User credentiatl is not proper formated!",
      })
    }
    const hashPass = await bcrypt.hash(password, 8)
    user.password = hashPass
    const us = await User.insert(user)
    const id = us._id
    jwtToken = jwt.sign({ id, email, userType }, Secret)
  } catch (error) {
    return sendResponse(ctx, 401, { success: false, error })
  }
  return sendResponse(ctx, 200, { success: true, jwtToken })
}

const loginUser = async (ctx) => {
  const { email, password } = ctx.request.body
  let jwtToken
  try {
    const User = await db.getDB().collection("users")
    const user = await User.findOne({ email: email })
    const userType = user.userType
    const id = user._id
    if (user != undefined) {
      const data = bcrypt.compare(password, user.password)
      if (data) {
        jwtToken = jwt.sign({ id, email, userType }, Secret)
        return sendResponse(ctx, 200, { success: true, jwtToken })
      } else {
        return sendResponse(ctx, 401, { success: false, msg: "Anauthorized !" })
      }
    } else {
      return sendResponse(ctx, 401, { success: false, msg: "User Exists !" })
    }
  } catch (error) {
    return sendResponse(ctx, 401, { success: false, error })
  }
}

const inviteUser = async (ctx) => {
  const jwtToken = ctx.header.authtoken

  const Decrypt = jwt.verify(jwtToken, Secret)

  const ownerId = Decrypt.id
  if (Decrypt.userType != "owner") {
    return sendResponse(ctx, 401, { success: false, msg: "Unauthorized !" })
  }

  const { email, userType } = ctx.request.body

  const encrypted = jwt.sign({ ownerId, userType }, Secret)
  const User = await db.getDB().collection("users")

  try {
    await User.updateOne(
      { _id: new ObjectID(ownerId) },
      { $push: { invitedUser: email } }
    )
  } catch (error) {
    return sendResponse(ctx, 400, { success: false, error })
  }

  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  let link = `http://localhost:5000/user/signup/${encrypted}`

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

module.exports = { addUser, loginUser, inviteUser }
