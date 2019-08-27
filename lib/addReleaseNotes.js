const fs = require('fs')

async function addReleaseNotes(publication) {
	
	let version       = publication.version
	let release_notes = publication.notes

	release_notes = `\n\n### Release ${version}\n\n${release_notes}`

	let readme_data = fs.readFileSync('./README.md','utf8')
	
	if ( readme_data.includes('## Release Notes') ){
		readme_data = readme_data.replace(/(## Release Notes)/,'$&'+release_notes)
		readme_data = readme_data.replace(/(\n){3}(### Release [0-9])/g,	'\n\n$2')
	} else {
		readme_data = readme_data + '\n## Release Notes' + release_notes
	}

	fs.writeFileSync('./README.md', readme_data, 'utf8')
		
	return

}

module.exports = addReleaseNotes
