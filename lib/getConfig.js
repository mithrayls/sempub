const Configstore = require('configstore')
const fs = require('fs')

async function getConfig(){

	const data = await fs.readFileSync( './package.json' , 'utf8' )
	const config = JSON.parse(data)
	let config_store = new Configstore(config.name)
	config.publication = config_store.all

	return config

}

module.exports = getConfig
