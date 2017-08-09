class Scene {

    constructor(options) {
      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 )
      STORAGE.camera = this.camera

      this.geometry, this.material, this.mesh
      this.target = new THREE.Vector3()
      this.lon = 90, this.lat = 0
      this.phi = 0, this.theta = 0
      this.touchX, this.touchY

      this.init()
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
      //document.addEventListener( 'touchstart', this.onDocumentTouchStart, false )
      //document.addEventListener( 'touchmove', this.onDocumentTouchMove, false )
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
      document.addEventListener('mousemove', that.onDocumentMouseMove, false)
      document.addEventListener('mouseup', that.onDocumentMouseUp, false)

      STORAGE.camera.lookAt( 10, 0, 10 )
      console.log(STORAGE.camera)
    }

    onDocumentMouseMove(event) {
      let that = STORAGE.SceneClass
      that.movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
      that.movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
      that.lon -= that.movementX * 0.1
      that.lat += that.movementY * 0.1
    }
      
    onDocumentMouseUp(event) {
      let that = STORAGE.SceneClass
      document.removeEventListener( 'mousemove', that.onDocumentMouseMove )
      document.removeEventListener( 'mouseup', that.onDocumentMouseUp )
    }

    onDocumentMouseWheel(event) {
      STORAGE.camera.fov += event.deltaY * 0.05
      STORAGE.camera.updateProjectionMatrix()
    }

    onDocumentTouchStart(event) {
      event.preventDefault()
      this.touch = event.touches[0]
      this.touchX = touch.screenX
      this.touchY = touch.screenY
    }

    onDocumentTouchMove(event) {
      console.log("TOUCHMOVE")
      event.preventDefault()
      this.touch = event.touches[ 0 ]
      this.lon -= (this.touch.screenX - this.touchX) * 0.1
      this.lat += (this.touch.screenY - this.touchY) * 0.1
      this.touchX = this.touch.screenX
      this.touchY = this.touch.screenY
    }

    animate() {
      this.requestAnimationFrame( animate )
      this.lon +=  0.1
      this.lat = Math.max( - 85, Math.min( 85, this.lat ) )
      this.phi = THREE.Math.degToRad( 90 - this.lat )
      this.theta = THREE.Math.degToRad( this.lon )
      this.target.x = Math.sin( this.phi ) * Math.cos( this.theta )
      this.target.y = Math.cos( this.phi )
      this.target.z = Math.sin( this.phi ) * Math.sin( this.theta )
      STORAGE.camera.lookAt( this.target )
      STORAGE.renderer.render( STORAGE.scene, STORAGE.camera )
    }
}

export default Scene
