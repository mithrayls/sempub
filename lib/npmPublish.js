const { exec } = require('child_process')

async function npmPublish(){
	exec(`npm publish`, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})
	return
}

module.exports = npmPublish
