import * as Phaser from "phaser"

export class Knight extends Phaser.GameObjects.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'knight_idle')
    this.start = start
    this.gameScene = gameScene
    gameScene.add.existing(this);
    this.setSize(50, 80)
    // this.setOffset(40,50)
  }
}
