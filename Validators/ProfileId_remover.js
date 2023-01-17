var data = [
  {
    profileId: 123,
    insites: {
      date: new Date("2021-03-25"),
      reach: 123,
      eng: 10,
      likes: 300,
    },
    isActive: false,
  },
  {
    profileId: 122,
    insites: {
      date: new Date("2021-02-2"),
      reach: 123,
      eng: 10,
      likes: 300,
    },
    isActive: false,
  },
  {
    insites: {
      date: new Date("2021-03-25"),
      reach: 1212,
      eng: 101,
      likes: 200,
    },
  },
  {
    profileId: 124,
    insites: {
      date: new Date("2021-03-25"),
      reach: 124,
      eng: 100,
      likes: 100,
    },
    isActive: true,
  },
]

//const newData = data.filter((ele) => ele.profileId && ele.isActive)

//console.log(newData)

// const sortByDate = data.sort((a, b) => {
//   return new Date(a.insites.date) - new Date(b.insites.date)
//   //   a.insites.date > b.insites.date ? -1 : 1
// })
//console.log(sortByDate) // newest first

const sortByOther = (arr, ele) =>
  arr.sort((a, b) => (a.insites[ele] > b.insites[ele] ? -1 : 1))

function sortInMyWay(ele) {
  let setOfDate = new Set()

  for (const ele of data) {
    setOfDate.add(ele.insites.date.toDateString())
  }

  console.log(setOfDate)
  let myNewObj = new Map()

  setOfDate.forEach((date) => {
    let myArrayOfThisDate = data.filter(
      (ele) =>
        // console.log(ele.insites.date, date)
        ele.insites.date.toDateString() == date
    )

    //console.log(myArrayOfThisDate)
    let mySortedArry = sortByOther(myArrayOfThisDate, ele)
    console.log(mySortedArry)
    console.log("=======")
    myNewObj.set(date, mySortedArry)
  })

  console.dir(myNewObj, { depth: null })
}

sortInMyWay("likes")

// console.log(sortByOther("likes"))
// console.log(sortByOther("eng"))
// console.log(sortByOther("reach"))
