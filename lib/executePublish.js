const npmPublish = require('./npm/npmPublish.js')
const updatePackageJSON = require('./updatePackageJSON.js')
const addReleaseNotes = require('./addReleaseNotes.js')
const git = require('./git/git.js')

async function executePublish( publication ) {

	if ( publication.confirm ) {

		let version = publication.version
		await updatePackageJSON(version)

		if (publication.add_release_notes) {
			await addReleaseNotes(publication)
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
