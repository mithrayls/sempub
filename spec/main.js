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

            res += await git.init.handler(request, h)
            res += await npm.init.handler(request, h)
            res += await git.ignore.handler(request, h)
            res += await git.add.handler(request, h)

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
            console.log(res)
            res += await git.commit.handler(request, h)
            res += await git.create.handler(request, h)
            res += await git.branch.handler(request, h)
            res += await git.push.handler(request, h)

            return res
        }
    },
    {
        method: 'GET',
        path: '/publish',
        //description: configurable, composite, publish sequence,
        handler: async (request, h) => {
            let res = ''
            res += await git.add.handler(request, h)
            res += await git.commit.handler(request, h)
            res += await git.push.handler(request, h)
            res += await npm.publish.handler(request, h)
            res += await npm.version.handler(request, h)
            return res
        }
    }
    /*
     */
]

module.exports = routes
