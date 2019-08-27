const fs = require('fs')

async function addReleaseNotes(publication) {
	
	let version       = publication.version
	let release_notes = publication.notes

	if ( release_notes.length > 0 ) {
		release_notes = release_notes.replace(/^gm/,'* ')
	}
	
	release_notes = `\n### Release ${version}\n\n${release_notes}`

	let readme_data = fs.readFileSync('./README.md','utf8')
	
	if ( readme_data.includes('## Release Notes') ){
		readme_data = readme_data.replace(/(## Release Notes)/,'$&\n'+release_notes)
	} else {
		readme_data = readme_data + '\n## Release Notes\n' + release_notes
	}

	fs.writeFileSync('./README.md', readme_data, 'utf8')
		
	return

}

module.exports = addReleaseNotes
