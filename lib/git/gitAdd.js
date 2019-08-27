const { exec } = require('child_process')

async function gitAdd(){

	let out = await exec('git add .', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return stdout
		}
		return { err, stdout, stderr}
	})

	return out
}

module.exports = gitAdd
