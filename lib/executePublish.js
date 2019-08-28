const npmPublish = require('./npm/npmPublish.js')
//const updatePackageJSON = require('./updatePackageJSON.js')
const addReleaseNotes = require('./addReleaseNotes.js')
const git = require('./git/git.js')

const { exec } = require('child_process')
/*
async function updatePackageJSON(version){

				  let command = `npm version ${version}`

				  let out = await exec( command, (err, stdout, stderr) => {
									    if (err) {
															      console.error(err)
															      return stdout
															    }
									    return { err, stdout, stderr}
									  })

				  return out
}

module.exports = updatePackageJSON
*/

async function executePublish( publication ) {


	if ( publication.confirm ) {

		let version = publication.version
//		await updatePackageJSON(version)
		let out = await exec(`npm version ${version}`)

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
