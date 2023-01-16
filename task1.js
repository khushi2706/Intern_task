//    javascript
// note: Three type of declaring variable
{
  //var

  console.log(a);
  var a = 5; // mutable

  /*
 var have the global scope we can use in everywhere in program 
  when we use it before we define we get the undefined as value
*/
  const b = 7; //unmutable
  console.log(b);

  /*
  const -> constant   we can not change value after one time assignment 
  if we use it before we define then we get error

  script.js:15 Uncaught ReferenceError: Cannot access 'b' before initialization
*/

  let c = 5; //mutable
  console.log(c);

  /*
   it has local scope we can change it value 
   if we use it before we define then we get error

  script.js:15 Uncaught ReferenceError: Cannot access 'b' before initialization
*/
}
// note: Javascript operator
{
  //1. Arithmetic Operator (Do the Mathematical Operation)
  let x = 6;
  let y = 27;

  console.log(x + y); // addition of two variable
  console.log(x - y); // subtraction of two variable
  console.log(x * y); // multiplication
  console.log(x / y); // division
  console.log(y ** x); // power of given number
  console.log(y % x); // module opr
  console.log(x++); // incremental op
  console.log(x--); // decremental op

  y = "6";
  //2. Comperision Operator
  console.log(x == y); // weak comparison operator
  console.log(x === y); //=== Strong comparition operator"
  console.log(x != y); //!= weak not equal to comparison operator
  console.log(x !== y); //!== Strong not equal to comparition operator

  //3. Relational Operator
  /*
  > greater than return true if x is greater then y x>y
  >= greater than and equal to
  < less than
  <= less than and equal to
 */

  //4. Logical Operator
  /* && return true if both are tue
|| return true if one of them is true
! Not :- reverce the condition
*/

  //5.  Assignment Operator

  /*
  = is assignment operator 

  we also have 
  a += 4 // which will add 4 into a and then assign into a itself 
  same we have a -= 5 , a*=7 , a/=9
*/

  //6. Ternary Operator (?:)
  let d = undefined;
  d ? console.log("Hello") : console.log("sorry can't get it");
}
// note: if else statement
{
  const isPassed = true;
  if (isPassed) {
    console.log("welcome :)");
  } else {
    console.log("Try again :/");
  }
}
// note: switch cased
{
  const marks = 90;

  switch (marks) {
    case 90:
      console.log("excellent !");
      break;
    case 80:
      console.log("good job!");
      break;
    default:
      console.log("DO hardwork");
      break;
  }
}
//note: Loops
{
  //While loop
  // print 1 to 10
  let i = 0;
  while (i !== 10) {
    console.log(i + 1);
    i++;
  }

  //For loop

  for (let i = 0; i < 10; i++) {
    console.log(i + 1);
  }

  // For in loop is used to itterate object or array

  let arr = [1, 2, 3, 4, 5];

  for (const i in arr) {
    console.log(i); // print all element of array
  }

  let obj = { name: "khushi", age: 20 };

  // we can access key in i to get value we have to write it like obj[i]
  for (const i in obj) {
    console.log(i);
    console.log(obj[i]);
  }

  // For in loop is used to iterate array return element one by one

  let arr1 = [1, 2, 3, 4, 5];
  arr1.forEach((el) => {
    console.log(el);
  });
}
//note: function
{
  // declarative functions

  function add(num1 = 0, num2 = 0) {
    return num1 + num2;
  }
  //exprational function

  const exp = function (num1 = 0, num2 = 0) {
    return num1 + num2;
  };

  // arrow function
  const arr = (num1 = 0, num2 = 0) => {
    return num1 + num2;
  };

  console.log(add(1, 2));
  console.log(exp(0, 2));
  console.log(arr(1, 8));
}
//note: Methods on string
{
  console.log("----------string------------");
  let str = "khushi Patel";
  let a = " hey";
  console.log(str.length); // print lenght
  console.log(str.indexOf("P"));
  console.log(str.lastIndexOf("h"));
  console.log(str.search("a"));
  console.log("------------");
  console.log(str.slice(-5, -2));
  console.log(str.substring(0, 2));
  console.log(str.substr(0, 2));
  console.log(str.replace("shi", "shiee"));
  console.log(str.replaceAll("shi", "shiee"));
  console.log(str.toUpperCase());
  console.log(str.toLocaleLowerCase());
  console.log(str.concat(a));
  console.log(str.trim());
  console.log(str.split(" "));
  console.log(str.charAt(3));
  console.log(str.charCodeAt(3));
}

