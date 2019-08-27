function validateCommitMessage(commit_message){

	if ( commit_message.length > 0 ){
		return true
	} else {
		return false
	}

}

module.exports = validateCommitMessage
