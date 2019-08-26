const { exec } = require('child_process')

async function gitAdd(commit_message){

	let out = await exec('git add .', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return commit_message
		}
		return commit_message
	})

	return commit_message
}

async function gitCommit(commit_message){

	let out = await exec(`git commit -m "${commit_message}"`, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return err
		}
		console.log(stdout)
	})

	return commit_message
}

async function gitPush( commit_message ){
	
	let out = await exec('git push', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return err
		}
		console.log(stderr)
	})

	return commit_message

}


async function git(commit_message){

	gitAdd( commit_message )
		.then( gitCommit )
		.then( gitPush )

}


module.exports = git
