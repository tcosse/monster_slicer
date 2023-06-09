import * as Phaser from "phaser"

export class Weapon extends Phaser.Physics.Arcade.Image{
  constructor(start, gameScene){
    super(gameScene, start.x, start.y, 'empty')
    this.start = start
    this.gameScene = gameScene
    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
    this.setSize(30,20)
    this.setOffset(20,15)
  }
}
