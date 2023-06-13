import * as Phaser from "phaser"
import PhaserHealth from 'phaser_health';
import { Coin } from "coin";
import { Potion } from "potion";
import { Weapon } from "weapon";
var Health = PhaserHealth;
import { eventsCenter } from 'events_center'


export class Skeleton extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'skeleton_idle_new')
    this.start = start
    this.gameScene = gameScene
    this.isDead = false
    this.setHealth(30,0,30)
    this.time = new Date() / 1000
    this.weapon = null

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
    this.setSize(16, 22)
    this.setOffset(25, 36)
    this.play('skeleton_idle_new', true);
    console.log(this)
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

    if(this.scene != undefined && this.isDead == false) {
      if(this.body.newVelocity.x < 0){
        this.flipX = true
      }
      else {
        this.flipX = false
      }
      if(this.anims.currentAnim.key == "skeleton_death_new") {
        this.setVelocity(0,0)
      }
      else
      {
          // console.log("rotation:", this.body.rotation)
          // if(this.body.acceleration["x"])
          if(distance_between < 100 && distance_between > 10) {
            if(this.anims.currentAnim.key != "skeleton_attack_new"){
              this.play('skeleton_walk_new', true)
              this.setVelocity(skeleton_speed*(knight.x-this.x)/distance_between, skeleton_speed*(knight.y-this.y)/distance_between);
            }
            else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('skeleton_walk_new', true)
            }
          }
          else if(distance_between <= 10){
            this.setVelocity(0,0)
            this.play('skeleton_attack_new', true)
          }
          else if(this.x != this.start.x && this.y != this.start.y) {
            if(this.anims.currentAnim.key != "skeleton_attack_new"){
              this.play('skeleton_walk_new', true)
              this.setVelocity(skeleton_speed*(this.start.x-this.x)/skeleton_start_distance, skeleton_speed*(this.start.y-this.y)/distance_between);
            }
            else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('skeleton_walk_new', true)
            }
          }
          else if(this.speed == 0) {
            if(this.anims.currentAnim.key != "skeleton_attack_new"){
              this.play("skeleton_idle_new", true)
            }
            else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('skeleton_idle_new', true)
            }
          }
          else if(this.anims.nextAnimsQueue.length == 0){
              this.chain('skeleton_idle_new', true)
          }



      }
      //managing attack frames
      if(this.weapon == null){
        if(this.anims.currentFrame.frame.name == 15) { //middle of attack
          this.weapon = new Weapon(this.start, this.gameScene)
          this.weapon.setSize(17,23).setOffset(10, 11)
          this.weapon.setPosition(this.x, this.y)
          console.log(this.anims.currentFrame.frame.name)
          this.gameScene.physics.add.overlap(this.weapon, knight, (gameObject1, gameObject2) => {
            knight.damage(0.5)
            knight.setTint(0xff6666)
            console.log("physics added ")
            this.gameScene.time.delayedCall(200, () => {knight.clearTint()});
          });
        }
      }
      if(this.weapon != null && this.anims.currentAnim.key == "skeleton_attack_new"){
        if(this.anims.currentFrame.frame.name == 16) {
          this.weapon.destroy()
          console.log("physics removed", this.weapon);
          this.weapon = null
        }
      }

    }
  }
  addPhysics(knight) {

    this.depth=1;
    console.log('skeleton x y :', this.x, this.y)
    // this.object.setScale(2,2)
    // console.log(knight.object)
    //this.gameScene.physics.add.existing(this.object)
    // console.log(this.gameScene.physics.add)
    // this.gameScene.enemy = this.gameScene.physics.add.image(enemy_start[0], enemy_start[1], 'enemy').setCollideWorldBounds(true);
    this.gameScene.physics.add.overlap(knight.weapon, this, (gameObject1, gameObject2) => {
      if (this.gameScene.input.keyboard.addKey("V").isDown || this.gameScene.input.manager.activePointer.primaryDown ) {
        this.setTint(0xff6666) // applies red color to skeleton when is attacked
        if (this.getHealth() > 0) {
          // if the skeleton has health left, then apply damage
          knight.on('animationcomplete', () => {
            this.damage(15)
            this.clearTint()
          });
        }
        else {
          // if the skeleton has no life left, then he is considered as dead
          if (!this.isDead) {
            // the skeleton is beeing killed
            // prevents from running twice
            this.isDead = true;
            this.setVelocity(0,0)
            this.gameScene.deathSound.play()
            this.gameScene.time.delayedCall(10000, () => {this.destroy()});
            this.play("skeleton_death_new", true)
            knight.skeleKilled += 1
            this.gameScene.score += 10
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
              if (Math.random() < 0.70) {
                console.log('spawn coin')
                // console.log(x, y)
                let coin = new Coin({ x, y } , this.gameScene)
                coin.addPhysics(knight)
                // console.log(coin)
              } else {
                let potion = new Potion({ x, y }, this.gameScene)
                potion.addPhysics(knight)
                potion.setScale(0.4, 0.4)
              }
          }
        }

        }
      })
//     this.gameScene.physics.add.overlap(knight, this, (gameObject1, gameObject2) =>
//     {
// //       console.log(this.time)
// //       const invu = (new Date() / 1000) - this.time
// //       console.log('invu', invu)
// //       if (invu > 2 ) {
// //         knight.damage(1)
// //         this.time = new Date() / 1000
// //       }

//       this.on('animationcomplete', ()=> {
//           knight.damage(0.01)
//       });

//     });
  }
}
Health.MixinTo(Skeleton);
