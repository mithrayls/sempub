const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const git = require('./git.js')
const npm = require('./npm.js')

let routes = [
    {
        method: 'GET',
        path: '/init',
        //        handler: init
        options: {
            handler: async (request, h) => {
                let res = ''

                res += await git.init.handler(request, h)
                res += await npm.init.handler(request, h)
                res += await git.ignore.handler(request, h)
                res += await git.add.handler(request, h)

                return res
            },
            description: 'configurable, composite, init sequence',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'] // ADD THIS TAG
        }
    },
    {
        method: 'GET',
        path: '/distribute',
        handler: async (request, h) => {
            let res = ''

            res += await git.add.handler(request, h)
            //           console.log(res)
            res += await git.commit.handler(request, h)
            //            res += await git.github_create.handler(request, h)
            //            res += await git.branch.handler(request, h)
            res += await git.push.handler(request, h)

            return res
        },
        options: {
            description: 'configurable, composite, distribution sequence',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'] // ADD THIS TAG
        }
    },
    {
        method: 'GET',
        path: '/publish',
        handler: async (request, h) => {
            let res = ''
            res += await git.add.handler(request, h)
            res += await git.commit.handler(request, h)
            res += await git.push.handler(request, h)
            res += await npm.publish.handler(request, h)
            res += await npm.version.handler(request, h)
            return res
        },
        options: {
            //               handler: handlers.getToDo,
            description: 'configurable, composite, publish sequence',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'] // ADD THIS TAG
        }
    }
    /*
     */
]

module.exports = routes
