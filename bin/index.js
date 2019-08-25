#! /usr/bin/node

const sempub = require('../index.js')

const args = process.argv.splice(process.execArgv.length + 2)

const arg = args[0]

sempub()
	.then( res => {
		console.log(res)
	})
