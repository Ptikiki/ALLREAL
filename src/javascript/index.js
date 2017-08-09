const THREE = require("three-js")()

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

	that.lon +=  0.1
	that.lat = Math.max( - 85, Math.min( 85, that.lat ) )
    that.phi = THREE.Math.degToRad( 90 - that.lat )
    that.theta = THREE.Math.degToRad( that.lon )
    that.target.x = Math.sin( that.phi ) * Math.cos( that.theta )
    that.target.y = Math.cos( that.phi )
    that.target.z = Math.sin( that.phi ) * Math.sin( that.theta )
    
    //STORAGE.camera.lookAt( 10, 10, 10 )

  	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
}
