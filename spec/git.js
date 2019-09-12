const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')

let routes = {
    exists: {
        method: 'GET',
        path: '/git/exists',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let res = await exec('git rev-parse --is-inside-work-tree')
            let stdout = res.stdout
            return stdout
        }
    },
    init: {
        //description: Initialize a git repository,
        method: 'GET',
        path: '/git/init',
        handler: async (request, h) => {
            let res = await exec('git init')
            let stdout = res.stdout
            return stdout
        }
    },
    ignore: {
        //description: Initialize a .gitignore file,
        method: 'GET',
        path: '/git/ignore',
        handler: async (request, h) => {
            let res = await exec('echo "node_modules" >> .gitignore')
            let stdout = res.stdout
            return stdout
        }
    },
    add: {
        method: 'GET',
        path: '/git/add',
        //description: Add files to git repo,
        handler: async (request, h) => {
            let res = await exec('git add .')
            let stdout = res.stdout
            return stdout
        }
    },
    commit: {
        method: 'GET',
        path: '/git/commit',
        //description: Commit changes to a git repository,
        handler: async (request, h) => {
            let message = request.query.message || request.query.m
            let command = `git commit -m "${message}"`
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
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
    branch: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/branch',
        handler: async (request, h) => {
            let res = await exec('git push -u origin master')
            let stdout = res.stdout
            return stdout
        }
    },
    push: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/push',
        handler: async (request, h) => {
            let res = await exec('git push')
            let stdout = res.stdout
            console.log(res)
            return stdout
        }
    },
    create: {
        method: 'GET',
        path: '/github/create',
        handler: async (request, h) => {
            let endpoint = 'https://api.github.com/user/repos'
            let user = request.query.user || request.query.u
            let token = request.query.token || process.env.GITHUB_API_TOKEN
            let name = request.query.name || request.query.n
            let command = `curl -u "${user}:${token}" ${endpoint} -d '{ "name": "${name}" }'`
            console.log(command)
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    },
    delete: {
        method: 'GET',
        path: '/github/delete',
        handler: async (request, h) => {
            let user = request.query.user || request.query.u
            let token = request.query.token || process.env.GITHUB_API_TOKEN
            let name = request.query.name || request.query.n

            let endpoint = `https://api.github.com/repos/${user}/${name}`
            let command = `curl -X DELETE -u "${user}:${token}" ${endpoint}`
            console.log(command)
            let res = await exec(command)
            let stdout = res.stdout
            console.log(res)
            return stdout
        }
    }
}

module.exports = routes
