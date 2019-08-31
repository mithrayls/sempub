const fs = require('fs')

async function addDependencyGraph(publication){

	if ( readme_data.includes('## Dependency Graph') ){}
	else {
		function insertGraph(match, p1, p2){
			let url = config.repository.url
			regex = /^.*(https:\/\/)(.*\.com)(.*).git/
			url = url.replace(regex,'$1raw.githubusercontent.com$3')
			let link_svg = `![Project Dependency Graph](${url}/master/dependencies.svg?sanitize=true)`

			let start = '## Dependency Graph\n\n'
			let middle = link_svg + '\n\n'
			let end = p1
			let out = start + middle + end
			return out
		}
		readme_data	= readme_data.replace(/(## Release Notes)/, insertGraph)
	}
	![Project Dependency Graph](https://raw.githubusercontent.com/mithrayls/sempub/master/dependencies.svg?sanitize=true)
}

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

module.exports = { addReleaseNotes, addDependencyGraph} 
