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
  ]
}

export default virtualVisitDatas
