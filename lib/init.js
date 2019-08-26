const packageJson = require('../package.json')
const Configstore = require('configstore')
const config = new Configstore(packageJson.name)
const inquirer = require('inquirer')

async function init(){

	let init_answers = await inquirer.prompt([{
			type: 'list',
			name: 'prompt_release_notes',
			message: 'Would you like to be prompted to add release notes to your README.md?',
			choices: [ 'yes', 'no' ]
		}, {
			type: 'list',
			name: 'git',
			message: 'Would you like to automatically push to git?',
			choices: [ 'yes', 'no' ]
		}])
		.then( answers =>{
	
			if ( answers.prompt_release_notes === 'yes' ) {
				config.set( 'prompt_release_notes', true)
			} else {
				config.set( 'prompt_release_notes', false)
			}

			if ( answers.git === 'yes' ) {
				config.set( 'git', true)
			} else {
				config.set( 'git', false)
			}
		})

	return init_answers
}

module.exports = init
