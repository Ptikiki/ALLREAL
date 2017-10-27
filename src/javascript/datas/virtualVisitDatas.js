const virtualVisitDatas = {
  datasRooms: [
    {
      backgroundUrl: 'assets/videos/video1.mp4',
      arrows : [{
        x: 5,
        y: 30,
        nextRoom: 2,
        color: 0x0000ff
      }
      ],
    },
    {
      backgroundUrl: 'assets/videos/video1.mp4',
      arrows : [{
        x: 10,
        y: 30,
        nextRoom: 1,
        color: 0x00ff00
      }, {
        x: 40,
        y: 200,
        nextRoom: 3,
        color: 0x00ff00
      }
      ],
    },
    {
      backgroundUrl: 'assets/videos/video1.mp4',
      arrows : [{
        x: 10,
        y: 30,
        nextRoom: 2,
        color: 0xff0000
      }, {
        x: 40,
        y: 200,
        nextRoom: 1,
        color: 0xff0000
      }
      ],
    }
  ],
  datasMapPoints: [
    {
      x: 50,
      y: 25,
      room: 1,
      color: '#0000ff'
    },
    {
      x: 55,
      y: 45,
      room: 2,
      color: '#00ff00'     
    },
    {
      x: 30,
      y: 48,
      room: 3,
      color: '#ff0000'
    }
  ]
}

export default virtualVisitDatas
