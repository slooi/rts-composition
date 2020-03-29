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
	const entity = createEntity(['controllable','mover'],{x:100,y:0,speed:5})
	entity.sub(userInputs)

	// // entities
	entities.push(entity)

	// console.log('1',entities[0])
	// entities[0].update()
	// console.log('2',entities[0])
	// entities[0].update()
	// entities[0].update()
	// AI Controlled
	for(let i=0;i<100000;i++){
		entities.push(createEntity(['aiControlled','mover'],{x:150,y:150,speed:1}))
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





























