const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function jsExec(options) {
    let { stdout, stderr } = await exec(options.command)

    return { stdout, stderr }
}

module.exports = jsExec
