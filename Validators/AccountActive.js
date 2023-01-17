const accountMaster = [
  {
    accountId: 1,
    accountName: "Twitter",
    isActive: true,
  },
  {
    accountId: 2,
    accountName: "Facebook",
    isActive: false,
  },
  {
    accountId: 3,
    accountName: "Linkedin",
  },
  {
    accountId: 4,
    accountName: "FB page",
  },
]

function checkAccountId(id) {
  if (id < 1 || id > accountMaster.length - 1) return false
  for (const acc of accountMaster) {
    if (acc.accountId == id) {
      return acc.isActive
    }
  }
}

console.log(checkAccountId(2), checkAccountId(1002))
