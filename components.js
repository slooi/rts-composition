console.log('loaded components.js')

//################
// COMPONENT HELPERS
//################

// Note:
// compInit - NOT using this
// compClean - NOT using this


const compInit = (state,compName) => {
	Object.keys(comps[compName].dependents).forEach(compVar=>{
		if (state[compVar] === undefined){
			// If Dependent variable doesn't exist in entity
			if(comps[compName].except === undefined || comps[compName].except[compVar] === undefined){
				// SHOULD'VE ALREADY BEEN SET
				alert('ERROR: Forgot to assign DEPENDENT variable value to entity. Unset variable: '+compVar)
			}else{
				// will pre set values
				state[compVar] = comps[compName].dependents[compVar]
			}
		}
		if(state.compVars[compVar] === undefined){
			// If counter for variable not setup...
			state.compVars[compVar] = 0
		}
		state.compVars[compVar]++
	})
}

const compClean = (state,compName) => {
	Object.keys(comps[compName].dependents).forEach(compVar=>{
		state.compVars[compVar]--
		if(state.compVars[compVar]===0){
			// delete compVars (counter) & actual variable
			delete state.compVars[compVar]
			delete state[compVar]
		}
	})
}




//################
// COMPONENTS
//################

const comps = {
	mover:{
		dependents:{
			x:0,
			y:0,
			delX:0,
			delY:0,
		},
		except:{
			// can preset
			delX:0,
			delY:0
		},
		update:function(){
			this.x += this.delX
			this.y += this.delY
		}
	},

	controllable:{
		dependents:{
			delX:0,
			delY:0,
			speed:10,
		},
		except:{
			delX:0,
			delY:0
		},
		update:function(){
			this.delX=0
			this.delY=0
			if(this.inputs.keya)
				this.delX -= this.speed
			if(this.inputs.keyd)
				this.delX = this.speed
			if(this.inputs.keyw)
				this.delY -= this.speed
			if(this.inputs.keys)
				this.delY = this.speed
		}
	},

	aiControlled:{
		dependents:{
			delX:0,
			delY:0,
			dir:0,
			speed:0
		},
		except:{
			delX:0,
			delY:0,
			dir:0,
		},
		update:function(){
			this.dir += Math.random()-0.5
			this.delX = Math.cos(this.dir)*this.speed
			this.delY = Math.sin(this.dir)*this.speed
		}
	}
	

}