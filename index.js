const fs = require('fs')
const c = require('ansi-colors')
const inquirer = require('inquirer')

const readPkg = require('read-pkg')
const Configstore = require('configstore')
var version
var config_store

async function readPackageJSON() {
	config = await readPkg()
	config_store = new Configstore(config.name)
	version = config.version
	if (config_store.prompt_release_notes){
		questions.push(release_notes)
	}
}

const git = require('./lib/git.js')
const npmPublish = require('./lib/npmPublish.js')

async function updatePackageJSON(version){
	config.version = version
	let config_json = JSON.stringify(config, null, '  ')
	fs.writeFileSync('./package.json', config_json)
	return ""
}

function incrementVersion( version, release_type ){
				console.log(version)
	let version_arr = version.split('.')

	if ( release_type === 'patch'){
		let new_version = Number(version_arr[2]) + 1
		version_arr[2] = String(new_version)
	} else if ( release_type === 'minor'){
		let new_version = Number(version_arr[1]) + 1
		version_arr[1] = String(new_version)
		version_arr[2] = "0"
	} else if ( release_type === 'major'){
		let new_version = Number(version_arr[0]) + 1
		version_arr[0] = String(new_version)
		version_arr[1] = "0"
		version_arr[2] = "0"
	} 

	version = version_arr.join('.')

	return version
}

const questions = [{
		type: 'input',
		name: 'commit_message',
		message: 'Please write a git commit message.'
	}, {
		type: 'list',
		name: 'release_type',
		message: 'Select version type.',
		choices: [ 'Patch', 'Minor', 'Major' ]
	}
]

const release_notes = {
		type: 'editor',
		name: 'release_notes',
		message: 'Please enter release notes(optional).'
}

const confirmation = [{
		type: 'confirm',
		name: 'confirmation',
		message: 'Do you wish to confirm?'
	}]

const publication_details = {
	release_type: "",
	version: "",
	commit_message: "",
	release_notes: "",
}


async function promptDetails(){
	let details = await inquirer
		.prompt( questions )
  	.then( answers => {
			let current_version = config.version
			publication_details.release_type = answers.release_type.toLowerCase()
			publication_details.version = incrementVersion( current_version, publication_details.release_type )
			publication_details.commit_message = answers.commit_message
			publication_details.release_notes = answers.release_notes

			let version = publication_details.version
			let type = publication_details.release_type

			confirmation[0].message = `Do you wish to publish a ${c.italic.blue(type)} release with version number ${version}?`

			return publication_details
	  })
	return details 
}


async function confirmPublish(details) {

	let confirm = await inquirer
	  .prompt( confirmation )
	  .then( answers => {
			return answers.confirmation
	  })

	return confirm

}


async function publish(confirmation) {

	if ( confirmation ) {
		let version = publication_details.version
		await updatePackageJSON(version)
		await git(publication_details.commit_message)
		await npmPublish()
		return "published"
	} else {
		return "not published"
	}

}


function log(message) {
	console.log(message)
	return message
}


async function sempub(){
	readPackageJSON()
		.then( promptDetails )
		.then( confirmPublish )
		.then( publish )
		.then( log )
}

module.exports = sempub
