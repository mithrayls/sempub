const git_commit_hint = `
Here are some tips for commit messages by Chris Beams.

* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

See the full post at [](https://chris.beams.io/posts/git-commit/)`

const release_notes_hint =`
These notes will be added to your README.md. You can enter **markdown**, including emoji shortcodes :grinning:.`

module.exports = { git_commit_hint, release_notes_hint }
