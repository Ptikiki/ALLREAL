class Scene {

    constructor(options) {

      console.log("jlqkjleqj")

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

      this.geometry = new THREE.BoxGeometry( 1, 1, 1 )
      this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
      this.cube = new THREE.Mesh( this.geometry, this.material )

      this.init()
    }

    init() {

      this.scene.add(this.cube)
      this.camera.position.z = 5


    }
}

export default Scene
