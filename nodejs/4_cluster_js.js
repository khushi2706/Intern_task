const os = require("os")
const express = require("express")
const cluster = require("cluster")

const cpuNum = os.cpus().length

console.log(cpuNum)

if (cluster.isPrimary) {
  for (let i = 0; i < cpuNum; i++) {
    cluster.fork()
  }
  cluster.on("exit", () => {
    cluster.fork()
  })
} else {
  const app = express()

  app.get("/", async (req, res) => {
    let result = 0

    for (let i = 0; i < 1000; i++) {
      result += i
    }

    return res.json({ processId: process.pid, result })
  })

  const PORT = 5000
  app.listen(PORT, () => {
    console.log(`listen to port ${PORT} with ${process.pid}`)
  })
}
