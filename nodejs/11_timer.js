//The Timers module in Node.js contains functions that execute code after a set period of time.

function myFunc(arg) {
  console.log(`arg  => ${arg}`)
}

// name , email (unqiue), phn , address (optional)

setTimeout(myFunc, 100, "timerss")

//setImmediate() will execute code at the end of the current event loop cycle.
// This code will execute after any I/O operations in the current event loop and
// before any timers scheduled for the next event loop.
console.log("before immediate")

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`)
}, "so immediate")

console.log("after immediate")

function intervalFunc() {
  console.log("Cant stop me now!")
}

setInterval(intervalFunc, 1500)
