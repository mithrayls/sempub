const prompts = require('./prompts/prompts.js')

const promptType 					= prompts.promptType
const promptMessage 			= prompts.promptMessage
const promptNotes 				= prompts.promptNotes
const promptConfirmation	= prompts.promptConfirmation

async function getType( prompt_type, config ){

	var type

	if ( prompt_type ) {
		type = await promptType( config )
	} else {
		type = config.publication.default_release_type
	}

	return type

}


async function getMessage( prompt_message, passed_cli_message ){

	let message	
	
	if ( prompt_message	) {
		message = await promptMessage( )//(config )
	} else {
		message = passed_cli_message
	}

	return message

}


async function getNotes( prompt_notes, config ){

	var notes
	
	if ( prompt_notes ) {
		notes = await promptNotes( config.publication.message )//config )
	} else {
		notes = false
	}
	
	return notes

}

async function getConfirmation( prompt_confirmation, config ){

	var confirmation

	if ( prompt_confirmation ) {
		confirmation = await promptConfirmation( )// config )
	} else {
		confirmation = true
	}

	return confirmation

}

module.exports = { getType, getMessage, getNotes, getConfirmation }
