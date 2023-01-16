//http
// help to transfer data over the hyper text transfer protocol

/*
{ 'content-length': '123',
  'content-type': 'text/plain',
  'connection': 'keep-alive',
  'host': 'example.com',
  'accept': '' }
*/
var http = require("http")
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write("Hello World!")
    res.end()
  })
  .listen(8080)

http.get(
  {
    hostname: "localhost",
    port: 8080,
    path: "/",
    agent: false, // Create a new agent just for this one request
  },
  (res) => {
    // Do stuff with response
    console.log("====================================")
    // console.log(res)
    console.log("====================================")
  }
)
