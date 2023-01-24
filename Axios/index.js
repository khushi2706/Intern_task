const axios = require("axios")
const express = require("express")

const app = express()

const apiLink = "https://reqres.in/api/users/"

app.get("/users", async (req, res) => {
  const data = await axios
    .get(apiLink)
    .then((resp) => {
      return resp.data
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  console.log(data)
  res.send(data.data)
})

app.get("/users/:id", async (req, res) => {
  const id = req.params.id

  const numRegEx = /^\d*$/
  if (!numRegEx.test(id)) return res.status(400).send("Id should be Number")

  const data = await axios
    .get(`${apiLink}${id}`)
    .then((resp) => {
      return resp.data
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  console.log(data)
  res.send(data.data)
})

app.post("/users", async (req, res) => {
  const data = req.body
  let status
  let resp = await axios.post(apiLink, data).then(
    (response) => {
      status = response.status
      return response.data
    },
    (error) => {
      console.log(error)
      res.status(400).send(e)
    }
  )
  console.log(status, resp)

  res.status(status).send(resp)
})

app.post("/query", async (req, res) => {
  const data = req.body
})

app.patch("/users/:id", async (req, res) => {
  const id = req.params.id
  const numRegEx = /^\d*$/
  if (!numRegEx.test(id)) return res.status(400).send("Id should be Number")

  const data = req.body
  let status
  let resp = await axios.patch(`${apiLink}${id}`, data).then(
    (response) => {
      status = response.status
      return response.data
    },
    (error) => {
      console.log(error)
      res.status(400).send(e)
    }
  )
  console.log(status, resp)

  res.status(status).send(resp)
})

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id
  const numRegEx = /^\d*$/
  if (!numRegEx.test(id)) return res.status(400).send("Id should be Number")

  let status = await axios.delete(`${apiLink}${id}`).then(
    (response) => {
      return response.status
    },
    (error) => {
      console.log(error)
      res.status(400).send(e)
    }
  )

  res.status(status).send()
})

app.listen(5000, () => {
  console.log("App listening at 5000")
})
