const path = require("path")

console.log(path.basename(__dirname)) // current dir name
console.log(path.dirname(__dirname)) // parent dir
console.log(path.extname(__filename)) // file ext
console.log(path.join(__dirname, "/newfile.js")) // get absolute path
console.log(
  path.normalize(
    "/Users/khushipatel/..//socialPilot/Task/..//nodejs/newfile.js"
  )
)

// let obj = { dir: "D:\\Pratice_\\Practice_04\\path", base: "path.js" }
// console.log(path.format(obj))
