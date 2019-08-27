const fs = require('fs')

async function updatePackageJSON(version){
	
	const data = fs.readFileSync( './package.json' , 'utf8' )
	const config = JSON.parse(data)

	config.version = version
	let config_json = JSON.stringify(config, null, '  ')
	fs.writeFileSync( './package.json', config_json)

	return "package.json updated"

}

module.exports = updatePackageJSON
