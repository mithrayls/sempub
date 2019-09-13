#!/usr/bin/env node
const Joi = require('@hapi/joi')
const emiln = require('../../emiln')

let commands = [
    require('../spec/main.js'),
    require('../spec/npm.js'),
    require('../spec/gitea.js'),
    require('../spec/git.js'),
    require('../spec/github.js')
]
emiln(commands, process.argv).then(async res => {
    console.log(await res)
    process.exit(0)
})
