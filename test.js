const semver = require('semver')

let ver = semver.inc('1.2.3', 'major')

console.log(ver)
