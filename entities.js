console.log('entities.js loaded')


//###########
// ENTITY HELPER		(AREN'T These just components?)  => No dependents
//###########
function removeComponent(compName){
	compClean(this,compName)
	delete this[compName]
}
function addComponent(compName){
	compInit(this,compName)
	this[compName] = comps[compName].update
}
function updateComponent(){
	this.componentList.forEach(compName=>{
		this[compName]()
	
	})
}
function subToUserInputs(userInputs){
	this.inputs = userInputs
}
function unsubToUserInputs(){
	delete this.inputs
}
function getPos(){
	return [this.x,this.y]
}

//###########
// ENTITY
//###########
function createEntity(componentList=[],entityState){
	const state = {
		q:1,
		compVars:{},
		componentList,
		...entityState,

		// SHARED
		add:addComponent,
		remove:removeComponent,
		update:updateComponent,
		sub:subToUserInputs,
		unsub:unsubToUserInputs,
		getPos
	}

	// SETUP
	// add Component functions
	componentList.forEach(compName=>{
		compInit(state,compName)
		state[compName] = comps[compName].update
	})

	return state
}