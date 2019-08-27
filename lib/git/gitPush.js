const { exec } = require('child_process')

async function gitPush( ){
	
	let out = await exec('git push', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return err
		}
					console.log('---')
					console.log(err)
					console.log('---')
					console.log(stderr)
					console.log('---')
					console.log(stdout)
					console.log('---')
		return { err, stdout, stderr}
	})

	return out

}

module.exports = gitPush
