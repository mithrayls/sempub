const exec		= require('../helpers/exec.js')
const fs 			= require('fs')
const yaml		= require('yaml')
const path		= require('path')
const esc 		= require('shell-escape-tag')
const sprintf = require('sprintf-js').sprintf

const command_file = path.join( __dirname, '../helpers/commands.yml' )
const commands = yaml.parse(fs.readFileSync( command_file, 'utf8'))

async function gitCommit(message){

	message = esc`${message}`
	let command = sprintf( commands.git.commit, { message } )

	let { stdout1, stderr1 } = await exec( 'git init' )
	let { stdout2, stderr2 } = await exec( 'git add .' )
	let { stdout3, stderr3 } = await exec( command )
	let { stdout4, stderr4 } = await exec( 'git push' )

	let obj = { stdout1, stderr1, stdout2, stderr2, stdout3, stderr3 }
				console.log(obj)

				return obj

}
	
module.exports = gitCommit

gitCommit('testing')
.then(res=>{
	console.log(res)
})

