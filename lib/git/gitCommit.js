const { exec } = require('child_process')

async function gitCommit(commit_message){

	let out = await exec(`git commit -m $'${commit_message}'`, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return err
		}
		return { err, stdout, stderr}
	})

	return out
}
	
module.exports = gitCommit
