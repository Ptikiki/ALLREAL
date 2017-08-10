class Scene {

    constructor(options) {
      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 )
      STORAGE.camera = this.camera

      this.geometry, this.material, this.mesh
      this.lon = 0, this.lat = 0
      this.phi = 0, this.theta = 0

      this.onPointerDownPointerX
      this.onPointerDownPointerY
      this.onPointerDownLon
      this.onPointerDownLat
      this.isUserInteracting = false
      this.onMouseDownMouseX = 0
      this.onMouseDownMouseY = 0
      this.onMouseDownLon = 0
      this.onMouseDownLat = 0
      this.fov = 70 // Field of View

      this.init()
      this.animate()
      this.bind()
    }

    init() {

      this.sides = [
        {
          url: 'assets/textures/texture1.jpg',
          position: [ -512, 0, 0 ],
          rotation: [ 0, Math.PI / 2, 0 ]
        },
        {
          url: 'assets/textures/texture2.jpg',
          position: [ 512, 0, 0 ],
          rotation: [ 0, -Math.PI / 2, 0 ]
        },
        {
          url: 'assets/textures/texture3.jpg',
          position: [ 0,  512, 0 ],
          rotation: [ Math.PI / 2, 0, Math.PI ]
        },
        {
          url: 'assets/textures/texture4.jpg',
          position: [ 0, -512, 0 ],
          rotation: [ - Math.PI / 2, 0, Math.PI ]
        },
        {
          url: 'assets/textures/texture5.jpg',
          position: [ 0, 0,  512 ],
          rotation: [ 0, Math.PI, 0 ]
        },
        {
          url: 'assets/textures/texture6.jpg',
          position: [ 0, 0, -512 ],
          rotation: [ 0, 0, 0 ]
        }
      ]

      for ( var i = 0; i < this.sides.length; i ++ ) {
        this.side = this.sides[i]
        this.element = document.createElement('img')
        this.element.width = 1026 // 2 pixels extra to close the gap.
        this.element.src = this.side.url
        this.object = new THREE.CSS3DObject(this.element)
        this.object.position.fromArray(this.side.position)
        this.object.rotation.fromArray(this.side.rotation)
        this.scene.add(this.object)
      }
    }

    bind() {
      document.addEventListener( 'mousedown', this.onDocumentMouseDown, false )
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onDocumentMouseDown(event) {
      let that = STORAGE.SceneClass
      event.preventDefault()
      that.onPointerDownPointerX = event.clientX
      that.onPointerDownPointerY = event.clientY
      that.onPointerDownLon = that.lon
      that.onPointerDownLat = that.lat
      that.isUserInteracting = true
      document.addEventListener('mousemove', that.onDocumentMouseMove, false)
      document.addEventListener('mouseup', that.onDocumentMouseUp, false)

      console.log(STORAGE.camera)
    }

    onDocumentMouseMove(event) {
      let that = STORAGE.SceneClass
      that.lon = (event.clientX - that.onPointerDownPointerX) * -0.175 + that.onPointerDownLon
      that.lat = (event.clientY - that.onPointerDownPointerY) * -0.175 + that.onPointerDownLat
    }
      
    onDocumentMouseUp(event) {
      let that = STORAGE.SceneClass
      that.isUserInteracting = false
      document.removeEventListener( 'mousemove', that.onDocumentMouseMove )
      document.removeEventListener( 'mouseup', that.onDocumentMouseUp )
    }

    onDocumentMouseWheel(event) {
      STORAGE.camera.fov += event.deltaY * 0.05
      STORAGE.camera.updateProjectionMatrix()
    }

    animate() {
      let that = STORAGE.SceneClass
      requestAnimationFrame( that.animate )
      that.render()
    }

    render() {
      if (this.isUserInteracting === false) {
        this.lon += .05
      }

      console.log("LOG")
      this.lat = Math.max(-85, Math.min(85, this.lat))
      this.phi = THREE.Math.degToRad(90 - this.lat)
      this.theta = THREE.Math.degToRad(this.lon)
      STORAGE.camera.position.x = 100 * Math.sin(this.phi) * Math.cos(this.theta)
      STORAGE.camera.position.y = 100 * Math.cos(this.phi)
      STORAGE.camera.position.z = 100 * Math.sin(this.phi) * Math.sin(this.theta)
    
      STORAGE.camera.lookAt(STORAGE.scene.position)
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
    }
}

export default Scene
