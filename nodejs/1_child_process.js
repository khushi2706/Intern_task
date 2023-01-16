//This method creates a shell first and then executes the command.
const cp = require("child_process")

let op = cp.execSync("node test.js")
console.log("output " + op)

/*
execFile() method: The child_process.execFile() 
function is does not spawn a shell by default. It is slightly more efficient than
 child_process.exec() as the specified executable file is spawned directly as a new process.
*/
