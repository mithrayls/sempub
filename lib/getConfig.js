const merge = require('deepmerge')
const readPkg = require('read-pkg')
const Configstore = require('configstore')

async function getConfig(){

	let config = await readPkg()
	let config_store = new Configstore(config.name)
	config.publication = config_store.all

	return config

}

module.exports = getConfig
