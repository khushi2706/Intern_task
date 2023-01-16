// let obj = {
//   name: "xyz",
//   age: 10,
// };

// Object.seal(obj);
// obj.name = "abc";

// console.log(obj);
// Object.defineProperties(obj, { marks: { value: 19 } })

// Object.freeze(obj);
// obj.name = "abc";

// console.log(obj);

// const object1 = {
//   a: "somestring",
//   b: 42,
// };

// for (const [key, value] of Object.entries(object1)) {
//   console.log(`${key}: ${value}`);
// }

// let arr = [2, 3, 2, 1];
// let iv = 1;
// let sum = arr.reduce((pv, cv) => {
//   console.log(pv, cv);
//   return pv * cv;
// });
// console.log("-------------");
// sum = arr.reduce((pv, cv) => {
//   console.log(pv, cv);
//   return pv * cv;
// }, 0);

// a = 1
// ;(a > 0 && console.log("positive")) || (a < 0 && console.log("negative"))

// using bits
// function printPowerSet(set, set_size) {
//   var pow_set_size = parseInt(Math.pow(2, set_size));
//   var counter, j;
//   var ans = [];
//   for (counter = 0; counter < pow_set_size; counter++) {
//     let temp = [];
//     for (j = 0; j < set_size; j++) {
//       if ((counter & (1 << j)) > 0) temp.push(set[j]);
//     }
//     // console.log(temp);
//     ans.push(temp);
//   }
//   console.log(ans);
// }
// // Driver program to test printPowerSet
// let set = [1, 2];
// printPowerSet(set, 2);

// let arr = [5, 1, 31, 3, 1];

// arr.sort((p1, p2) => (p1 > p2 ? 1 : p1 < p2 ? -1 : 0));
// console.log(arr);

const obj = { name: "khushi" }
obj.name = "khuhie"

const age = 20
age = 29
