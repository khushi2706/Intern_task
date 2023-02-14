const nodemailer = require("nodemailer")

const sendEmail = async (link) => {
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

  let info = await transporter.sendMail({
    from: "khushindpatel27@gmail.com",
    to: "khushindpatel@gmail.com",
    subject: "Create Your account in SocialPilot",
    text: "Hello You're ivited to craete account here is link : -",
    html: `<a href=${link}>Link</a>`,
  })

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

module.exports = { sendEmail }
