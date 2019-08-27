const merge = require('deepmerge')
const config = require('../package.json')
const Configstore = require('configstore')

async function getConfig(){

	let config_store = new Configstore(config.name)
	config.publication = config_store.all

	return config

}

module.exports = getConfig
