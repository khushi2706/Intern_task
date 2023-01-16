const http = require("http")
const Users = require("./users.js")
const url = require("url")
const port = 5000

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    return handleGetReq(req, res)
  } else if (req.method === "POST") {
    return handlePostReq(req, res)
  } else if (req.method === "DELETE") return handleDelete(req, res)
})

function handleGetReq(req, res) {
  const { pathname } = url.parse(req.url)

  if (pathname === "/me") return handleFindMe(req, res)
  if (pathname !== "/users") {
    return handleError(res, 404)
  }
  res.setHeader("Content-Type", "application/json;charset=utf-8")
  return res.end(JSON.stringify(Users.getUsers()))
}

function handleDelete(req, res) {
  const { pathname } = url.parse(req.url)

  if (pathname !== "/me") {
    return handleError(res, 404)
  }

  const authToken = req.headers["authorization"]
  console.log(authToken)

  try {
    Users.deleteMe(authToken)
    res.setHeader("Content-Type", "application/json;charset=utf-8")
    return res.end("User deleted Successfully ")
  } catch (error) {
    res.end(`{${error}}`)
    return
  }
}

function handleFindMe(req, res) {
  const authToken = req.headers["authorization"]
  console.log(authToken)

  res.setHeader("Content-Type", "application/json;charset=utf-8")
  try {
    return res.end(JSON.stringify(Users.getMe(authToken)))
  } catch (error) {
    res.end(`{${error}}`)
    return
  }
}

function handlePostReq(req, res) {
  const { pathname } = url.parse(req.url)
  if (pathname === "/login") return handleLogin(req, res)
  if (pathname === "/signup") return handleSignUp(req, res)
}

function handleSignUp(req, res) {
  let buffer
  req
    .on("data", (chunk) => {
      buffer = chunk.toString()
    })
    .on("end", () => {
      const data = JSON.parse(buffer)
      let token
      try {
        token = Users.saveUser(data)
      } catch (error) {
        res.end(`{${error}}`)
        return
      }
      res.setHeader("Content-Type", "application/json;charset=utf-8")
      res.setHeader("JWT-Token", token)
      res.end("Signup successfully ! " + token)
    })
}

function handleLogin(req, res) {
  let buffer

  req
    .on("data", (chunk) => {
      buffer = chunk.toString()
    })
    .on("end", () => {
      const data = JSON.parse(buffer)
      let token
      try {
        token = Users.loginUser(data)
      } catch (error) {
        res.end(`{${error}}`)
        return
      }
      console.log("User login: ", data)
      res.setHeader("Content-Type", "application/json;charset=utf-8")
      res.setHeader("JWT-Token", token)
      res.end("User Logged In! " + token)
    })
}

function handleError(res, code) {
  res.statusCode = code
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`)
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
