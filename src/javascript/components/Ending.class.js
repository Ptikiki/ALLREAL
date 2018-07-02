import Shader from '../components/Shader.class.js'

class Ending {

    constructor(options) {
      STORAGE.EndingClass = this
      this.roomNumber = STORAGE.RoomClass.roomNumber
      this.init()
      this.bind()
    }

    init() {
      document.querySelector(".ending").style.display = "block"
      STORAGE.camera.enableRotate = false
      STORAGE.RoomClass.controls.noRotate = true
      this.audio = new Audio()
      this.audio.src = 'http://localhost:8080/assets/chanson.mp3'
      this.audio.controls = true
      this.audio.loop = true
      this.audio.autoplay = true

      this.canvas, this.ctx, this.source, this.context, this.analyser, this.fbc_array, this.bars, this.bar_x, this.bar_width, this.bar_height
    }

    bind() {
      let that = STORAGE.EndingClass
      window.addEventListener("load", this.initMp3Player(), false)

      // new Shader()

      // document.querySelector(".transparent").addEventListener('click', function() {
      //   this.gradient = that.ctx.createLinearGradient(0,0,170,0)
      //   this.gradient.addColorStop(0,'rgba(191,240,255,0.3)')
      //   this.gradient.addColorStop(1,'rgba(191,240,255,0.2)')
      //   that.ctx.fillStyle = this.gradient
      // })
      
      // document.querySelector(".bleu").addEventListener('click', function() {
      //   this.gradient=that.ctx.createLinearGradient(0,0,170,0)
      //   this.gradient.addColorStop(0,'rgba(94,155,255,0.3)')
      //   this.gradient.addColorStop(1,'rgba(94,155,255,0.2)')
      //   that.ctx.fillStyle = this.gradient
      // })
      
      // document.querySelector(".violet").addEventListener('click', function() {
      //   this.gradient=that.ctx.createLinearGradient(0,0,170,0)
      //   this.gradient.addColorStop(0,'rgba(173,150,255,0.3)')
      //   this.gradient.addColorStop(1,'rgba(173,150,255,0.2)') 
      //   that.ctx.fillStyle = this.gradient
      // })
      
      // document.querySelector(".vert").addEventListener('click', function() {
      //   this.gradient=that.ctx.createLinearGradient(0,0,170,0)
      //   this.gradient.addColorStop(0,'rgba(147,255,197,0.3)')
      //   this.gradient.addColorStop(1,'rgba(147,255,197,0.2)')
      //   that.ctx.fillStyle = this.gradient
      // })
      
      // document.querySelector(".orange").addEventListener('click', function() {
      //   this.gradient=that.ctx.createLinearGradient(0,0,170,0)
      //   this.gradient.addColorStop(0,'rgba(255,159,86,0.3)')
      //   this.gradient.addColorStop(1,'rgba(255,159,86,0.2)')
      //   that.ctx.fillStyle = this.gradient
      // })
      
      // document.querySelector(".rose").addEventListener('click', function() {
      //   this.gradient=that.ctx.createLinearGradient(0,0,170,0)
      //   this.gradient.addColorStop(0,'rgba(255,124,124,0.3)')
      //   this.gradient.addColorStop(1,'rgba(255,124,124,0.2)')
      //   that.ctx.fillStyle = this.gradient
      // })
    }

    initMp3Player() {
      document.getElementById('audio_box').appendChild(this.audio)
      this.context = new AudioContext()
      this.analyser = this.context.createAnalyser()
      this.canvas = document.getElementById('analyser_render')
      this.ctx = this.canvas.getContext('2d')
      this.source = this.context.createMediaElementSource(this.audio)
      this.source.connect(this.analyser)
      this.analyser.connect(this.context.destination)
      this.frameLooper()
    
      this.gradient = this.ctx.createLinearGradient(0,0,170,0)
      this.gradient.addColorStop(0,'rgba(191,240,255,0.3)')
      this.gradient.addColorStop(1,'rgba(191,240,255,0.2)')
      this.ctx.fillStyle = this.gradient
    }
    
    frameLooper() {
      let that = STORAGE.EndingClass
      window.requestAnimationFrame(that.frameLooper)

      that.fbc_array = new Uint8Array(that.analyser.frequencyBinCount)
      that.analyser.getByteFrequencyData(that.fbc_array)
      that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height)

      for (let i = 1; i < 4; i++) {
        that.bar_x = i * 8
        that.bar_width = 2
        that.bar_height = -(that.fbc_array[i] /2)
        that.ctx.fillRect(that.bar_x, that.canvas.height-20, that.bar_width, that.bar_height)
      }
      for (let i = 4; i < 8; i++) {
        that.bar_x = i * 20
        that.bar_width = 2.5
        that.bar_height = -(that.fbc_array[i] /2)
        that.ctx.fillRect(that.bar_x, that.canvas.height-7, that.bar_width, that.bar_height)
      }
      for (let i = 8; i < 11; i++) {
        that.bar_x = i * 32
        that.bar_width = 1.5
        that.bar_height = -(that.fbc_array[i] /2)
        that.ctx.fillRect(that.bar_x, that.canvas.height-30, that.bar_width, that.bar_height)
      } 
  }    

}

export default Ending
