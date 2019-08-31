#! /usr/bin/node

const program = require('commander')
const yaml		= require('yaml')

const config 				= require('../package.json')
const sempub 				= require('../index.js')
const command_file	= require('./commands.yml')
const commands 			= yaml.parse(fs.readFileSync( command_file, 'utf8'))

program

	.version(config.version)

	commands.forEach( command => {
		.command( 'init')
		.description('initialize configuration')
		.action( sempub.init )
	})

program.parse(process.argv)
