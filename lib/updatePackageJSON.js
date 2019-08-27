const fs = require('fs')
const config = require('../package.json')

async function updatePackageJSON(version){

	config.version = version
	let config_json = JSON.stringify(config, null, '  ')
	fs.writeFileSync( './package.json', config_json)

	return "package.json updated"

}

module.exports = updatePackageJSON
