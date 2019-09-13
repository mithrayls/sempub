#!/usr/bin/env node
const Joi = require('@hapi/joi')
const emiln = require('../../emiln')

let commands = [
    /*
        Object.values(require('../spec/main.js')),
    Object.values(require('../spec/npm.js')),
    Object.values(require('../spec/gitea.js')),
    Object.values(require('../spec/git.js')),
    Object.values(require('../spec/github.js'))*/
    require('../spec/git.js')
]
emiln(commands, process.argv).then(async res => {
    console.log(await res)
    //    process.exit(1)
})
