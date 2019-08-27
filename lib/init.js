const Configstore = require('configstore')
const inquirer = require('inquirer')
const init_questions = require('./questions/init_questions.js')
const fs = require('fs')

const data = fs.readFileSync('./package.json','utf8')
const packageJson = JSON.parse(data)

const config = new Configstore(packageJson.name)


const questions = [
	init_questions.push_to_git,
	init_questions.require_confirmation,
	init_questions.add_release_notes,
	init_questions.default_release_type,
]

function bool(arg){
	if (arg==='yes'){
		return true
	}
	if (arg==='no'){
		return false
	}
}

function parseAnswers(answers){

	let notes			= bool(answers.add_release_notes)
	let git 			= bool(answers.push_to_git)
	let confirm 	= bool(answers.require_confirmation)
	var type 			= answers.default_release_type

	if ( type === "No Default") {
		type = "none"
	} else {
		type = type.toLowerCase()
	}
	
	return { notes, git, confirm, type }

}

async function init(){

	let full_config = await inquirer
		.prompt( questions )
		.then( answers =>{
			
			answers = parseAnswers(answers)

			config.set( 'add_release_notes', answers.notes )
			config.set( 'push_to_git', answers.git )
			config.set( 'require_confirmation', answers.confirm )
			config.set( 'default_release_type', answers.type)

			return config.all

		})

	return full_config
}

module.exports = init
