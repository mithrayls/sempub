const configStore = require('config-store')
const argon2 = require('argon2')
const Configstore = require('configstore')
const packageJson = require('../package.json')

const config = new Configstore(packageJson.name)

async function hash(password) {
    const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 50,
        saltLength: 16
        //        salt: Buffer.from('1234567890abcdef') this can make the generation deterministic, you could use a deterministically random salt from another place, for example, and then only need to store one password/passphrase/key.
    })

    return hash
}

hash('password')
    .then(async res => {
        config.set('password', res)
        return config.get('password')
    })
    .then(async res => {
        return await argon2.verify(res, 'password')
    })
    .then(async res => {
        console.log(res)
    })
