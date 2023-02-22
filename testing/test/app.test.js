const request = require("supertest")
const koa = require("koa")
const axios = require("axios")

//const route = require("../server")
describe("get Endpoints", () => {
  let server
  it("get hi", async () => {
    const res = await axios.get("http://localhost:5000/")
    expect(res.status).toEqual(200)
    expect(res.data).toEqual({ msg: "Hi" })
    expect(res.data).toMatchSnapshot()
  })
  it("post data", async () => {
    const data = {
      name: "khushi",
      age: 20,
    }
    const res = await axios.post("http://localhost:5000/data", data)
    expect(res.status).toEqual(200)
    expect(res.data).toEqual({ success: true })
    //  expect(res.data).toMatchSnapshot()
  })
  it("should sucess false", async () => {
    const data = {
      name: "khushi",
    }
    const res = await axios
      .post("http://localhost:5000/data", data)
      .catch((error) => {
        expect(error.response.status).toEqual(400)
        expect(error.response.data.success).toEqual(false)
      })
  })
})
