const { exec } = require('child_process')

async function gitCommit(commit_message){

	let command = `git commit -m "${commit_message}"`
	command = command.replace(/'/,'&#39;')

				console.log(command)

	let out = await exec( command , (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return err
		}
		return { err, stdout, stderr}
	})

	return out
}
	
module.exports = gitCommit
