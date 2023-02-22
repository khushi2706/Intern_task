const add = (a, b) => {
  return a + b
}

const err = () => {
  throw Error("i am error")
}
module.exports = {
  add,
  err,
}
