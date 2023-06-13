import * as Phaser from "phaser"
import PhaserHealth from 'phaser_health';
var Health = PhaserHealth;


export class Snake extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'snake_head')
    this.start = start
    this.gameScene = gameScene
    this.isDead = false
    this.depth = 40
    this.setScale(1,1)
    // this.setHealth(150,0,150)

//     // const healthBar = new HealthBar(
//     //   gameScene,
//     //   this.x - 20,
//     //   this.y - 25,
//     //   this.getMaxHealth(),
//     //   6
//     // );
//     // healthBar.add(this);
//     // this.healthBar = healthBar;

    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
//     // this.setSize(16, 22)
//     // this.setOffset(25, 36)
    // this.play('snake_head', true);
//     console.log(this)
//     // this.object = this.gameScene.physics.add.sprite(start.x, start.y,'enemy_skeleton_idle')
  }
}
