const log				= require('@mithray/logger')
const gitInit 	= require('./git/gitInit.js')
const gitAdd 		= require('./git/gitAdd.js')
//const npmInit = require('./npm/npmInit.js')

async function init(){

	let git_init_res	= await gitInit()
	log.info(git_init_res)

	let git_add_res 	= await gitAdd()
	log.info(JSON.stringify(git_add_res.stdout))

//	let npm_init_res = await npmInit()

	let res = ""
	return res
}

module.exports = init
