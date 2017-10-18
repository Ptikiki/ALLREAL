class Scene {

    constructor(options) {
      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
      STORAGE.camera = this.camera
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.createCube()
      //this.createBackground()
      this.createVideoBackground()
    }

    createCube() {
      this.geometry = new THREE.BoxGeometry( 1, 1, 1 )
      this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
      this.cube = new THREE.Mesh( this.geometry, this.material )
      STORAGE.scene.add( this.cube )
      STORAGE.camera.position.z = 5
    }

    createBackground() {
      let that = this
      this.geometry = new THREE.SphereGeometry( 500, 60, 40 )
      this.geometry.scale( - 1, 1, 1 )
      this.material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'assets/textures/test.jpg' )
      })
      this.mesh = new THREE.Mesh( this.geometry, this.material )
      STORAGE.scene.add( this.mesh )
      // this.loader = new THREE.TextureLoader()
      // this.loader.crossOrigin = true
      // this.loader.load(
      //   'http://localhost:8080/assets/textures/sun_temple_stripe.jpg',
      //   function ( texture ) {
      //     that.textures = that.getTexturesFromAtlasFile( texture, 6 )
      //     // that.materials = []
      //     // for ( let i = 0; i < 6; i ++ ) {
      //     //   that.materials.push( new THREE.MeshBasicMaterial( { map: that.textures[ i ] } ) )
      //     // }
      //     // that.skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1, 1, 1 ), that.materials )
      //     // that.skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, - 1 ) )
      //     // STORAGE.scene.add( that.skyBox )
      //   },
      //   function ( xhr ) {
      //     console.log( (xhr.loaded / xhr.total * 100) + '% chargé' )
      //   },
      //   function ( xhr ) {
      //     console.log( 'Marche pô' )
      //   }
      // )
    }

    getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
      let that = this
      this.textures = []
      for ( let i = 0; i < tilesNum; i ++ ) {
        this.textures[ i ] = new THREE.Texture()
      }
      this.imageObj = new Image()
      this.imageObj.src = atlasImgUrl
      this.imageObj.onload = function() {
        console.log("IMGOBJ", that.imageObj)
        that.canvas, that.context
        that.tileWidth = that.imageObj.height
        for ( let i = 0; i < that.textures.length; i ++ ) {
          console.log("I", i)
          that.canvas = document.createElement( 'canvas' )
          that.context = that.canvas.getContext( '2d' )
          that.canvas.height = that.tileWidth
          that.canvas.width = that.tileWidth
          that.context.drawImage( that.imageObj, that.tileWidth * i, 0, that.tileWidth, that.tileWidth, 0, 0, that.tileWidth, that.tileWidth )
          that.textures[ i ].image = that.canvas
          that.textures[ i ].needsUpdate = true
        }
        console.log("TEXTURES", that.textures)
      }
      console.log("TEXTURES", this.textures)
      return this.textures
    }

    createVideoBackground() {
      // THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
      //   console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
      // }

      let that = this
      this.geometry = new THREE.SphereGeometry( 500, 60, 40 )
      this.geometry.scale( - 1, 1, 1 )
      this.video = document.createElement( 'video' )
      this.video.width = 640
      this.video.height = 360
      this.video.autoplay = true
      this.video.loop = true
      this.video.src = "assets/videos/video1.mp4"
      this.texture = new THREE.VideoTexture( this.video )
      this.texture.minFilter = THREE.LinearFilter
      this.texture.format = THREE.RGBFormat
      this.material = new THREE.MeshBasicMaterial( { map : this.texture } )
      this.mesh = new THREE.Mesh( this.geometry, this.material )

      STORAGE.scene.add( this.mesh )
    }

    bind() {
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
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

    animate() {
      let that = STORAGE.SceneClass
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Scene
