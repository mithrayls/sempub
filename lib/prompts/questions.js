let add_release_notes = {
    type: 'confirm',
    name: 'add_release_notes',
    message: 'Automatically add release notes to your README.md?'
    //	choices: [ 'yes', 'no' ]
}

let push_to_git = {
    type: 'confirm',
    name: 'push_to_git',
    message: 'Automatically push to git?'
    //	choices: [ 'yes', 'no' ]
}

let require_confirmation = {
    type: 'confirm',
    name: 'require_confirmation',
    message: 'Prompt to confirm publication each time?'
    //	choices: [ 'yes', 'no' ]
}

let default_release_type = {
    type: 'list',
    name: 'default_release_type',
    message: 'Set a default release type?',
    choices: ['No Default', 'Patch', 'Minor', 'Major']
}

let repository_url = {
    type: 'input',
    name: 'repository_url',
    message: 'Please'
}
let github_username = {
    type: 'input',
    name: 'github_username',
    message: 'Github username',
    value: undefined
}
let github_token = {
    type: 'password',
    name: 'github_token',
    message:
        'Your token to access the github api. You can create one here: https://github.com/settings/tokens',
    value: undefined
}
let password = {
    type: 'password',
    name: 'password',
    message:
        'do you wish to protect your account credentials with a password? Enter your password for yes. Leave empty for no.',
    value: undefined
}

const questions = [
    push_to_git,
    require_confirmation,
    add_release_notes,
    default_release_type,
    github_username,
    github_token,
    password
]

module.exports = questions
