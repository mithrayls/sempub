const madge = require('madge')

function generateDependencyGraph(path){

	madge(path).then((res) => {
		console.log(res.obj())
	})

}
