console.log('controllers.js loaded')



function createInputHandler(){
	const keysDown = {
		keyw: false,
		keya: false,
		keys: false,
		keyd: false,
	}

	window.addEventListener('keydown',e=>{
		processEvent(e,true)
	})
	window.addEventListener('keyup',e=>{
		processEvent(e,false)
	})

	function processEvent(e,keyDown){
		const code = e.code.toLocaleLowerCase()
		if(keysDown[code] !== undefined){
			keysDown[code] = keyDown
		}
	}


	return keysDown
}