const { exec } = require('child_process')

async function updatePackageJSON(version){
	
	let command = `npm version `

	let out = await exec( command, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return stdout
		}
		return { err, stdout, stderr}
	})

	return out
}

module.exports = updatePackageJSON
