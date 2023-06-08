import * as Phaser from "phaser"
import {HealthBar} from "./healthbar.js" //"/healthbar.js"
import PhaserHealth from 'phaser_health';
var Health = PhaserHealth;


export class Skeleton extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'enemy_skeleton_idle')
    this.start = start
    this.gameScene = gameScene
    this.isDead = false
    this.setHealth(30,0,30)
    // const healthBar = new HealthBar(
    //   gameScene,
    //   this.x - 20,
    //   this.y - 25,
    //   this.getMaxHealth(),
    //   6
    // );
    // healthBar.add(this);
    // this.healthBar = healthBar;

    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
    // this.object = this.gameScene.physics.add.sprite(start.x, start.y,'enemy_skeleton_idle')
  }

  #calculateDistance(objectA, objectB) {
    return Math.sqrt((objectA.x-objectB.x)**2 + (objectA.y-objectB.y)**2)
  }

  moveSkeleton(knight){
    var skeleton_speed = 30;
    var distance_between = this.#calculateDistance(knight, this)
    // var skeleton_start_distance = Math.sqrt((skeleton_start[0]-this.object.x)**2 + (skeleton_start[1]-this.object.y)**2)
    var skeleton_start_distance = this.#calculateDistance(this.start, this)

    if(this.scene != undefined) {
      if(this.anims.currentAnim.key == "skeleton_dead") {
        this.setVelocity(0,0)
      }
      else {

        if(distance_between < 100) {
          this.setVelocity(skeleton_speed*(knight.x-this.x)/distance_between, skeleton_speed*(knight.y-this.y)/distance_between);
        }
        else {
          if(this.x != this.start.x && this.y != this.start.y) {
            this.setVelocity(skeleton_speed*(this.start.x-this.x)/skeleton_start_distance, skeleton_speed*(this.start.y-this.y)/distance_between);
          }
        }
      }
    }
  }
  addPhysics(knight) {
    if(this != null) {
      this.play('skeleton_idle');
    }
    this.depth=1;
    // this.object.setScale(2,2)
    // console.log(knight.object)
    //this.gameScene.physics.add.existing(this.object)
    // console.log(this.gameScene.physics.add)
    // this.gameScene.enemy = this.gameScene.physics.add.image(enemy_start[0], enemy_start[1], 'enemy').setCollideWorldBounds(true);
    this.gameScene.physics.add.overlap(knight, this, (gameObject1, gameObject2) =>
    {
        knight.damage(0.1)
        if (this.gameScene.input.keyboard.addKey("V").isDown) {
          this.setTint(0xff6666)
          if (this.getHealth() > 0) {
            knight.on('animationcomplete', () => {
              this.damage(15)
              this.clearTint()

            });
          }
          else {
          this.play("skeleton_dead", true)
          this.setVelocity(0,0)
          this.on('animationcomplete',()=> {
            this.isDead = true
            this.gameScene.physics.world.colliders._active.forEach(collider => {
              if(collider.object2 == gameObject2) {
                 collider.destroy()
                  knight.skeleKilled += 1
                // console.log(gameObject1)
              }
            })
            // console.log(this.gameScene.physics.world.colliders._active)
            // console.log(gameObject2)
            this.gameScene.physics.world.colliders.active
          });
          }
        }
    });
  }
}
Health.MixinTo(Skeleton);
