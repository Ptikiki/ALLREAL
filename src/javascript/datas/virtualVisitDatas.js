const virtualVisitDatas = {
  datasRooms: [
    {
      backgroundUrl: 'assets/videos/video1.mp4',
      arrows : [{
        x: 5,
        y: 30,
        nextRoom: 2,
        color: 0xffffff
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
      x: 1100,
      y: 360,
      room: 1
    },
    {
      x: 700,
      y: 500,
      room: 2     
    },
    {
      x: 1000,
      y: 320,
      room: 3
    }
  ]
}

export default virtualVisitDatas
