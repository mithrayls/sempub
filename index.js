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
	if (config_store.get('prompt_release_notes')){
		questions.push(release_notes_query)
	}
	return config_store
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
		type: 'list',
		name: 'release_type',
		message: 'Select version type.',
		choices: [ 'Patch', 'Minor', 'Major' ]
	}]

const commit_message_query = {
		type: 'input',
		name: 'commit_message',
		message: 'Please write a git commit message.'
}
const release_notes_query = {
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

function checkInformation(commit_message){
	if ( commit_message.length > 0 ){
		let prompt_for_message = false
		return { prompt_for_message, commit_message }
	} else {
		questions.push(commit_message_query)
		let prompt_for_message = true
		return { prompt_for_message, commit_message }
	}
}

async function promptDetails( options ){
	let details = await inquirer
		.prompt( questions )
  	.then( answers => {
			let current_version = config.version
			publication_details.release_type = answers.release_type.toLowerCase()
			publication_details.version = incrementVersion( current_version, publication_details.release_type )
			if ( options.prompt_for_message ) {
				publication_details.commit_message = answers.commit_message
			} else {
				publication_details.commit_message = options.commit_message
			}
			publication_details.release_notes = answers.release_notes

			let version = publication_details.version
			let type = publication_details.release_type
			let commit_message = publication_details.commit_message

			confirmation[0].message = `Do you wish to publish a ${c.italic.blue(type)} release with version number ${version} and commit message ${c.italic.blue(commit_message)}?`

			return publication_details
	  })
	options.details = details
	return options
}


async function confirmPublish( options ) {

	let confirm = await inquirer
	  .prompt( confirmation )
	  .then( answers => {
			return answers.confirmation
	  })

	options.confirm = confirm

	return options

}

async function addReleaseNotes(options) {
	version				= options.details.version
				console.log(options)
	let release_notes = options.details.release_notes
	release_notes = release_notes.replace(/^gm/,'* ')
	release_notes = `\n### Release ${version}\n\n${release_notes}`
	await fs.appendFileSync('./README.md', release_notes)
	return
}

async function publish(options) {

	console.log(options)

	if ( options.confirm ) {
		let version = publication_details.version
		await updatePackageJSON(version)
		await addReleaseNotes(options)
		if (options.config.git){
			await git(publication_details.commit_message)
		}
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


async function sempub(message){

	let config_store = await readPackageJSON()
	let config = config_store.all

	let options = checkInformation(message)
	options.config = config

	promptDetails(options)
		.then( confirmPublish )
		.then( publish )
		.then( log )
}

module.exports = sempub
