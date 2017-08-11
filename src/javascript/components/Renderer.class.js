import CSS3DRenderer from './CSS3DRenderer.class.js'

class Renderer {

    constructor(options) {
      this.container = document.getElementById( 'container' )
      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      
      //new CSS3DRenderer()
      //this.renderer = new THREE.CSS3DRenderer()
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.container.appendChild( this.renderer.domElement )
      STORAGE.renderer = this.renderer

      this.init()
    }

    init() {
      //this.renderer.autoResize = true
      //this.renderer.view.classList.add('webGLRenderer')
      document.body.appendChild(this.renderer.domElement)
    }
}

export default Renderer