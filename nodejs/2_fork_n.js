//The child_process.fork() is a special case of child_process.spawn()
//where the parent and the child process can communicate with each other via send()

// Write Javascript code here
var cp = require("child_process")

var child = cp.fork(__dirname + "/sub.js")

child.on("message", function (m) {
  console.log("Parent process received:", m)
})

child.send({ hello: "from parent process" })

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`)
})
