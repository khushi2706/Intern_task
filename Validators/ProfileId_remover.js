let data = [
  {
    profileId: 123,
    insites: {
      date: new Date(11 - 11 - 2023),
      reach: 123,
      eng: 10,
      likes: 300,
    },
    isActive: false,
  },
  {
    insites: {
      date: new Date(11 - 10 - 2023),
      reach: 1212,
      eng: 101,
      likes: 200,
    },
  },
  {
    profileId: 124,
    insites: {
      date: new Date(11 - 12 - 2023),
      reach: 124,
      eng: 100,
      likes: 100,
    },
    isActive: true,
  },
]

const newData = data.filter((ele) => ele.profileId && ele.isActive)

//console.log(newData)

const sortByDate = data.sort((a, b) => {
  return new Date(a.insites.date) - new Date(b.insites.date)
  //   a.insites.date > b.insites.date ? -1 : 1
})
//console.log(sortByDate) // newest first

const sortByOther = (ele) =>
  data.sort((a, b) => (a.insites[ele] > b.insites[ele] ? -1 : 1))

console.log(sortByOther("likes"))
console.log(sortByOther("eng"))
console.log(sortByOther("reach"))
