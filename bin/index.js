#!/usr/bin/env node

const cligen = require('../../bdd-cligen/index.js')
cligen({ path: './spec/git.yml' }).then(program => {
    program.parse(process.argv)
})
