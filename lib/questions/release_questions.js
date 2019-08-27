const type = {
	type: 'list',
	name: 'type',
	message: 'Select version type.',
	choices: [ 'Patch', 'Minor', 'Major' ]
}

const message = {
	type: 'input',
	name: 'message',
	message: 'Please write a git commit message.'
}
const notes = {
	type: 'editor',
	name: 'notes',
	message: 'Please enter release notes(optional).'
}

const confirmation = {
	type: 'confirm',
	name: 'confirmation',
	message: 'Do you wish to confirm?'
}

module.exports = { type, message, notes, confirmation}
