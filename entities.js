console.log('entities.js loaded')

function createEntity(componentList,entityStat){

	const state = {
		x:0,
		y:0,
		speed:5,
		tick:[],
		// collisionCheck,
		// collisionResolve,
		controls:{
			delX:0,
			delY:0
		},
		...entityStat
	}

	// add components to tick + Initialise components
	componentList.forEach(component=>{
		// console.log('tick',state.tick	)
		state.tick.push(component())
	})
	console.log('tick',state.tick	)
	// define Update
	state.update=()=>{
		state.tick.forEach(compObj=>{
			// console.log(state)
			compObj.update(state)
		})
	}

	// define Sub
	state.sub=userInputs=>state.inputs = userInputs

	// get Position
	state.getPos=()=>[state.x,state.y]

	return state
}































