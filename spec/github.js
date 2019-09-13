const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const Songshu = require('songshu')
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const songshu = new Songshu(packageJson.name)

let routes = {
    github_create: {
        method: 'GET',
        path: '/github/create',
        handler: async (request, h) => {
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
    github_delete: {
        method: 'GET',
        path: '/github/delete',
        handler: async (request, h) => {
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
    }
}

module.exports = routes
