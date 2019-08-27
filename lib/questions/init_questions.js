let add_release_notes = {
	type: 'list',
	name: 'add_release_notes',
	message: 'Automatically add release notes to your README.md?',
	choices: [ 'yes', 'no' ]
} 

let push_to_git = {
	type: 'list',
	name: 'push_to_git',
	message: 'Automatically push to git?',
	choices: [ 'yes', 'no' ]
}

let require_confirmation = {
	type: "list",
	name: 'require_confirmation',
	message: 'Prompt to confirm publication each time?',
	choices: [ 'yes', 'no' ]
}

let default_release_type = {
	type: "list",
	name: 'default_release_type',
	message: 'Set a default release type?',
	choices: [ 'No Default', 'Patch', 'Minor', 'Major']
}


const init_questions = {
	push_to_git,
	require_confirmation,
	add_release_notes,
	default_release_type,
}

module.exports = init_questions
