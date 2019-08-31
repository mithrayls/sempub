#! /usr/bin/node

const program = require('commander')
const config = require('../package.json')
const sempub = require('../index.js')

program

	.version(config.version)

	.command( 'init')
	.description('initialize configuration')
	.action( sempub.init )

program.parse(process.argv)
