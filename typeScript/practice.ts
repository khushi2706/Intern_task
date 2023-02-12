let age: number = 90
// age = "20" // will genrate the error
console.log(age)

let course: string = "khushi"
let is_Student: boolean = true

let thisISAny: any

function MYfun(params: number): number {
  //any code
  return 0
}

let num: number[] // define the array
num = [90, 0]

let data: [number, boolean] = [1, true]
data.push(false)
console.log("====================================")
console.log(data)
console.log("====================================")

// enum
enum Size {
  Small,
  Medium = "m",
  Large = "l",
}

console.log("====================================")
console.log(Size.Small) // defualt 0
console.log("====================================")

// object

let employee: {
  readonly id: number // can not change it later
  name?: string // optional property
  retrie?: (date: Date) => void //function
} = { id: 1 }

employee.name = "khushiiie"

//create custom type

type Employee = {
  readonly id: number // can not change it later
  name?: string // optional property
  retrie?: (date: Date) => void //function
}

let employee2: Employee = {
  id: 1,
}

// restrict the value (literal type )
type Quantity = 70 | 90
let qnt: Quantity

// nulable type
function greet(name: string | null) {}

greet(null)
