console.log('main.js loaded')

// var entities = []

// entities.push(createEntity([mover]))

// entities[0].update()









let entities = []
let renderBuffer = []
let userInputs

init()
function init(){
	// input handler
	userInputs = createInputHandler()

	// entity user
	const entity = createEntity([controllable,mover],{x:10,y:100})
	entity.sub(userInputs)

	// entities
	entities.push(entity)

	// AI Controlled
	for(let i=0;i<10;i++){
		entities.push(createEntity([aiControlled,mover]))
	}

	tick()
}



function tick(){
	renderBuffer = []
	
	// Update
	entities.forEach(entity=>{
		entity.update()
		renderBuffer.push(...entity.getPos())	// Get vertices
	})

	clear()
	render(renderBuffer)

	requestAnimationFrame(tick)
}





























