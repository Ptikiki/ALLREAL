import virtualVisitDatas from '../datas/virtualVisitDatas.js'
import Ending from '../components/Ending.class.js'
import TweenLite from 'gsap'


class Room {

    constructor(options) {
      STORAGE.RoomClass = this
      this.roomNumber = options.number-1
      STORAGE.TWEEN = options.tween
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
      STORAGE.camera = this.camera
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      STORAGE.page = document.querySelector('html')
      STORAGE.body = document.querySelector('body')

      console.log("ROOM NUMBER :", this.roomNumber+1)

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.createVideoBackground()
      this.putArrows()
      this.roomNumber === virtualVisitDatas.datasRooms.length - 1 ? this.visitEnding() : ''
    }

    createVideoBackground() {
      let that = this
      this.geometry = new THREE.SphereGeometry( 500, 60, 40 )
      this.geometry.scale( - 1, 1, 1 )
      this.video = document.createElement( 'video' )
      this.video.width = 640
      this.video.height = 360
      this.video.autoplay = true
      this.video.loop = true
      this.video.src = virtualVisitDatas.datasRooms[this.roomNumber].backgroundUrl
      this.texture = new THREE.VideoTexture( this.video )
      this.texture.minFilter = THREE.LinearFilter
      this.texture.format = THREE.RGBFormat
      this.material = new THREE.MeshBasicMaterial( { map : this.texture } )
      this.mesh = new THREE.Mesh( this.geometry, this.material )
      this.mesh.name = "background"
      STORAGE.scene.add( this.mesh )
    }

    putArrows() {
      let that = this
      for (let i = 0; i < virtualVisitDatas.datasRooms[this.roomNumber].arrows.length; i++) {
        that.createArrow(i)
      }
    }

    createArrow(arrowNumber) {
      this.arrowNumber = arrowNumber
      this.geometry = new THREE.BoxGeometry( 1, 1, 1 )
      this.color = virtualVisitDatas.datasRooms[this.roomNumber].arrows[this.arrowNumber].color
      this.material = new THREE.MeshBasicMaterial( { color: this.color } )
      this.arrow = new THREE.Mesh( this.geometry, this.material )
      STORAGE.scene.add( this.arrow )
      STORAGE.camera.position.z = 5

      this.arrow.position.x = virtualVisitDatas.datasRooms[this.roomNumber].arrows[this.arrowNumber].x

      this.arrow.name = "arrow"
      this.arrow.nextRoom = virtualVisitDatas.datasRooms[this.roomNumber].arrows[this.arrowNumber].nextRoom

    }

    bind() {
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
      document.addEventListener( 'mousedown', this.onArrowMouseDown, false )
    }

    unbind() {
      document.removeEventListener( 'wheel', this.onDocumentMouseWheel, false )
      window.removeEventListener( 'resize', this.onWindowResize, false )
      document.removeEventListener( 'mousedown', this.onArrowMouseDown, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onDocumentMouseWheel(event) {
      STORAGE.camera.fov += event.deltaY * 0.05
      STORAGE.camera.updateProjectionMatrix()
    }

    onArrowMouseDown(event) {
      let that = STORAGE.RoomClass
      
      that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
      that.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
      that.raycaster.setFromCamera( that.mouse, STORAGE.camera )
      that.intersects = that.raycaster.intersectObjects( STORAGE.scene.children )
      
      // INTERACTION AU CLICK SUR UNE FLECHE ==> CHANGEMENT DE ROOM (DESTRUCTION ET CREATION)
      for ( let i = 0; i < that.intersects.length; i++ ) {
        if (that.intersects[i].object.name == "arrow") {
          console.log(that.intersects[i].object)
          STORAGE.RoomClass.unbind()
          STORAGE.scene = null
          STORAGE.camera = null
          that.controls = null
          that.raycaster = null
          //that.page.style.opacity = "0"
          //that.body.style.opacity = "0"
          new Room({ number: that.intersects[i].object.nextRoom })
        }
      }
    }

    visitEnding() { 
      console.log("visitEnding")
      new Ending()
    }

    animate() {
      let that = STORAGE.RoomClass
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Room
