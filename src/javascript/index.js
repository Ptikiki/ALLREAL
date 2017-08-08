const PIXI = require('pixi.js')

import Renderer from './components/Renderer.class.js'
import Loader from './components/Loader.class.js'

window.STORAGE = {}

function initCanvas() {
  new Renderer()
  new Loader()
  // new Menu()
  // new Carousel({ number: 2 })

  render()
}

function render() {
  requestAnimationFrame(render)
  STORAGE.renderer.render(STORAGE.stage)
}
