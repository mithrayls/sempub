const exec = require('./helpers/exec.js')
const fs = require('fs')
const yaml = require('yaml')
const command_file = './helpers/commands.yml'
const commands = yaml.parse(fs.readFileSync( command_file, 'utf8'))

async function gitInit(){

	let { stdout, stder } = await exec( commands.git.init )

	return { stdout, stderr }

}

module.exports = { gitInit, }
