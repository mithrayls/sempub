const crypto = require('crypto')

function encrypt(key) {
    const algorithm = 'aes-256-xts'
    const password = 'Password used to generate keey'
    const iv = Buffer.alloc(16, 0) // Initialization vector.
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(
        'some clear text daaoeuuuuuuuuuuuuuuuuutaoteuhnoaehunteoahunoauh teanou hnteohu no tanoehuna hneoa a',
        'utf8',
        'hex'
    )
    encrypted += cipher.final('hex')
    console.log(encrypted)
}

const key = '897a4e252730a485cd27ecc409606dc1ab639664234ae5533518067d927d335ef'
encrypt(key)
