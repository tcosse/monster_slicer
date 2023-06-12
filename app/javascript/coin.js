import * as Phaser from "phaser"

export class Coin extends Phaser.Physics.Arcade.Sprite{
  constructor(start, gameScene){
    super(gameScene, start.x, start.y, 'coin')
    this.gameScene = gameScene
    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
  }


  addPhysics(knight) {
    if(this != null) {
      this.play('coin_rotate');
    }
    this.depth=1;

    this.gameScene.physics.add.overlap(knight, this, (gameObject1, gameObject2) =>
    {
      console.log('piece prise');
      console.log(this)
      this.destroy()
      
      }
    );

  }


}
