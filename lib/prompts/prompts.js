const inquirer = require('inquirer')
const questions = require('../questions/release_questions.js')
const c = require('ansi-colors')
const logUpdate = require('log-update')
const hints = require('../questions/hints.js')
const emoji = require('node-emoji')

const md = require('@mithray/md-terminal')


async function promptType( config ){

	let type_query = questions.type
	let type = await inquirer
		.prompt([type_query])
		.then( answers => {
			let type = answers.type.toLowerCase()
			return type
		})

	return type

}


async function promptMessage(){


	logUpdate(md(hints.git_commit_hint))

	let message_query = questions.message
	let message = await inquirer
		.prompt([message_query])
		.then( answers => {

			return answers.message.trim()
		})

	logUpdate.clear()

	return message

}


async function promptNotes(message){

	logUpdate(md(hints.release_notes_hint))

  if ( message.length > 0 ) {
		message = message.trim()
		message = message.replace(/^/mg,'* ')
	}


	let notes_query = questions.notes
	notes_query.default = message
	let notes = await inquirer
		.prompt([notes_query])
		.then( answers => {
			let notes = emoji.emojify(answers.notes)
			return notes
		})

	logUpdate.clear()

	return notes

}


async function promptConfirmation( config ){

	let type = config.publication.type
	let version = config.publication.version
	let confirmation_query = questions.confirmation
	confirmation_query.message = `Confirm publishing your ${c.blue.italic(type)} release with version number ${c.blue.italic(version)} ?`
	let confirmation = await inquirer
		.prompt([confirmation_query])
		.then( answers => {
			return answers.confirmation
		})

	return confirmation

}

module.exports = { promptType, promptMessage, promptNotes, promptConfirmation }
