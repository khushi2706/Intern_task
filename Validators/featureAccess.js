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
  return featureAccess[featureName] && featureAccess[featureName][role]
}

console.log(checkAccess("client", "account"))
console.log(checkAccess("team", "group"))
