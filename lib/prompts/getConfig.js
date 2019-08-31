const Configstore = require('configstore')
const fs = require('fs')

function setDefaultConfig(config_store){

	if ( !config_store.has('push_to_git') ){
		config_store.set(push_to_git, true)
	}
	if ( !config_store.has('require_confirmation') ){
		config_store.set(require_confirmation, true)
	}
	if ( !config_store.has('default_release_type') ){
		config_store.set('default_release_type', true)
	}
	if ( !config_store.has('add_release_notes') ){
		config_store.set('add_release_notes', true)
	}

	return 
}

async function getConfig(){

	const data = await fs.readFileSync( './package.json' , 'utf8' )
	const config = JSON.parse(data)
	let config_store = new Configstore(config.name)
	await setDefaultConfig(config_store)

	config.publication = config_store.all

	return config

}

module.exports = getConfig
