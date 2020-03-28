console.log('webgl.js loaded')

const vsSource = document.getElementById('vsSource').innerText
const fsSource = document.getElementById('fsSource').innerText

const canvas = document.createElement('canvas')
canvas.width = 300
canvas.height = 300
document.body.append(canvas)

let gl = canvas.getContext('webgl')
if(!gl){
	gl = canvas.getContext('experimental-webgl')
}
if(!gl){
	alert('Webgl not supported. Please use an updated browser which supports webgl')
}

gl.viewport(0,0,canvas.width,canvas.height)
gl.clearColor(0,0,1,1)
gl.clear(gl.COLOR_BUFFER_BIT)

//program
const program = buildProgram()
gl.useProgram(program)

// locations
// attrib
const attribLocations = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);i++){
	const attribName = gl.getActiveAttrib(program,i).name
	attribLocations[attribName] = gl.getAttribLocation(program,attribName)
}
const uniformLocations = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){
	const uniformName = gl.getActiveUniform(program,i).name
	uniformLocations[uniformName] = gl.getUniformLocation(program,uniformName)
}

// data
const data = [
	0,0.5,
	-.5,0,
	0.5,0
]

// buffer
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)

// pointer
gl.vertexAttribPointer(
	attribLocations.a_Position,
	2,
	gl.FLOAT,
	0,
	0,
	0
)
gl.enableVertexAttribArray(attribLocations.a_Position)

//
render(data)

function clear(){
	gl.clear(gl.COLOR_BUFFER_BIT)
}

function render(data){
	gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)

	gl.drawArrays(gl.POINTS,0,data.length/2)
	// gl.drawArrays(gl.TRIANGLES,0,data.length/2)
}

function buildShader(type,source){
	const shader = gl.createShader(type)
	gl.shaderSource(shader,source)
	gl.compileShader(shader)

	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
		throw new Error('ERROR compiling shader type '+type+' Info: '+gl.getShaderInfoLog(shader))
	}
	return shader
}

function buildProgram(){
	const program = gl.createProgram()
	gl.attachShader(program,buildShader(gl.VERTEX_SHADER,vsSource))
	gl.attachShader(program,buildShader(gl.FRAGMENT_SHADER,fsSource))
	gl.linkProgram(program)
	gl.validateProgram(program)

	if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
		throw new Error('ERROR: linking program. Info: '+gl.getProgramInfoLog(program))
	}
	if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
		throw new Error('ERROR: validating program. Info: '+gl.getProgramInfoLog(program))
	}
	return program
}