const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function jsExec(command) {
    let { stdout, stderr } = await exec(command)
    return { stdout, stderr }
}

module.exports = jsExec
