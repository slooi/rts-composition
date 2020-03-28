console.log('components.js loaded')


const mover=()=>({
	update:state=>{
		state.x += state.controls.delX
		state.y += state.controls.delY
	}
})

// user
const controllable=()=>({
	update:state=>{
		state.controls.delY = 0
		state.controls.delX = 0
		if (state.inputs.keya) 
			state.controls.delX = -state.speed
		if (state.inputs.keyd) 
			state.controls.delX = state.speed
		if (state.inputs.keys) 
			state.controls.delY = -state.speed
		if (state.inputs.keyw) 
			state.controls.delY = state.speed
	}
})

// ai
const aiControlled=()=>{
	// Initalise
	const state2 = {
		dir:0
	}
	return {
		update: state=>{
			state2.dir += Math.random()
			state.controls.delX = Math.cos(state2.dir) * state.speed
			state.controls.delY = Math.sin(state2.dir) * state.speed
		},
		state2
	}
}

