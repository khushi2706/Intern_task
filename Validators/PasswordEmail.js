function isCorrectPass(pass) {
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  return regex.test(pass)
}

console.log(isCorrectPass("khushi"))
console.log(isCorrectPass("khushipatel"))
console.log(isCorrectPass("khushi@123"))
console.log(isCorrectPass("Khushi@1234"))

function isCorrectEmail(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}
console.log("------mail---------")
console.log(isCorrectEmail("khushi@mail.com"))
console.log(isCorrectEmail("khushi@djskdja"))
console.log(isCorrectEmail("317123@mail.com"))
