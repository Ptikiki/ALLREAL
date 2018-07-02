// const MTLLoader = require('three-mtl-loader')
import { TweenLite } from 'gsap';

class Shader {

    constructor(options) {
      STORAGE.ShaderClass = this

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.fragment_loader.setResponseType('text')

      this.myShadersOnScene = []
      this.myShadersOnWall = []
      this.uniforms

      this.shadersTab = []

      this.init()
    }

    init() {
      this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

      this.loadShaders()
    }

    loadShaders() {
      this.loadShader('glsl/vertex.vert', 'glsl/fragment.frag')
    }

    loadShader(vertex_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertex_url, function (vertex_text) {
        that.fragment_loader.load(fragment_url, function (fragment_text) {
          that.initShader(vertex_text, fragment_text)
        })
      })
    }

    initShader(vertex, fragment) {

      this.uniforms = THREE.UniformsUtils.merge([
        THREE.ShaderLib.lambert.uniforms,
        { diffuse: { value: new THREE.Color(0xfdad5b) } },
        { u_time: { type: "f", value: 1.0 } },
        { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
        { u_mouse: { type: "v2", value: new THREE.Vector2() } },
        { u_soundLevel: { type: "f", value: 1.0 } }
      ]);

      let geometry = new THREE.BoxBufferGeometry( 500, 6, 14, 400, 20, 20 );

      let material1 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_amplitude:{ type: "f", value: 260. }, u_frequence:{ type: "f", value: 0.0055 } }, this.uniforms),
        vertexShader: vertex,
        fragmentShader: THREE.ShaderLib.lambert.fragmentShader,
        lights: true,
        fog: true,
        side: THREE.DoubleSide,
        shininess: 3
      } )

      let material2 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_amplitude:{ type: "f", value: 300. }, u_frequence:{ type: "f", value: 0.004 } }, this.uniforms),
        vertexShader: vertex,
        fragmentShader: THREE.ShaderLib.lambert.fragmentShader,
        side: THREE.DoubleSide,
        lights: true,
        fog: true,
        shininess: 3
      } )

      let material3 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_amplitude:{ type: "f", value: 210. }, u_frequence:{ type: "f", value: 0.008 } }, this.uniforms),
        vertexShader: vertex,
        fragmentShader: THREE.ShaderLib.lambert.fragmentShader,
        side: THREE.DoubleSide,
        lights: true,
        fog: true,
        shininess: 3
      } )

      let plane1 = new THREE.Mesh( geometry, material1 )
      let plane2 = new THREE.Mesh( geometry, material2 )
      let plane3 = new THREE.Mesh( geometry, material3 )

      plane1.position.z = 125
      plane2.position.z = 175
      plane3.position.z = 220

      let group = new THREE.Group()
      group.add( plane1 )
      group.add( plane2 )
      group.add( plane3 )

      group.position.y = specifications[0].shaderDownPosY
      group.name = 'shaders'

      this.shadersTab.push(group)
    }

    removeShaders() {
      STORAGE.scene.children.forEach((child, index) => {
        child.name === 'shaders' ? STORAGE.scene.remove(child) : ''
      })
      this.myShadersOnScene = []
      this.myShadersOnWall = []
    }

    removeShadersSkiped(length) {
      if (this.myShadersOnScene.length > 1) {
        let tableToErase = this.myShadersOnScene.slice(0, this.myShadersOnScene.length - 1)
        tableToErase.forEach((el)=> {
          STORAGE.scene.remove(el)
        })
      }
    }

    displayShader() {
      STORAGE.scene.add( this.shadersTab[0] )
      this.myShadersOnScene.push( this.shadersTab[0] )
    }

    animate() {
      if (STORAGE.ecranGeant && STORAGE.ecranGeant.children.length === 0 && this.shaderTV) {
       STORAGE.ecranGeant.add(this.shaderTV)
      }
    }
}

export default Shader