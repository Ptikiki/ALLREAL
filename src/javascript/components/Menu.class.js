import Room from './Room.class.js'
import virtualVisitDatas from '../datas/virtualVisitDatas.js'
import TweenLite from 'gsap'

class Menu {

    constructor(options) {
      STORAGE.MenuClass = this
      this.map = document.querySelector('#js-map')

      this.mapToggle = document.querySelector('#js-mapToggle')
      this.mapState = 0

      this.mapPointsArray = []
      this.mapPointsRatioLeft = []
      this.mapPointsRatioTop = []

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.putMapPoints()
    }

    createMapPoint(pointNumber) {
      this.a = document.createElement('a')
      this.map.appendChild(this.a)
      this.a.className = 'pointUrl'
      this.a.href = '#'
      let div = document.createElement('div')
      this.a.appendChild(div)
      div.className = 'mapPoint'
      div.style.left = virtualVisitDatas.datasMapPoints[pointNumber].x+'%'
      div.style.top = virtualVisitDatas.datasMapPoints[pointNumber].y+'%'
      div.style.backgroundColor = virtualVisitDatas.datasMapPoints[pointNumber].color
      let room = virtualVisitDatas.datasMapPoints[pointNumber].room
      div.id = ''+room+''

      this.mapPointsArray.push(this.a)

      this.ratioMapPointLeft = div.offsetLeft/window.innerWidth
      this.mapPointsRatioLeft.push(this.ratioMapPointLeft)
      this.ratioMapPointTop = div.offsetTop/window.innerHeight
      this.mapPointsRatioTop.push(this.ratioMapPointTop)

      //console.log("WINDOW WIDTH AT POINT CREATION", window.innerWidth)
    }

    putMapPoints() {
      let that = this
      for (let i = 0; i < virtualVisitDatas.datasMapPoints.length; i++) {
        that.createMapPoint(i)
      }
    }

    bind() {
      let that = this
      window.addEventListener( 'resize', that.onWindowResize, false )
      this.mapToggle.addEventListener( 'click', that.mapAnimations, false )
      for (let i = 0; i < this.mapPointsArray.length; i++) {
        that.mapPointsArray[i].addEventListener( 'mousedown', that.onMapPointMouseDown, false )
      }
    }

    unbind() {
      let that = this
      window.removeEventListener( 'resize', this.onWindowResize, false )
      this.mapToggle.removeEventListener( 'click', that.mapAnimations, false )
      for (let i = 0; i < this.mapPointsArray.length; i++) {
        that.mapPointsArray[i].removeEventListener( 'mousedown', that.onMapPointMouseDown, false )
      }    
    }

    onWindowResize() {
      let that = STORAGE.MenuClass
      if (that.mapState == 0) {
        TweenLite.to(that.map, 1, {
          x: window.innerWidth
        })
      }
      else {
        TweenLite.to(that.map, 1, {
          x: -window.innerWidth
        })
      }

      // this.mapPointsToResize = document.getElementsByClassName("mapPoint")
      // console.log(this.mapPointsToResize)

      for (let i = 0; i < that.mapPointsRatioLeft.length; i++) {
        this.newPointLeft = that.mapPointsRatioLeft[i]*window.innerWidth
        that.mapPointsArray[i].children[0].setAttribute("style", "left:"+this.newPointLeft+"px; top:"+virtualVisitDatas.datasMapPoints[i].y+"%; background-color:"+virtualVisitDatas.datasMapPoints[i].color+"")
      }
    }

    mapAnimations() {
      let that = STORAGE.MenuClass

      if (that.mapState == 0) {
        TweenLite.to(that.map, 1, {
          x: -window.innerWidth
        })
        that.mapState = 1
      }
      else {
        TweenLite.to(that.map, 1, {
          x: window.innerWidth
        })
        that.mapState = 0
      }
    }

    onMapPointMouseDown(event) {
      let that = STORAGE.MenuClass

      that.room = event.target.id
      console.log(event.target.id)

      that.mapAnimations()
      
      STORAGE.RoomClass.unbind()
      STORAGE.scene = null
      STORAGE.camera = null
      this.controls = null
      this.raycaster = null

      new Room({ number: that.room })
    }

    animate() {
      let that = STORAGE.MenuClass
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Menu
