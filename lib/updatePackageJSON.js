const fs = require('fs')
const readPkg = require('read-pkg')

async function updatePackageJSON(version){

	const config = await readPkg()
	config.version = version
	let config_json = JSON.stringify(config, null, '  ')
				console.log(config_json)
	fs.writeFileSync( './package.json', config_json)

	return "package.json updated"

}

module.exports = updatePackageJSON
