// Arrow Functions

// Default Parameter Values

// Rest Parameter

// Spread Operator

// Template Strings

// Destructuring

// Modules Export/Import

// Set

// Promises

// async/await

// bluebird.map

// bluebird.mapseries

let obj = {
  name: "khushi",
  age: 20,
  marks: {
    maths: 90,
    science: 98,
  },
};

let abc = obj;

let obj1 = {
  name: "khushi",
  age: 20,
  marks: {
    maths: 90,
    science: 98,
  },
};

console.log(Object.is(obj, abc));
console.log(Object.is(obj.marks, abc.marks));
console.log(Object.is(obj1, obj));
