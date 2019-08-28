const inquirer = require('inquirer')
const questions = require('../questions/release_questions.js')
const incrementVersion = require('../incrementVersion.js')
const c = require('ansi-colors')
//const md = require('cli-marked')
const logUpdate = require('log-update')
const hints = require('../questions/hints.js')
const emoji = require('node-emoji')

const md = require('../markedCLI.js')


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
/*

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
*/

module.exports = { promptType, promptMessage, promptNotes, promptConfirmation }
