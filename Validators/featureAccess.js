const featureAccess = {
  account: {
    team: true,
    client: false,
    owner: true,
  },
  group: {
    team: true,
    client: true,
    owner: true,
  },
}

function checkAccess(role, featureName) {
  if (featureAccess[featureName]) return featureAccess[featureName][role]

  return false
}

console.log(checkAccess("client", "account"))
console.log(checkAccess("team", "group"))
