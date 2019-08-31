const npmPublish = require('./npm/npmPublish.js')
const modifyReadme = require('./modifyReadme.js')
const git = require('./git/git.js')

const { exec } = require('child_process')

async function executePublish( config ) {

	var publication = config.publication

	if ( publication.confirm ) {

		let version = publication.version
		let out = await exec(`npm version ${version}`)

		if (publication.add_release_notes) {
			await modifyReadme.addReleaseNotes(config)
		}
		if (publication.add_dependency_graph){
			await modifyReadme.addDependencyGraph(config)
		}
		if (publication.push_to_git){
			await git(publication)
		}

		await npmPublish()

		return "published"

	} else {
		
		return "not published"

	}

}

module.exports = executePublish
