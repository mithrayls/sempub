const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')

let routes = {
    exists: {
        method: 'GET',
        path: '/git/exists',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let res = await exec('git rev-parse --is-inside-work-tree')
            return res
        }
    },
    init: {
        //description: Initialize a git repository,
        method: 'GET',
        path: '/git/init',
        handler: async (request, h) => {
            let res = await exec('git init')
            return res
        }
    },
    ignore: {
        //description: Initialize a .gitignore file,
        method: 'GET',
        path: '/git/ignore',
        handler: async (request, h) => {
            let res = await exec('echo "node_modules" >> .gitignore')
            return res
        }
    },
    add: {
        method: 'GET',
        path: '/git/add',
        handler: async (request, h) => {
            let res = await exec('git add .')
            return res
        },
        options: {
            description: 'Adds files to a git repository',
            tags: ['api']
        }
    },
    commit: {
        method: 'GET',
        path: '/git/commit',
        handler: async (request, h) => {
            let message = request.query.message || request.query.m
            let command = `git commit -m "${message}"`
            console.log(command)
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        },
        options: {
            description: 'Commit changes to a git repository',
            notes: 'Returns a todo item by the id passed in the path',
            /*
            validate: {
                query: {
                    remote: 'Joi.string().min(2)'
                }
            },
            */
            tags: ['api']
        }

        /*
        options: {
            validate: {
                query: {
                    message: Joi.string()
                        .min(1)
                        .required()
                }
            }
        }
     */
    },
    /*
     */
    setUpstream: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/set/upstream',
        handler: async (request, h) => {
            let remote_name = request.query.remote
            let command = `git push -u ${remote_name} master`
            console.log(command)
            let res = await exec(command)
            return res
        }
    },
    remote: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/remote/add',
        handler: async (request, h) => {
            let remote_name = request.query.remote
            let url = request.query.url
            let command = `git remote add ${remote_name} ${url}`
            console.log(command)
            let res = await exec(command)
            return res
        }
    },
    diff: {
        method: 'GET',
        path: '/git/diff',
        handler: async (request, h) => {
            let remote_name = request.query.remote
            let url = request.query.url
            let command = `git diff --cached`
            console.log(command)
            let res = await exec(command)
            console.log(res)
            return res
        }
    },
    push: {
        method: 'GET',
        path: '/git/push/{remote?}',
        handler: async (request, h) => {
            let remote_name = request.params.remote ? request.params.remote : ''
            let res = await exec(`git push ${remote_name}`)
            console.log(res)
            return res
        },
        options: {
            validate: {
                params: {
                    remote: 'Joi.string().min(2)'
                }
            },
            description: 'Pushes to repository'
        }
    },
    getUpstream: {
        method: 'GET',
        path: '/git/get/upstream',
        handler: async (request, h) => {
            let upstream = false
            let command = 'git rev-parse --abbrev-ref $branch@{upstream}'
            let res = await exec(command)
            let str = res.stdout.trim()
            let repo_exists = RegExp('^[A-Za-z0-9-]*/[A-Za-z0-9-]*$').test(str)
            if (repo_exists) {
                upstream = str.replace(
                    /^([A-Za-z0-9-]*)\/([A-Za-z0-9-]*)$/,
                    '$1'
                )
            }
            return upstream
        },
        options: {
            description: 'Pushes to repository'
        }
    }
}

module.exports = routes
