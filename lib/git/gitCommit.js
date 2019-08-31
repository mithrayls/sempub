const exec = require('../helpers/exec.js')
const fs = require('fs')
const yaml = require('yaml')
const path = require('path')
const escape = require('shell-escape-tag')
const sprintf = require('sprintf-js').sprintf

const command_file = path.join( __dirname, '../helpers/commands.yml' )
const commands = yaml.parse(fs.readFileSync( command_file, 'utf8'))

async function gitCommit(message){

	message = escape`${message}`

	let command = sprintf( 'git commit -m "%(message)s"', { message })
				console.log(command)

	let { stdout, stderr } = await exec( 'git add .' )

	console.log(stdout)
	console.log(stderr)

	//let { stdout, stder } = await exec( command )

	return { stdout, stderr }

}
	
module.exports = gitCommit

gitCommit('testing')
