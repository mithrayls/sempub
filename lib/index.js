const fs = require('fs')
const c = require('ansi-colors')
const inquirer = require('inquirer')
const questions = require('./lib/questions/release_questions.js')
const getConfig = require('./lib/getConfig.js')
const validateCommitMessage = require('./lib/validateCommitMessage')

const executePublish = require('./lib/executePublish.js')
const git = require('./lib/git/git.js')
const npmPublish = require('./lib/npm/npmPublish.js')
const get = require('./lib/get.js')
const writeSVG = require('./lib/getDependenciesSVG.js')

const semver = require('semver')

/**
 * Entry Point
 */
async function sempub(passed_cli_message) {
    /*
     * Get info from config
     */

    let config = await getConfig()
    let publication = config.publication

    /*
     * Get info from prompts.
     * */

    let valid_commit_message = validateCommitMessage(passed_cli_message)

    let prompt_type =
        ['patch', 'minor', 'major'].indexOf(
            publication.default_release_type
        ) === -1
    let prompt_message = publication.push_to_git && !valid_commit_message
    let prompt_notes = publication.add_release_notes
    let prompt_confirmation = publication.require_confirmation

    let type = await get.getType(prompt_type, config)
    let message = await get.getMessage(prompt_message, passed_cli_message)
    config.publication.message = message
    let notes = await get.getNotes(prompt_notes, config)

    publication.type = type
    publication.notes = notes

    let current_version = config.version
    publication.version = semver.inc(current_version, type)

    config.publication = publication

    let output_image_path = './reports/dependencies.svg'
    output_image_path = await writeSVG('./index.js', output_image_path)

    console.log(output_image_path)
    /*
			.then( svg => {
				let filename = './dependencies.svg'
				fs.writeFile(filename, svg, (err) => {
					if (err) throw err
				})
				return output_image_path
			})
*/
    publication.confirm = await get.getConfirmation(prompt_confirmation, config)

    /*
     * Execute.
     */

    let completion = publication.confirm
        ? await executePublish(publication)
        : 'Publication cancelled.'

    return completion
}

module.exports = sempub
