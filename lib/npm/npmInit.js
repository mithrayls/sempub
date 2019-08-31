const exec = require('./exec.js')

async function npmInitRepo(obj){

	let res = await exec('npm init -y')
	let regex = new RegExp(/.*?\{(.*)\}.*/,'s')
	res = res.stdout
	res = res.replace(regex, '{$1}')

	res = JSON.parse(res)

	return res
}

module.exports = npmInitRepo
