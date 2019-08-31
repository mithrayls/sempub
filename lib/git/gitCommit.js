const exec		= require('../helpers/exec.js')
const fs 			= require('fs')
const yaml		= require('yaml')
const path		= require('path')
const esc 		= require('shell-escape-tag')
const sprintf = require('sprintf-js').sprintf

const command_file = path.join( __dirname, '../../spec/commands.yml' )
const commands = yaml.parse(fs.readFileSync( command_file, 'utf8'))

async function gitCommit(message){

	message = esc`${message}`
	let command = sprintf( commands.git.commit, { message } )
	let { stdout, stderr } = await exec( command )

	return { stdout, stderr }

}
	
module.exports = gitCommit
