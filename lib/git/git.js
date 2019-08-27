const { exec } = require('child_process')
const gitAdd = require('./gitAdd.js')
const gitCommit = require('./gitCommit.js')
const gitPush = require('./gitPush.js')

async function git(publication){

	let commit_message = publication.message

	let add 		= await gitAdd()
	let commit	= await gitCommit( commit_message )
	let push		= await gitPush()

	return ""

}

module.exports = git
