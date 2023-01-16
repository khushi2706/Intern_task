var os = require("os")

// return the cpu architecture
console.log("CPU architecture: " + os.arch())

console.log("Free memory: " + os.freemem())

console.log("Total memory: " + os.totalmem())

console.log(os.networkInterfaces())

//directory for temp files.
console.log("OS default directory for temp files : " + os.tmpdir())

//  operating systems release.
console.log("OS release : " + os.release())

console.log("Hostname: " + os.hostname())
console.log("Operating system name: " + os.type())
