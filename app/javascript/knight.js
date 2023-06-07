export class Knight {
  constructor(start, gameScene) {
    this.start = start
    this.gameScene = gameScene
    this.object = this.gameScene.physics.add.sprite(start.x, start.y, 'knight_idle').setSize(50, 80).setOffset(40,50)
  }
}
