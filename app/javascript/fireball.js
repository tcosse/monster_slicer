import * as Phaser from "phaser"

export class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene, direction, controller) {
    const direction_initiale = "fireball_"+direction
    super(gameScene, start.x, start.y, direction_initiale)
    this.start = start
    gameScene.physics.add.world.enableBody(this, 0);
    this.depth = 2;
    this.setScale(0.5, 0.5)
    this.setOffset(15,10)
    this.depth = 2;
    this.gameScene = gameScene
    this.knight = controller.knight
    this.time = new Date() / 1000
    this.walls = controller.wallsLayer
    // c'est ça qui donne une vitesse et la bonne direction
    this.#throwTheFireball(direction)


    // la boule se détruit auto apres 2 secs. Il faut mettre d'autres conditions : toucher le MC ou un mur + ajouter une animation d'explosion
    // if boule overlap MC ou boule overlap mur ou temps = 1,5 s => BOUM
    gameScene.physics.add.overlap(this, controller.knight, (gameObject1, gameObject2) => {
      this.#explodeAndDestroy()
      this.#dealDamage()
    });

    gameScene.time.delayedCall(8000, () => {
      this.#explodeAndDestroy()
    });

    gameScene.add.existing(this);
  }

  #calculateDistance(objectA, objectB) {
    return Math.sqrt((objectA.x-objectB.x)**2 + (objectA.y-objectB.y)**2)
  }

  #explodeAndDestroy() {
    if(!this.exploding){
      this.exploding = true
      this.setVelocity(0,0)
      this.setOffset(80,72)
      this.play("fireball_explosion", true)
      // console.log(this.#calculateDistance(this, this.knight))
      if(this.#calculateDistance(this, this.knight) < 200) {
        this.gameScene.explosionSound.play()
      }
      this.gameScene.time.delayedCall(500, () => {this.destroy()})
    }
  }
  #throwTheFireball(direction) {
    // décide de la direction et la vitesse de la fireball
    switch(direction) {
      case "top":
        this.setVelocity(0,-20)
        this.play("fireball_top", true)
        break;
      case "top_right":
        this.setVelocity(15,-15)
        this.play("fireball_top_right", true)
        break;
      case "right":
        this.setVelocity(20,0)
        this.play("fireball_right", true)
        break;
      case "bottom_right":
        this.setVelocity(15,15)
        this.play("fireball_bottom_right", true)
        break;
      case "bottom":
        this.setVelocity(0,20)
        this.play("fireball_bottom", true)
        break;
      case "bottom_left":
        this.setVelocity(-15,15)
        this.play("fireball_bottom_left", true)
        break;
      case "left":
        this.setVelocity(-20,0)
        this.play("fireball_left", true)
        break;
      case "top_left":
        this.setVelocity(-15,-15)
        this.play("fireball_top_left", true)
        break;
      default:
    }
  }

  #dealDamage() {
    const invu = (new Date() / 1000) - this.time
    if (invu > 0.3) {
      this.knight.damage(10)
      this.time = new Date() / 1000
    }
  }
}
