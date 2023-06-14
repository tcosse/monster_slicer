import * as Phaser from "phaser"

export class Spell extends Phaser.Physics.Arcade.Sprite{
  constructor(start, gameScene){
    super(gameScene, start.x-3, start.y+5, 'spell')
    this.start = start
    this.gameScene = gameScene
    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
    this.play("spell", true)
  }
}
