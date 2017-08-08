//const PIXI = require('pixi.js')
const THREE = require("three-js")()

import Scene from './components/Scene.class.js'
import Renderer from './components/Renderer.class.js'
//import Loader from './components/Loader.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
  new Scene()
  new Renderer()
  // new Loader()
  // new Menu()
  // new Carousel({ number: 2 })

  render()
}

function render() {
  requestAnimationFrame(render)
  STORAGE.renderer.render(STORAGE.stage)
}
