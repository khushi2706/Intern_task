const fs = require("fs")

// fs.readFile("./input.txt", function (err, data) {
//   if (err) return console.error(err)

//   console.log("Async Read : " + data.toString())
// })

// var data = fs.readFileSync("./input.txt")
// console.log("Synchronous read: " + data.toString())

// fs.read() method is used to read the file specified by fd.
//This method reads the entire file into the buffer.

// fs.read(fd, buffer, offset, length, position, callback)
// var buf = new Buffer.alloc(1024)

// console.log("opening an existing file")
// fs.open("./input.txt", "r+", function (err, fd) {
//   if (err) {
//     return console.error(err)
//   }
//   console.log("File opened successfully!")
//   console.log("reading the file")

//   fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(bytes + " bytes read")

//     // Print only read bytes to avoid junk.
//     if (bytes > 0) {
//       console.log(buf.slice(0, bytes).toString())
//     }
//   })
// })

console.log("====================================")
console.log("====================================\n")
console.log("writing into existing file")
fs.writeFile("input.txt", "Khushi Patel", function (err) {
  if (err) {
    return console.error(err)
  }

  console.log("Data written successfully!")
  console.log("Let's read newly written data")

  fs.readFile("input.txt", function (err, data) {
    if (err) {
      return console.error(err)
    }
    console.log("Asynchronous read: " + data.toString())
  })
})

/*
fs.appendFile('input.txt', data, 'utf8',
 
    // Callback function
    function(err) {
        if (err) throw err;
 
        //  If no error
        console.log("Data is appended to file successfully.")
});
*/

// fs.unlink('delete.txt',(err)=>{
//     console.log('File deleted');
// })
