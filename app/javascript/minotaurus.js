import * as Phaser from "phaser"
import PhaserHealth from 'phaser_health';
import { Coin } from "coin";
import { Potion } from "potion";
import { Weapon } from "weapon";
var Health = PhaserHealth;
import { eventsCenter } from 'events_center'


export class Minotaurus extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'minotaurus_idle')
    this.start = start
    this.gameScene = gameScene
    this.isDead = false
    this.setHealth(60,0,60)
    this.time = new Date() / 1000
    this.weapon = null
    this.isHit = false


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
    this.setSize(32, 50)
    this.setOffset(30, 25)
    this.play('minotaurus_idle', true);
    console.log(this)
    // this.object = this.gameScene.physics.add.sprite(start.x, start.y,'enemy_skeleton_idle')
  }

  #calculateDistance(objectA, objectB) {
    return Math.sqrt((objectA.x-objectB.x)**2 + (objectA.y-objectB.y)**2)
  }

  moveMinotaurus(knight){
    var minotaurus_speed = 20;
    var distance_between = this.#calculateDistance(knight, this)
    // var skeleton_start_distance = Math.sqrt((skeleton_start[0]-this.object.x)**2 + (skeleton_start[1]-this.object.y)**2)
    var minotaurus_start_distance = this.#calculateDistance(this.start, this)

    if(this.scene != undefined && this.isDead == false) {
      if(this.body.newVelocity.x < 0){
        this.flipX = true
      }
      else {
        this.flipX = false
      }
      // if(this.anims.currentAnim.key == "skeleton_death_new") {
      if(this.isDead) {
        this.setVelocity(0,0)
      }
      else
      {
          // console.log("rotation:", this.body.rotation)
          // if(this.body.acceleration["x"])
          if(distance_between < 150 && distance_between > 20) {
            if(this.anims.currentAnim.key != "minotaurus_attack"){
              this.play('minotaurus_walk', true)
              this.setVelocity(minotaurus_speed*(knight.x-this.x)/distance_between, minotaurus_speed*(knight.y-this.y)/distance_between);
            }
            else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('minotaurus_walk', true)
            }
          }
          else if(distance_between <= 20){
            this.play('minotaurus_attack', true)
            if(this.body.newVelocity.x < 0){
              this.setVelocity(-0.001,0)
            }
            else {
              this.setVelocity(0.001,0)
            }
          }
          else if(this.x != this.start.x && this.y != this.start.y) {
            if(this.anims.currentAnim.key != "minotaurus_attack"){
              this.play('minotaurus_walk', true)
              this.setVelocity(minotaurus_speed*(this.start.x-this.x)/minotaurus_start_distance, minotaurus_speed*(this.start.y-this.y)/distance_between);
            }
            else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('minotaurus_walk', true)
            }
          }
          else if(this.speed == 0) {
            if(this.anims.currentAnim.key != "minotaurus_attack"){
              this.play("minotaurus_idle", true)
            }
            else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('minotaurus_idle', true)
            }
          }
          else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('minotaurus_idle', true)
          }



      }
      //managing attack frames
      if(this.weapon == null){
        if(this.anims.currentFrame.frame.name == 12) { //middle of attack
          this.weapon = new Weapon(this.start, this.gameScene)
          this.weapon.setSize(43,40).setOffset(-3, 0)
          this.weapon.setPosition(this.x, this.y)
          console.log(this.anims.currentFrame.frame.name)
          this.gameScene.physics.add.overlap(this.weapon, knight, (gameObject1, gameObject2) => {
            knight.damage(0.5)
            knight.setTint(0xff6666)
            // console.log("physics added ")
            this.gameScene.time.delayedCall(200, () => {knight.clearTint()});
          });
        }
      }
      if(this.weapon != null && this.anims.currentAnim.key == "minotaurus_attack"){
        if(this.anims.currentFrame.frame.name == 13) {
          this.weapon.destroy()
          console.log("physics removed", this.weapon);
          this.weapon = null
        }
      }

    }
  }
  addPhysics(knight) {

    this.depth=1;
    console.log('minotaurus x y :', this.x, this.y)

      this.gameScene.physics.add.overlap(knight.weapon, this, (gameObject1, gameObject2) => {

        if ((this.gameScene.input.keyboard.addKey("V").isDown || this.gameScene.input.manager.activePointer.primaryDown)) {

          if(knight.anims.currentFrame.frame.name == 36 ||knight.anims.currentFrame.frame.name == 42 || knight.anims.currentFrame.frame.name == 48){
            this.setTint(0xff6666) // applies red color to minotaurus when is attacked

            this.gameScene.time.delayedCall(20000, () => {this.isHit = false});
            if (this.getHealth() > 0) {
              // if the minotaurus has health left, then apply damage
              knight.once('animationcomplete', () => {
                console.log("15 de dmg")
                this.damage(15)
                this.clearTint()
              });
            }
            else {
              // if the minotaurus has no life left, then he is considered as dead
              if (!this.isDead) {
                // the minotaurus is beeing killed
                // prevents from running twice
                this.isDead = true;
                this.setVelocity(0,0)
                this.gameScene.deathSound.play()
                this.gameScene.time.delayedCall(5000, () => {this.destroy()});
                this.play("minotaurus_idle", true) // pas d'animation de mort malheureusement
                knight.skeleKilled += 1
                this.gameScene.kills += 1
                this.gameScene.score += 30
                eventsCenter.emit('update-skeleton-kills', this.gameScene.kills)
                eventsCenter.emit('update-score', this.gameScene.score)

                // destroy the dead skeleton's colliders
                this.gameScene.physics.world.colliders._active.forEach(collider => {
                  if(collider.object2 == gameObject2) {
                      collider.destroy()
                      if(this.weapon != null) {
                        this.weapon.destroy()
                      }
                  }
                })

                // spawn coins and potion
                  const x = this.x
                  const y = this.y + 10
                  if (Math.random() < 0.5) {
                    console.log('spawn coin')
                    // console.log(x, y)
                    let coin = new Coin({ x, y } , this.gameScene)
                    this.gameScene.time.delayedCall(12000, () => coin.destroy());
                    coin.addPhysics(knight)
                    // console.log(coin)
                  } else {
                    if(Math.random() < 0.5) {
                      let potion = new Potion({ x, y }, this.gameScene)
                      this.gameScene.time.delayedCall(12000, () => potion.destroy());
                      potion.addPhysics(knight)
                      potion.setScale(0.4, 0.4)
                    }

                  }
                }
              }
            }
          }
        })
      }
}
Health.MixinTo(Minotaurus);
