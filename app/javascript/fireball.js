import * as Phaser from "phaser"

export class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene, direction) {
    const direction_initiale = "fireball_"+direction
    super(gameScene, start.x, start.y, direction_initiale)
    this.start = start
    gameScene.physics.add.world.enableBody(this, 0);
    this.depth = 2;
    //this.setSize(15, 20)
    //this.setOffset(17,22)
    this.depth = 2;
    switch(direction) {
      case "top":
        this.setVelocity(0,-100)
        this.play("fireball_top", true)
        break;
      case "top_right":
        this.setVelocity(75,-75)
        this.play("fireball_top_right", true)
        break;
      case "right":
        this.setVelocity(100,0)
        this.play("fireball_right", true)
        break;
      case "bottom_right":
        this.setVelocity(75,75)
        this.play("fireball_bottom_right", true)
        break;
      case "bottom":
        this.setVelocity(0,100)
        this.play("fireball_bottom", true)
        break;
      case "bottom_left":
        this.setVelocity(-75,75)
        this.play("fireball_bottom_left", true)
        break;
      case "left":
        this.setVelocity(-100,0)
        this.play("fireball_left", true)
        break;
      case "top_left":
        this.setVelocity(-75,-75)
        this.play("fireball_top_left", true)
        break;
      default:
    }
    // la boule se détruit auto apres 2 secs. Il faut mettre d'autres conditions : toucher le MC ou un mur + ajouter une animation d'explosion
    gameScene.time.delayedCall(2000, () => {this.destroy()});

    gameScene.add.existing(this);
  }
}
