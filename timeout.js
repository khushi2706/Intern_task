// await setTimeout(() => console.log("hey in timeout"), 1000)
// console.log("hi outside")

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("hi in timeout")
    resolve()
  }, 2000)
}).then(() => {
  console.log("hi outside")
})

//myFun()
