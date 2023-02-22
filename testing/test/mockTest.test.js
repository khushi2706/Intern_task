const request = require("supertest")
const app = require("../app")
const query = require("../queries/query")
const { getAllBlog } = require("../queries/query")
const { ObjectId } = require("mongodb")
describe("GET /blog", () => {
  let server

  beforeAll(() => {
    server = app.listen()
  })

  afterAll((done) => {
    server.close(done)
  })
  it("should return all blog", async () => {
    // query.getAllBlog = jest.fn(() => [
    //   {
    //     _id: new ObjectId("63e9fce8211d4e3c4384ca40"),
    //     title: "New Blog 4",
    //     desc: "this is desc",
    //     writenBy: "63e9dc1b01d1ff19276b017d",
    //     ownerId: "63e9dbd2e52ea18809f76f96",
    //     Liked: [],
    //   },
    //   {
    //     _id: new ObjectId("63eb3628ec1b13f2df1f585f"),
    //     title: "New Blog 4",
    //     desc: "this is desc",
    //     writenBy: "63e9dbd2e52ea18809f76f96",
    //     ownerId: "63e9dbd2e52ea18809f76f96",
    //     Liked: [],
    //   },
    //   {
    //     _id: new ObjectId("63eb37250e181b50134d111d"),
    //     title: "New Blog1",
    //     desc: "this is decs new 3432",
    //     writenBy: "63e9dbd2e52ea18809f76f96",
    //     ownerId: "63e9dbd2e52ea18809f76f96",
    //     Liked: [],
    //   },
    //   {
    //     _id: new ObjectId("63ec5b150a0a891992850261"),
    //     title: "New Blog1",
    //     desc: "this is desc",
    //     writenBy: "63e9dbd2e52ea18809f76f96",
    //     ownerId: "63e9dbd2e52ea18809f76f96",
    //     Liked: [],
    //   },
    // ])

    query.getAllBlog = jest.spyOn({ getAllBlog }, "getAllBlog")
    const res = await request(server).get("/blog")
    expect(res.statusCode).toEqual(200)
    expect(query.getAllBlog.mock.calls.length).toBe(1)
  })
})

/*
When you call jest.spyOn() and pass in an object and a method name, 
Jest creates a new mock function that takes the place of the original method on that object. 
The mock function keeps track of how many times it's been called, what arguments were passed to it, and what it returned.*/
//   it("responds with the current time", async () => {
//     const mockDate = new Date("2022-01-01T00:00:00.000Z")
//     jest.spyOn(global, "Date").mockImplementation(() => mockDate)

//     const res = await request(server).get("/time")

//     expect(res.statusCode).toEqual(200)
//     expect(res.text).toEqual("2022-01-01T00:00:00.000Z")

//     global.Date.mockRestore()
//   })
