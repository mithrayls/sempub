const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const fs = require('fs')

let routes = {
    githubCreate: {
        method: 'GET',
        path: '/github/create/repo',
        handler: async (request, h) => {
            const Songshu = require('songshu')
            const packageJson = JSON.parse(fs.readFileSync('./package.json'))
            const songshu = new Songshu(packageJson.name)
            let endpoint = 'https://api.github.com/user/repos'
            let user =
                (await request.query.user) ||
                (await request.query.u) ||
                (await songshu.getSet('GITHUB_USER_NAME'))
            let token =
                (await request.query.token) ||
                (await process.env.GITHUB_API_TOKEN) ||
                (await songshu.getSet('GITHUB_API_TOKEN'))
            let name = request.query.name || request.query.n
            let command = `curl -u "${user}:${token}" ${endpoint} -d '{ "name": "${name}" }'`
            console.log(command)
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    },
    githubDelete: {
        method: 'GET',
        path: '/github/delete/repo',
        handler: async (request, h) => {
            const Songshu = require('songshu')
            const packageJson = JSON.parse(fs.readFileSync('./package.json'))
            const songshu = new Songshu(packageJson.name)
            let user =
                (await request.query.user) ||
                (await request.query.u) ||
                (await songshu.getSet('GITHUB_USER_NAME'))
            let token =
                request.query.token ||
                process.env.GITHUB_API_TOKEN ||
                (await songshu.getSet('GITHUB_API_TOKEN'))
            let name = request.query.name || request.query.n

            let endpoint = `https://api.github.com/repos/${user}/${name}`
            let command = `curl -X DELETE -u "${user}:${token}" ${endpoint}`
            console.log(command)
            let res = await exec(command)
            let stdout = res.stdout
            console.log(res)
            return stdout
        }
    },
    githubRemoteExists: {
        method: 'GET',
        path: '/github/remote/exists',
        handler: async (request, h) => {
            const Songshu = require('songshu')
            const packageJson = JSON.parse(fs.readFileSync('./package.json'))
            const songshu = new Songshu(packageJson.name)
            let name = request.query.name || request.query.n
            let user =
                (await request.query.user) ||
                (await request.query.u) ||
                (await songshu.getSet('GITHUB_USER_NAME'))
            command = `curl https://api.github.com/repos/${user}/${name}`

            console.log(command)

            let res = await exec(command)
            let stdout = JSON.parse(res.stdout.trim())
            let message = stdout.message
            let upstream_exists = false
            if (message !== 'Not Found') {
                upstream_exists = true
            }
            console.log(upstream_exists)
            return upstream_exists
        },
        options: {
            description: 'Checks if an upstream repository is set'
        }
    }
}

module.exports = routes
