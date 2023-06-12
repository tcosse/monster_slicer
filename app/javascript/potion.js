import * as Phaser from "phaser"

export class Potion extends Phaser.Physics.Arcade.Sprite{
  constructor(start, gameScene){
    super(gameScene, start.x, start.y, 'potion')
    this.gameScene = gameScene
    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
  }


  addPhysics(knight) {
    // if(this != null) {
    //   this.play('coin_rotate');
    // }
    this.depth=1;

    this.gameScene.physics.add.overlap(knight, this, (gameObject1, gameObject2) =>
    {
      if ( knight.getHealth() != 50 ) {
        console.log('potion prise');
        console.log(this)
        if(this != null && this != undefined){
          this.gameScene.healSound.play()
        }
        this.destroy()
        knight.heal(10)
      }
      }
    );

  }


}
