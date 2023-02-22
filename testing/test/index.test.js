const { add, err } = require("../index")

test("To be", () => {
  expect(add(1, 2)).toBe(3)
})

test("To equal", () => {
  expect(add(1, 2)).toEqual(3)
})

test("To be null", () => {
  expect(add(2, 3)).not.toBeNull()
})

test("To be less then ", () => {
  expect(add(2, 3)).toBeLessThan(7)
})

test("To be less then ", () => {
  expect(add("hi", "world")).toMatch(/world/)
})

test("To throw ", () => {
  expect(() => err()).toThrow("i am error")
})
