const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)

import Renderer from './components/Renderer.class.js'
import Scene from './components/Scene.class.js'
import Room from './components/Room.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new Room({ number: 1 })
	// new Loader()
}

function render() {
	let that = STORAGE.SceneClass
  	requestAnimationFrame(render)
  	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
}
    