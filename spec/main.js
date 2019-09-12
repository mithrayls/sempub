const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const git = require('./git.js')
const npm = require('./npm.js')

let routes = [
    {
        method: 'GET',
        path: '/init',
        //description: configurable, composite, init sequence,
        //        handler: init
        handler: async (request, h) => {
            let res = ''

            res += await git.init.handler()
            res += await npm.init.handler()
            res += await git.ignore.handler()
            res += await git.add.handler()
            /*
            let res1 = await exec('npm init -y')
            let res2 = await exec('git init')
            let res3 = await exec('echo "node_modules" >> .gitignore')
            let res4 = await exec('git add .')

            res += '\n' + 'npm init: ' + res1.stdout
            res += '\n' + 'git init: ' + res2.stdout
            res += '\n' + 'git ignore: ' + res3.stdout
            res += '\n' + 'git add: ' + res4.stdout
*/
            return res
        }
    },
    {
        method: 'GET',
        path: '/distribute',
        //description: configurable, composite, distribution sequence,
        handler: async (request, h) => {
            let res = ''

            res += await git.add.handler(request, h)
            res += await git.commit.handler(request, h)
            res += await git.create.handler(request, h)
            res += await git.branch.handler(request, h)
            res += await git.push.handler(request, h)
            /*
            let res1 = await exec('git add')
            let res2 = await exec('git commit -m')
            let res5 = await exec('github create-repo')
            let res4 = await exec('git push -u origin master')
            let res3 = await exec('git push')
            res += '\n' + 'git add: ' + res1.stdout
            res += '\n' + 'git commit: ' + res2.stdout
            res += '\n' + 'github create: ' + res3.stdout
            res += '\n' + 'git destination: ' + res4.stdout
            res += '\n' + 'git push: ' + res5.stdout
*/

            return res
        }
    }
    /*,
    {
        method: 'GET',
        path: '/publish',
        //description: configurable, composite, init sequence,
        handler: async (request, h) => {
            let command =
                'if [ -f "./package.json" ]; then echo "true"; else echo "false";fi'
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    },
    */
]

module.exports = routes
