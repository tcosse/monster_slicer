import * as Phaser from "phaser"
import { eventsCenter } from 'events_center'


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
      // console.log('piece prise');
      // console.log(this)
      if(this != undefined && this != null){
        this.gameScene.coinSound.play()
      }
      this.destroy()
      this.gameScene.coinCount += 1;
      this.gameScene.score += 3;
      eventsCenter.emit('update-coint-count', this.gameScene.coinCount)
      eventsCenter.emit('update-score', this.gameScene.score)
      }
    );

  }


}
