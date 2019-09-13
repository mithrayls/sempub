const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const git = require('./git.js')
const github = require('./github.js')
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

            console.log('adding local files')
            await git.add.handler(request, h)

            console.log('checking for changes')
            let diff = await git.diff.handler(request, h)

            if (diff.stdout.length > 1) {
                console.log('committing files')
                await git.commit.handler(request, h)
            } else {
                console.log('no changes to commit')
            }

            let upstream = await git.getUpstream.handler(request, h)
            let remoteExists = await github.remoteExists(request, h)
            if (!remoteExists) {
                console.log('creating github remote repo')
                await github.createRepo.handler(request, h)
            }
            if (!upstream) {
                console.log('adding remote repo')
                await git.remote.handler(request, h)
                console.log('setting upstream repo')
                await git.upstream.handler(request, h)
            } else {
            }
            console.log('pushing files to repo')

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
            await git.add.handler(request, h)
            await git.commit.handler(request, h)
            await git.push.handler(request, h)
            try {
                await npm.publish.handler(request, h)
            } catch {
                await npm.versionPatch.handler(request, h)
                await npm.publish.handler(request, h)
            }
            await npm.versionPatch.handler(request, h)
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
