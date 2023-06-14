import * as Phaser from "phaser"
import {HealthBar} from "healthbar"
import PhaserHealth from 'phaser_health';
var Health = PhaserHealth;
import { eventsCenter } from 'events_center';
import { Potion } from "potion";

export class Snake extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'snake_head')
    this.start = start
    this.gameScene = gameScene
    this.isDead = false
    this.depth = 40
    this.setScale(1,1)
    this.deplacements = ['up']
    this.movement = 'up'
    this.time = new Date() / 1000
    this.lastHit = new Date () / 1000
    this.blinkTime = new Date () / 1000
    // salle de boss
    // this.container = { x: [(32 * 16), (60 * 16)], y: [(103 * 16), (124 * 16)]}

    // depart pour test
    this.container = { x: [(29 * 16), (42 * 16)], y: [(9 * 16), (19 * 16)]}
    this.x = 30 * 16
    this.y = 15 * 16

    this.setHealth(150,0,150)

    const healthBar = new HealthBar(
      gameScene,
      this.x - 75,
      this.y - 25,
      this.getMaxHealth(),
      5,
      0xF24C3D
    );
    healthBar.add(this);
    this.healthBar = healthBar;
    this.healthBar.depth = 50

    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
    console.log(this)

    // this.setSize(20, 20)
    // this.setOffset(0,0)

    this.bodyParts = []
    this.bodyPart1 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart1.depth = 39
    this.bodyParts.push(this.bodyPart1)
    this.bodyPart2 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart2.depth = 38
    this.bodyParts.push(this.bodyPart2)
    this.bodyPart3 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart3.depth = 37
    this.bodyParts.push(this.bodyPart3)
    this.bodyPart4 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart4.depth = 36
    this.bodyParts.push(this.bodyPart4)
    this.bodyPart5 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart5.depth = 35
    this.bodyParts.push(this.bodyPart5)
    this.bodyPart6 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart6.depth = 34
    this.bodyParts.push(this.bodyPart6)
    this.bodyPart7 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart7.depth = 33
    this.bodyParts.push(this.bodyPart7)
    this.bodyPart8 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart8.depth = 32
    this.bodyParts.push(this.bodyPart8)
    this.bodyPart9 = new SnakeBody({x: this.x, y: this.y}, this.gameScene)
    this.bodyPart9.depth = 31
    this.bodyParts.push(this.bodyPart9)

  }

  move() {
    if (this.getHealth() == 0) {
      console.log('the snake is dead')
    } else {
      this.healthBar.bg.setX(this.x - 76)
      this.healthBar.bg.setY(this.y - 26)
      this.healthBar.bar.setX(this.x - 75)
      this.healthBar.bar.setY(this.y - 25)

      // faire l'ia de choix de mouvement
      const movementTime = new Date() / 1000
      // console.log(movementTime - this.time)

      // console.log(this.time - movementTime, this.x )

      if ((movementTime - this.time) > 1) {
        // console.log('dans le if')
        const random = Math.random()
        const lastMove = this.deplacements[this.deplacements.length - 1]
        console.log(this.container.x[0])
        if (random < 0.25 && lastMove != 'down' ) {
          if (this.y > this.container.y[0]) {
            this.movement = 'up'
          } else {
            if ((this.x - this.container.x[0] > 160) ) {
              this.movement = 'left'
            } else {
              this.movement = 'right'
            }
          }


        } else if (random < 0.5 && lastMove != 'up') {
          if (this.y < this.container.y[1]) {
            this.movement = 'down'
          } else {
            if ((this.x - this.container.x[0] > 160)) {
              this.movement = 'left'
            } else {
              this.movement = 'right'
            }
          }

        } else if (random < 0.75 && lastMove != 'left') {
          if (this.x < this.container.x[1]) {
            this.movement = 'right'
          } else {
            if ((this.y - this.container.y[0] > 160)) {
              this.movement = 'up'
            } else {
              this.movement = 'down'
            }
          }

        } else if (random < 1 && lastMove != 'right') {
          if (this.x > this.container.x[0]) {
            this.movement = 'left'
          } else {
            if ((this.y - this.container.y[0] > 160)) {
              this.movement = 'up'
            } else {
              this.movement = 'down'
            }
          }

        }
        console.log(this.movement)
        this.time = movementTime
        // console.log(this.deplacements)

      }




      this.deplacements.push(this.movement)
      if (this.deplacements.length > 600) {
        this.deplacements.splice(0, 1)
      }


      const speed = 30

      if (this.movement == 'up') {
        this.setVelocityX(0)
        this.setVelocityY(-speed);
        this.angle = 0

      } else if (this.movement == 'down') {
        this.setVelocityX(0)
        this.setVelocityY(speed);
        this.angle = 180

      } else if (this.movement == 'left') {
        this.setVelocityX(-speed);
        this.setVelocityY(0)
        this.angle = 270


      } else if (this.movement == 'right') {
        this.setVelocityX(speed);
        this.setVelocityY(0)
        this.angle = 90

      }

      // emplcaement des parties du corps
      // let temp = 60
      // if (this.deplacements[this.deplacements.length - temp] == 'up') {
      //   this.bodyPart1.setVelocityX(0)
      //   this.bodyPart1.setVelocityY(-speed);
      // } else if (this.deplacements[this.deplacements.length - temp] == 'down') {
      //   this.bodyPart1.setVelocityX(0)
      //   this.bodyPart1.setVelocityY(speed);
      // } else if (this.deplacements[this.deplacements.length - temp] == 'left') {
      //   this.bodyPart1.setVelocityX(-speed);
      //   this.bodyPart1.setVelocityY(0)
      // } else if (this.deplacements[this.deplacements.length - temp] == 'right') {
      //   this.bodyPart1.setVelocityX(speed);
      //   this.bodyPart1.setVelocityY(0)
      // }

      for (let i = 0; i < this.bodyParts.length; i++) {
        let temp =40 + 35 * i
        if (this.deplacements[this.deplacements.length - temp] == 'up') {
          this.bodyParts[i].setVelocityX(0)
          this.bodyParts[i].setVelocityY(-speed);
          if (this.deplacements[this.deplacements.length - temp] == this.deplacements[this.deplacements.length - 1]) {
            this.bodyParts[i].x = this.x
          }
        } else if (this.deplacements[this.deplacements.length - temp] == 'down') {
          this.bodyParts[i].setVelocityX(0)
          this.bodyParts[i].setVelocityY(speed);
          if (this.deplacements[this.deplacements.length - temp] == this.deplacements[this.deplacements.length - 1]) {
            this.bodyParts[i].x = this.x
          }
        } else if (this.deplacements[this.deplacements.length - temp] == 'left') {
          this.bodyParts[i].setVelocityX(-speed);
          this.bodyParts[i].setVelocityY(0)
          if (this.deplacements[this.deplacements.length - temp] == this.deplacements[this.deplacements.length - 1]) {
            this.bodyParts[i].y = this.y
          }
        } else if (this.deplacements[this.deplacements.length - temp] == 'right') {
          this.bodyParts[i].setVelocityX(speed);
          this.bodyParts[i].setVelocityY(0)
          if (this.deplacements[this.deplacements.length - temp] == this.deplacements[this.deplacements.length - 1]) {
            this.bodyParts[i].y = this.y
          }
        }
      }
    }
  }

  blinkingTail() {
    this.bodyPart9.setTint(0xff6666)
    if ((new Date() / 1000) - this.blinkTime > 1) {
      
    }

  }

  addPhysics(knight) {


    // this.object.setScale(2,2)
    // console.log(knight.object)
    //this.gameScene.physics.add.existing(this.object)
    // console.log(this.gameScene.physics.add)
    // this.gameScene.enemy = this.gameScene.physics.add.image(enemy_start[0], enemy_start[1], 'enemy').setCollideWorldBounds(true);
    this.gameScene.physics.add.overlap(knight.weapon, this.bodyPart9, (gameObject1, gameObject2) => {
      if (this.gameScene.input.keyboard.addKey("V").isDown || this.gameScene.input.manager.activePointer.primaryDown ) {
        this.setTint(0xff6666) // applies red color to skeleton when is attacked
        if (this.getHealth() > 0) {
          // if the skeleton has health left, then apply damage
            if ((new Date() / 1000) - this.lastHit > 1) {
              this.damage(75)
              this.clearTint()
              this.lastHit = new Date() / 1000
              console.log('damage')
            }

          // knight.on('animationcomplete', () => {
          //   this.damage(15)
          //   this.clearTint()
          // });
        } else {
          // if the skeleton has no life left, then he is considered as dead
          if (!this.isDead) {
            this.healthBar.bg.x = -1
            this.healthBar.bg.y = -1
            // the skeleton is beeing killed
            // prevents from running twice
            this.isDead = true;
            this.setVelocity(0,0)
            //     this.gameScene.deathSound.play()
            this.gameScene.time.delayedCall(5000, () => {this.destroy()});
            this.play("fireball_explosion", true)
            console.log(this.healthBar)

            this.bodyParts.forEach((bodyPart) => {
              bodyPart.setVelocity(0, 0)
              bodyPart.gameScene.time.delayedCall(5000, () => {bodyPart.destroy()});
              bodyPart.play("fireball_explosion", true)
            })
            this.gameScene.kills += 1
            this.gameScene.score += 500
            eventsCenter.emit('update-skeleton-kills', this.gameScene.kills)
            eventsCenter.emit('update-score', this.gameScene.score)

        //     // destroy the dead skeleton's colliders
            this.gameScene.physics.world.colliders._active.forEach(collider => {
              if(collider.object2 == gameObject2) {
                  collider.destroy()
                  if(this.weapon != null) {
                    this.weapon.destroy()
                  }
              }
            })

            const x = this.x
            const y = this.y + 10

            if(Math.random() < 0.05) {
              let potion = new Potion({ x, y }, this.gameScene)
              this.gameScene.time.delayedCall(12000, () => potion.destroy());
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
Health.MixinTo(Snake);

export class SnakeBody extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'snake_body')
    this.start = start
    this.gameScene = gameScene
    this.setScale(0.7, 0.7)

    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
    console.log(this)
  }
}
