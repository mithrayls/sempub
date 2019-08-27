#! /usr/bin/node

const config = require('../package.json')
const prog = require('caporal');
const sempub = require('../index.js')
const initConfig = require('../lib/init.js')


async function init( args, options, logger){
	initConfig()
}


async function publish( args, options, logger){
	if ( options.message ) {
		let message = options.message
		sempub(message)
	} else {
		sempub('')
	}
}


async function startCLI(config){
	prog
		.version(config.version)

		.command( 'init', 'initialize configuration')
		.action( init )

		.command( 'publish', 'publish package')
		.action( publish )
		.option( '--message <message>', 'git commit message')

	prog.parse(process.argv)
}

startCLI(config)
