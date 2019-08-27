const type = {
	type: 'list',
	name: 'type',
	message: 'Select version type.',
	choices: [ 'Patch', 'Minor', 'Major' ]
}

const message = {
	type: 'input',
	name: 'message',
	message: 'Please write a git commit message.',
	validate: function(text) {
		if ( text.length < 1 ) {
			return 'You must enter a commit message to use "git commit".'
		}
		return true
	}
}
const notes = {
	type: 'editor',
	name: 'notes',
	default: '',
	message: 'Please enter release notes(optional).'
}

const confirmation = {
	type: 'confirm',
	name: 'confirmation',
	message: 'Do you wish to confirm?'
}

module.exports = { type, message, notes, confirmation}
