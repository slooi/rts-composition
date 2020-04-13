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
	// return [this.x,this.y]
	// return [this.x,this.y-20,this.x-10,this.y+10,this.x+10,this.y+10]
	return [
		this.x-10,this.y-10,this.x-10,this.y+10,this.x+10,this.y+10,
		this.x-10,this.y-10,this.x+10,this.y-10,this.x+10,this.y+10
	]
}
// function upload(renderBuffer){
// 	renderBuffer.push(...[
// 		this.x-10,this.y-10,this.x-10,this.y+10,this.x+10,this.y+10,
// 		this.x-10,this.y-10,this.x+10,this.y-10,this.x+10,this.y+10
// 	])
// }

//###########
// ENTITY
//###########
function createEntity(componentList=[],entityState){
	const state = {
		compVars:{},
		componentList,
		...entityState,

		// SHARED
		add:addComponent,
		remove:removeComponent,
		update:updateComponent,
		sub:subToUserInputs,
		unsub:unsubToUserInputs,
		getPos,
		// upload
	}

	// SETUP
	// add Component functions
	componentList.forEach(compName=>{
		compInit(state,compName)
		state[compName] = comps[compName].update
	})

	return state
}