const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')

let routes = {
    exists: {
        method: 'GET',
        path: '/npm/exists',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let command =
                'if [ -f "./package.json" ]; then echo "true"; else echo "false";fi'
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    },
    init: {
        method: 'GET',
        path: '/npm/init',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let command = 'npm init -y'
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    },
    publish: {
        method: 'GET',
        path: '/npm/publish',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let command = 'npm publish --access public'
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    },
    whoami: {
        method: 'GET',
        path: '/npm/whoami',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let command = 'npm whoami'
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    }
}

module.exports = routes
