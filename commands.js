'use strict'
let Joi = require('@hapi/joi')

let route = {
    method: 'GET',
    path: '/git/push/{name}',
    handler: async (request, h) => {
        let remote_name = request.params.name
        let res = remote_name
        return 'aoeu'
    },
    options: {
        validate: {
            params: {
                name: `Joi.string().min(5).required()`
            }
        },
        description: 'Pushes to repository'
    }
}

module.exports = route
