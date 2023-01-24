const groupSchema = {
  title: {
    type: "string",
    require: true,
  },
  decs: {
    type: "string",
    require: true,
  },
  listOfMember: {
    type: "array",
    require: true,
  },
}
const { CheckType } = require("./typeValidator")

const Verifygroup = (group) => {
  let finalAns = true // variable to check the all field types

  // itrate the schema
  for (let key in groupSchema) {
    // if require object
    if (groupSchema[key].require && group[key] == undefined) {
      return false
    }
    if (group[key]) {
      typeof groupSchema[key] == "string"
        ? (finalAns = finalAns && group[key] == group[key].trim())
        : (finalAns = finalAns && CheckType(group[key], groupSchema[key].type))
    }
  }
  return finalAns
}

module.exports = Verifygroup
