#!/usr/bin/env node
const emiln = require('../../emiln')

let commands = [
    Object.values(require('../spec/git.js')),
    Object.values(require('../spec/npm.js')),
    Object.values(require('../spec/main.js'))
]
emiln(commands, process.argv).then(async res => {
    console.log(await res)
    //    process.exit(1)
})
