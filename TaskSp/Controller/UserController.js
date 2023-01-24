const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../config/config")
const VerifyUser = require("../validator/userValidator")
const Secret = "thisIsSecretMessage!"

const nodemailer = require("nodemailer")
const { ObjectID } = require("bson")

const addUser = async (ctx) => {
  console.log(ctx.params)
  let jwtToken
  const { name, email, password } = ctx.request.body

  let userType = ctx.params.userType
  const ownerId = ctx.params.ownerId

  const User = await db.getDB().collection("users")

  const count = await User.find({ email: email }).count()

  let user
  if (count != 0) {
    ctx.status = 500
    ctx.body = "User Already exists"
    return
  }
  try {
    if (ownerId) {
      const owner = await User.findOne({ _id: new ObjectID(ownerId) })

      console.log(owner.invitedUser, email)
      console.log("====================================")
      console.log(owner.invitedUser.includes(email))
      console.log("====================================")
      if (!owner || !owner.invitedUser.includes(email)) {
        ctx.status = 400
        ctx.body = "Anauthrized!"
        return
      }
      user = { name, email, password, userType, ownerId }
    } else {
      userType = "owner"
      user = { name, email, password, userType, invitedUser: [] }
    }

    if (!VerifyUser(user)) {
      ctx.status = 400
      ctx.body = "error"
      return
    }
    const hashPass = await bcrypt.hash(password, 8)
    user.password = hashPass
    const us = await User.insert(user)
    const id = us._id
    jwtToken = jwt.sign({ id, email, userType }, Secret)
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
  ctx.status = 200
  ctx.body = { success: true, jwtToken }
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
        ctx.status = 200
        jwtToken = jwt.sign({ id, email, userType }, Secret)
        ctx.body = { success: true, jwtToken }
        return
      } else {
        ctx.status = 400
        ctx.body = "Invalide password"
        return
      }
    } else {
      ctx.status = 404
      ctx.body = { success: false, messgae: "User doesn't Exists !" }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
}

const inviteUser = async (ctx) => {
  const jwtToken = ctx.header.authtoken

  const Decrypt = jwt.verify(jwtToken, Secret)

  const ownerId = Decrypt.id
  if (Decrypt.userType != "owner") {
    ctx.status = 400
    ctx.body = "Unauthorized!"
    return
  }

  const { email, userType } = ctx.request.body

  const User = await db.getDB().collection("users")

  try {
    await User.updateOne(
      { _id: new ObjectID(ownerId) },
      { $push: { invitedUser: email } }
    )
  } catch (error) {
    ctx.status = 400
    console.log("====================================")
    console.log(error)
    console.log("====================================")
    ctx.body = error
    return
  }

  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  let link = `http://localhost:5000/user/signup/${userType}/${ownerId}`

  let info = await transporter.sendMail({
    from: "khushindpatel27@gmail.com", // sender address
    to: "khushindpatel@gmail.com", // list of receivers
    subject: "Create Your account in SocialPilot", // Subject line
    text: "Hello You're ivited to craete account here is link : -", // plain text body
    html: `<a href=${link}>Link</a>`, // html body
  })

  console.log("Message sent: %s", info.messageId)

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

  ctx.status = 200
  ctx.body = "Mail sent !"
  return
}

module.exports = { addUser, loginUser, inviteUser }