//note:array
{
  let arr = [9, -1, -2, 3, 13, 31, 12, 31];
  // forEach
  arr.forEach((ele) => {
    console.log(ele);
  });

  let a = arr.filter((ele) => {
    return ele > 0;
  });
  console.log(a);

  let sum = arr.reduce((pv, cv) => {
    return pv + cv;
  }, 0);
  console.log(sum);

  let index = arr.indexOf(3);
  console.log(index);

  let narr = arr.map((el) => {
    return el / 2;
  });
  console.log(narr);

  // work just like reducer but from right side
  sum = arr.reduceRight((pv, cv) => {
    // ? here cv :current value and pv:previous value
    console.log("current value : ", cv, "previous value : ", pv);
    return pv + cv;
  });
  console.log(sum);

  let l_index = arr.lastIndexOf(3);
  console.log(l_index);

  console.log(arr.sort((a, b) => b - a)); //decrese order
  // for increse be write a-b

  // return true if any one element from array fullfill condition
  let result = arr.some((el) => {
    return el % 2 == 0;
  });
  console.log(result); // find if it has any even element or not

  // every element should match the condition
  result = arr.every((el) => {
    return el % 2 == 0;
  });
  console.log(result);

  // check that array contain that element or not
  result = arr.includes(3);
  console.log(result);

  //reverse the array
  console.log(arr.reverse());

  console.log(arr.find((ele) => ele == 31));
  result = arr.findIndex((elm) => {
    return elm === 31;
  });
  console.log(result);

  j = "**";
  result = arr.join(j);
  console.log(result);
}

//note:object methods
{
  o1 = { name: "khushi", dept: "cp" };
  o2 = { name: "keya", intro: "it" };

  // asign propty of one object to other and return
  console.log("--------=======-----------");
  let obj = Object.assign(o1, o2);
  console.log(obj);

  // debug: create new object which contain prototype of existing object
  let obj1 = Object.create(o2);
  console.log(obj1);
  console.log(obj1.__proto__);

  // debug: define propterties of gievn object
  let nobj = Object.defineProperties(obj, { age: { value: 19 } });
  console.log(nobj.age);
  console.log(nobj);

  let result = Object.entries(obj); // create array from object
  console.log(result); // return key value pair as one array
  /*
[ [ 'name', 'keya' ], [ 'dept', 'cp' ], [ 'intro', 'it' ] ]
*/

  // debug: freez object so we can not modify it further
  Object.freeze(o1);
  o1.name = "khu";
  console.log(o1);

  // create object from array
  let arr = [
    ["foo", "bar"],
    ["baz", 42],
  ];
  obj = Object.fromEntries(arr);
  console.log(obj);

  console.log("---- getownproperty -----");
  // return array of symbole if our object contain any symbole as property
  let ob = Object.getOwnPropertyDescriptor(o1, "name");
  console.log(ob);
  /*
---- getownproperty -----
{
  value: 'keya',
  writable: false,
  enumerable: true,
  configurable: false
}
*/

  /*
                  create  read  update  delete
freeze              No     yes    no      no
seal                No     yes    yes     no
preventExtension    No     yes    yes     yes
*/
  // debug: return prototype of object
  let objjj = Object.getPrototypeOf(obj);
  console.log(objjj);

  // compare two object and return boolean
  let ans = Object.is(o1, o2);
  console.log(ans);

  // return true if object is extensible
  let ko1 = 09;
  obj = Object.isExtensible(ko1);
  console.log(obj);

  obj = Object.isFrozen(obj1); //check freez or not
  //It is also used so that the current existing properties should not be modified
  console.log(obj);

  obj = Object.seal(obj1);
  /*
 It is also used so that the new properties do not get added
*/
  console.log(obj);

  obj = Object.isSealed(obj1);
  console.log(obj);

  let myobj = { name: "khushi", age: 20 };
  obj = Object.keys(myobj);
  console.log(obj);

  obj = Object.preventExtensions(myobj);

  // Object.defineProperty(myobj, "property1", {
  //   value: 42,
  // });
  console.log(obj);

  //obj = Object.setPrototypeOf(myobj, null);
  console.log(obj);
}
