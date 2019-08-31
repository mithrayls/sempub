const fs = require('fs')
const path = require('path')

async function npmRepoExists(){

	let path = "./package.json"
	let path_access = false

	try {
		fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK)
		path_access = true
	} catch (err){
		path_access = false	
	}

	return path_access

}

module.exports = npmRepoExists
