const TerminalRenderer = require('cli-marked')
const marked = require('marked')

marked.setOptions({
	renderer: new TerminalRenderer({}),
	mangle: false,
	emoji: true,
	breaks: false,
	gfm: true,
	smartypants: false,
})

let markedCLI = marked

module.exports = markedCLI
