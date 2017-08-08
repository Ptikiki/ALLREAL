class Renderer {

    constructor(options) {
      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      //this.stage = new PIXI.Container()

      STORAGE.renderer = this.renderer
      //STORAGE.stage = this.stage

      this.init()
    }

    init() {
      this.renderer.backgroundColor = 0x000000
      this.renderer.autoResize = true
      //this.renderer.view.classList.add('webGLRenderer')
      document.body.appendChild(this.renderer.domElement)
    }
}

export default Renderer
