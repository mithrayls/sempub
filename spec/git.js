const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const Songshu = require('songshu')
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const songshu = new Songshu(packageJson.name)

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
        },
        options: {
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'] // ADD THIS TAG}
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
    upstream: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/upstream',
        handler: async (request, h) => {
            let remote_name = request.query.remote
            let res = await exec(`git push -u ${remote_name} master`)
            let stdout = res.stdout
            return stdout
        }
    },
    remote: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/remote/add',
        handler: async (request, h) => {
            let remote_name = request.query.remote
            let url = request.query.url
            let res = await exec(`git remote add ${remote_name} ${url}`)
            let stdout = res.stdout
            return stdout
        }
    },
    push: {
        //description: Pushes to repository,
        method: 'GET',
        path: '/git/push/{remote?}',
        handler: async (request, h) => {
            let remote_name = request.params.remote ? request.params.remote : ''
            let res = await exec(`git push ${remote_name}`)
            let stdout = res.stdout
            console.log(res)
            return stdout
        }
    }
}

module.exports = routes
