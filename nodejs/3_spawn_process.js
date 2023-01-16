//This method spawns a new process using the given command and
//the command line arguments in args. The ChildProcess instance implements EventEmitterAPI
//which enables us to register handlers for events on child object directly.

const { spawn } = require("child_process")
const child = spawn("./script.sh")
child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`)
})

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`)
})

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`)
})
