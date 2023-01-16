const crypto = require("crypto")

const secret = "thisIsSecret"

/*
Hash-based Message Authentication Code. 
It is a process for applying a hash algorithm to 
both data and a secret key that results in a single final hash.
*/

const pass = "hello"
const hash = crypto.createHmac("sha256", secret).update(pass).digest("hex")
const hash1 = crypto.createHmac("md5", secret).update(pass).digest("hex")

console.log(hash)
console.log(hash1)

/*
create a Cipher object, with the stated algorithm, 
key and initialization vector (iv).
*/

const password = "abc"

// encryption
let iv = crypto.randomBytes(16)
let key = crypto.scryptSync(password, "salt", 32)

let ciper = crypto.createCipheriv("aes-256-cbc", key, iv)
let encrpt = ciper.update(password, "utf-8", "hex")
encrpt += ciper.final("hex")

console.log(encrpt)

// decryption

let dipciper = crypto.createDecipheriv("aes-256-cbc", key, iv)
let decript = dipciper.update(encrpt, "hex", "utf-8")
decript += dipciper.final("utf-8")

console.log(decript)
