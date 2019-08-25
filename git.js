const { exec } = require('child_process');

async function gitAdd(){
	exec('git add .', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
	})
	return
}

async function gitCommit(commit_message){
	exec(`git commit -m "${commit_message}"`, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})
	return
}

async function gitPush(){
	exec('git push', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stderr)
	})
	return
}


gitAdd()
	.then( res => { 
		return gitCommit('init')
	})
	.then( res => { 
		return gitPush()
	})
