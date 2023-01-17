const axios = require("axios")
const express = require("express")

const app = express()

app.get("/users", async (req, res) => {
  const data = await axios.get("https://reqres.in/api/users").then((resp) => {
    return resp.data
  })
  console.log(data)
  res.send(data.data)
})

app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const data = await axios
    .get(`https://reqres.in/api/users/${id}`)
    .then((resp) => {
      return resp.data
    })
  console.log(data)
  res.send(data.data)
})

app.post("/users", async (req, res) => {
  const data = req.body
  let status
  let resp = await axios.post("https://reqres.in/api/users", data).then(
    (response) => {
      console.log(response.d)
      status = response.status
      return response.data
    },
    (error) => {
      console.log(error)
    }
  )
  console.log(status, resp)

  res.status(status).send(resp)
})

app.patch("/users/:id", async (req, res) => {
  const id = req.params.id
  const data = req.body
  let status
  let resp = await axios.patch(`https://reqres.in/api/users/${id}`, data).then(
    (response) => {
      status = response.status
      return response.data
    },
    (error) => {
      console.log(error)
    }
  )
  console.log(status, resp)

  res.status(status).send(resp)
})

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id

  let status = await axios.delete(`https://reqres.in/api/users/${id}`).then(
    (response) => {
      return response.status
    },
    (error) => {
      console.log(error)
    }
  )

  res.status(status).send()
})

app.listen(5000, () => {
  console.log("App listening at 5000")
})
