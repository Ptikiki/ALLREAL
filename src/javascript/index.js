const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)

import Renderer from './components/Renderer.class.js'
import Scene from './components/Scene.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	// new CSS3DRenderer()
	new Scene()
	// new Loader()
	// new Carousel({ number: 2 })

 	render()
}

function render() {
	let that = STORAGE.SceneClass
  	requestAnimationFrame(render)
  	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
}
    