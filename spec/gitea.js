const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
const Songshu = require('songshu')
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const songshu = new Songshu(packageJson.name)

let routes = {
    gitea_create: {
        method: 'GET',
        path: '/gitea/create',
        handler: async (request, h) => {
            let user = (await request.query.user) || (await request.query.u)
            let token =
                (await request.query.token) ||
                (await process.env.GITEA_API_TOKEN) ||
                (await songshu.getSet('GITEA_API_TOKEN'))
            let endpoint = `http://localhost:3000/api/v1/user/repos?access_token=${token}`
            let name = request.query.name || request.query.n
            let headers = [
                `-H "accept: application/json"`,
                `-H "Content-Type: application/json"`
                //                `-H "Authorization: token ${token}"`
            ]
            headers = headers.join(' ')
            let data = {
                /*
                auto_init: true,
                description: 'An apt description',
                gitignores: 'node_modules',
                issue_labels: 'string',
                license: 'MIT',
                private: true,
                readme: 'string'
                */
                name: name
            }
            data = JSON.stringify(data)
            let command = `curl -X POST '${endpoint}' ${headers} -d '${data}'`

            console.log(command)
            let res = await exec(command)
            let stdout = res.stdout
            return stdout
        }
    }
}

module.exports = routes
