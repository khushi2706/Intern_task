// note: que 1
{
  let obj1 = { hair: "long", beard: true }
  let obj2 = { beard: true, hair: "long" }
  let obj3 = obj1

  console.log(obj1 == obj2, obj1 == obj3)
  console.log(obj1 === obj2, obj1 === obj3)

  // convert into array and sort
  obj1 = Object.entries(obj1)
  obj2 = Object.entries(obj2)

  obj1.sort()
  obj2.sort()
  // real way to compare
  console.log(
    JSON.stringify(obj1) == JSON.stringify(obj2)
    // JSON.stringify(obj1) == JSON.stringify(obj3)
  )
}

//console.log(_.isEqual(obj1, obj2));

//note: que 2 Write a program to convert string to a 2D array of objects. The first row of the string is used as the title.
// {
//   let inputString = "col1,col2,col3\na,b,c\nc,d";
//   let lines = inputString.split("\n");
//   console.log(lines);

//   let keys = lines[0];
//   keys = keys.split(",");

//   console.log("keys ", keys);
//   lines = lines.slice(1);
//   console.log(lines);

//   const ans = lines.map(function (v) {
//     let values = v.split(",");

//     const tempObj = keys.reduce(function (obj, key, i) {
//       obj[key] = values[i];
//       return obj;
//     }, {});
//     return tempObj;
//   });
//   console.log(ans);
// }

//note: que 3 array of object to string
// {
//   obj = [
//     { col1: "a", col2: "b", col3: "c" },
//     { col1: "a", col2: "b" },
//   ];
//   const Finalans = obj.map(function (v) {
//     let ans = [];
//     // console.log(v);
//     let keys = Object.keys(v);
//     console.log(keys);
//     ans.push(keys.join(","));
//     let tmp = [];
//     for (let k in v) {
//       tmp.push(v[k]);
//     }
//     ans.push(tmp.join(","));
//     //console.log(ans);
//     return ans.join("\n");
//   });
//   console.log(Finalans);
// }

// note: que 4

// {
//   // using recursion
//   let finalAns = [];
//   function findPowerSet(s, res, n) {
//     if (n == 0) {
//       let temp = [];
//       for (var i of res) temp.push(i);
//       finalAns.push(temp);
//       return;
//     }
//     // append the subset to result
//     res.push(s[n - 1]);
//     findPowerSet(s, res, n - 1);
//     res.pop();
//     findPowerSet(s, res, n - 1);
//   }
//   // Function to print the power set
//   let s = [1, 2, 3];
//   let ans = [];
//   findPowerSet(s, ans, 3);
//   console.log(finalAns);
// }

{
  //#Source https://bit.ly/2neWfJ2
  const powerSet = (arr) => {
    return arr.reduce(
      (pv, cv) => {
        let temp = pv
        pv.forEach((ele) => {
          temp.push([...ele, cv])
        })
        return temp
      },
      [[]]
    )
  }

  console.log(powerSet([1, 2]))
}
// note: que 5 Write a program to replace the names of multiple object keys.

// {
//   let obj = {
//     name: "khushi",
//     job: "Nodejs",
//     age: 20,
//   };

//   let renamed = {
//     name: "FirstName",
//     job: "Role",
//   };
//   newObj = {};
//   Object.keys(obj).map((pv) => {
//     renamed[pv] ? (newObj[renamed[pv]] = obj[pv]) : (newObj[pv] = obj[pv]);
//   });

//   console.log(newObj);
// }

//note: que 6 Write a program to filter out the non-unique values in an array

{
  // var arr = [2, 2, 0, 41, 42, 1, 31, 31, 42, 7, 6, 3];
  // arr = arr.filter((ele) => {
  //   return arr.indexOf(ele) == arr.lastIndexOf(ele);
  // }); // filter does not changing the real array
  // console.log(arr);
}

// note: que 7 Write a program that will return true if the string is y/yes or false if the string is n/no.

{
  // let yregx = /(y|yes)/i;
  // let nregx = /(n|no)/i;
  // const myFun = (val) =>
  //   yregx.test(val) ? true : nregx.test(val) ? false : undefined;
  // console.log(myFun("yes"));
}

// note: que 8 ​ Write a program to get a sorted array of objects ordered by properties and orders.
// debug:
{
  // const orderBy = (arr, byThis, orders) =>
  //   [...arr].sort((a, b) =>
  //     byThis.reduce((pv, cv, i) => {
  //       if (pv === 0) {
  //         // if prev value is 0 that means object prop is same so we have to see for next property
  //         const [p1, p2] =
  //           orders && orders[i] === "desc" ? [b[cv], a[cv]] : [a[cv], b[cv]];
  //         pv = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
  //       }
  //       return pv; // else we have to return that previous
  //     }, 0)
  //   );
  // let arrObj = [
  //   { name: "khushi", age: 20 },
  //   { name: "ashi", age: 16 },
  // ];
  // console.log(orderBy(arrObj, ["name", "age"]));
  // console.log(orderBy(arrObj, ["name", "age"], ["asc", "desc"]));
}

// note: que 9 Write a program to remove the key-value pairs to the given keys
// {
// let input = { a: 2, b: 3, c: 0 };
// removeKey = ["b"];

// removeKey.forEach((element) => {
//   delete input[element];
// });

// console.log(input);}

// note: que 10 Write a program to convert time 24 hours to 12 hours.

{
  // const convert = (time) => {
  //   ans =
  //     (time == 0 && "12am") ||
  //     (time == 24 && "12pm") ||
  //     (time > 12 && (time % 12) + "pm") ||
  //     time + "am";
  //   return ans;
  // };
  // console.log(convert(24));
  // console.log(convert(0));
  // console.log(convert(12));
  // console.log(convert(4));
}
