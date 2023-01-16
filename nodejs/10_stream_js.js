/*
while dealing with large amounts of data is that instead of reading a file into 
memory all at once, streams actually read chunks of data, 
processing its content data without keeping it all in memory.
Time Efficient: We don’t have to wait until entire file has been transmitted. W
e can start processing data as soon as we have it.
Memory Efficient: We don’t have to load huge amount of data in memory before 
we start processing
*/

const http = require("http")

const fs = require("fs")
const rstream = fs.createReadStream("./input.txt")

const server = http.createServer()

server.on("request", (req, res) => {
  rstream.on("data", (chunkdata) => {
    res.write(chunkdata)
  })
  rstream.on("end", () => {
    res.end()
  })
  rstream.on("error", (err) => {
    console.log(err)
    res.end("file not found")
  })
})

server.listen(5000)
