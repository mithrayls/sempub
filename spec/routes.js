const Joi = require('@hapi/joi')
const exec = require('../lib/exec.js')
let routes = [
    {
        method: 'GET',
        path: '/git/exists',
        //description: Check if git repository exists,
        handler: async (request, h) => {
            let res = await exec('git rev-parse --is-inside-work-tree')
            let stdout = res.stdout
            return stdout
        }
    },
    {
        //description: Initialize a git repository,
        method: 'GET',
        path: '/git/init',
        handler: async (request, h) => {
            let res = await exec('git init')
            let stdout = res.stdout
            return stdout
        }
    },
    {
        //description: Initialize a .gitignore file,
        method: 'GET',
        path: '/git/ignore',
        handler: async (request, h) => {
            let res = await exec('echo "node_modules" >> .gitignore')
            let stdout = res.stdout
            return stdout
        }
    },
    {
        method: 'GET',
        path: '/git/add',
        //description: Add files to git repo,
        handler: async (request, h) => {
            let res = await exec('git add .')
            let stdout = res.stdout
            return stdout
        }
    },
    {
        method: 'GET',
        path: '/git/commit',
        //description: Commit changes to a git repository,
        handler: async (request, h) => {
            console.log(request.query.message)
            let command = `git commit -m "${request.query.message}"`
            console.log(command)
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
    }
    /*
    createGithubRepo: {
        name: createGithubRepo,
        //description: Remotely create a Github repository,
        func_name: exec,
        params_user: [
            {
                name: user,
                //description: Github username,
                type: string,
                default: null
            },
            {
                name: name,
                //description: The name of the github repo you wish to create,
                type: string,
                default: null
            },
            {
                name: token,
                //description: Github token for accessing API,
                type: string,
                default: null
            }
        ],
        params_internal: [
            {
                name: command,
                //description: Currently requires curl to work,
                type: string,
                default: curl -u '${user}:${token}' https://api.github.com/user/repos -d '{\name\:\${repo_name}\}'
            }
        ],
        tests: [
            {
                params_user: {
                    user: some_random_username,
                    repo: some_repo_name
                },
                condition: Should not fail
            }
        ]
    },
    gitPush: {
        name: gitPush,
        //description: Pushes to repository,
        func_name: exec,
        params_user: null,
        params_internal: [
            {
                name: command,
                //description: null,
                type: string,
                default: git push -u origin master
            }
        ],
        tests: [
            {
                parameters: {
                    command: ./spec/api.yml
                },
                condition: should not fail
            }
        ]
    }
    */
]

module.exports = routes
