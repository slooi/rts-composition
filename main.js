console.log('main.js loaded')

// var entities = []

// entities.push(createEntity([mover]))

// entities[0].update()









let entities = []
let userInputs

init()
function init(){
	// input handler
	userInputs = createInputHandler()

	// entity user
	const entity = createEntity(['controllable','mover'],{x:100,y:0,speed:1})
	entity.sub(userInputs)

	// // entities
	entities.push(entity)

	// console.log('1',entities[0])
	// entities[0].update()
	// console.log('2',entities[0])
	// entities[0].update()
	// entities[0].update()
	// AI Controlled
	for(let i=0;i<1000;i++){
		entities.push(createEntity(['aiControlled','mover'],{x:250,y:250,speed:.5}))
	}

	tick()
}



function tick(){
	const renderBuffer = []
	
	// Update
	// entities.forEach(entity=>{
	// 	entity.update()
	// 	entity.upload(renderBuffer)
	// 	// renderBuffer.push(...entity.getPos())	// Get vertices
	// 	// if(entity.x===1){
			
	// 	// }
	// 	// renderBuffer.push(1)
	// 	// renderBuffer.push(1)
	// })
	entities.forEach(entity=>{
		entity.update()
		renderBuffer.push(...entity.getPos())	// Get vertices
		// if(entity.x===1){
			
		// }
		// renderBuffer.push(1)
		// renderBuffer.push(1)
	})
	// for(let i=0;i<entities.length;i++){
	// 	entities[i].update()
	// 	renderBuffer[i*2] = entities[i].x
	// 	renderBuffer[i*2+1] = entities[i].y
	// }

	clear()
	render(renderBuffer)

	requestAnimationFrame(tick)
}





























