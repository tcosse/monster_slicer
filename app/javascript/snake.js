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
    this.timeToHit = new Date () / 1000
    this.blinkTime = new Date () / 1000


    // salle de boss

    this.container = { x: [483, 1003], y: [1593, 2026]}
    this.knightInBossRoomValue = false


    // depart pour test
    // this.container = { x: [(29 * 16), (42 * 16)], y: [(9 * 16), (19 * 16)]}
    // this.x = 30 * 16
    // this.y = 15 * 16

    this.target = {x: (47 * 16), y: (122 * 16), cadrant: 1}

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

  #calculateDistance(objectA, objectB) {
    return Math.sqrt((objectA.x-objectB.x)**2 + (objectA.y-objectB.y)**2)
  }

  knightInBossRoom(knight) {
    if (knight.x < this.container.x[1] && knight.x > this.container.x[0] && knight.y < this.container.y[1] && knight.y > this.container.y[0] ) {
      return this.knightInBossRoomValue = true
    } else {
      return this.knightInBossRoomValue = false
    }
  }

  move(knight) {
    console.log('le snake bouge')
    if (this.getHealth() == 0) {
      console.log('the snake is dead')
    } else {
      this.healthBar.bg.setX(this.x - 76)
      this.healthBar.bg.setY(this.y - 26)
      this.healthBar.bar.setX(this.x - 75)
      this.healthBar.bar.setY(this.y - 25)

      // faire l'ia de choix de mouvement


      console.log('le perso est dans la salle de boss', this.knightInBossRoomValue)
      const distanceBetweenLastTarget = this.#calculateDistance(this, this.target)
      const lastTarget = this.target
      // (new Date() / 1000) - this.time) > 20 ||
      // console.log('time', (new Date() / 1000) - this.time,'dist' ,distanceBetweenLastTarget)
      if (distanceBetweenLastTarget <= 50) {
        const targetRange = (5 * 16)
        const noGoZone = targetRange
        if (this.knightInBossRoomValue) {
          const array = [1, 2, 3, 4]
          array.splice(lastTarget.cadrant - 1, 1)
          const goTo = array[Math.floor(Math.random() * 4)]
          if (goTo == 4) {
            this.target.x = knight.x + noGoZone + (Math.random() * targetRange)
            this.target.y = knight.y + noGoZone + (Math.random() * targetRange)
            this.target.cadrant = 4
          } else if (goTo == 1) {
            this.target.x = knight.x - noGoZone - (Math.random() * targetRange)
            this.target.y = knight.y - noGoZone - (Math.random() * targetRange)
            this.target.cadrant = 1
          } else if (goTo == 3) {
            this.target.x = knight.x - noGoZone - (Math.random() * targetRange)
            this.target.y = knight.y + noGoZone + (Math.random() * targetRange)
            this.target.cadrant = 3
          } else if (goTo == 2) {
            this.target.x = knight.x + noGoZone + (Math.random() * targetRange)
            this.target.y = knight.y - noGoZone - (Math.random() * targetRange)
            this.target.cadrant = 2
          }
          // if (Math.random() < 0.5) {
          //   this.target.x = knight.x + (5 * 16) + (Math.random() * targetRange)
          // } else {
          //   this.target.x = knight.x - (5 * 16)  - (Math.random() * targetRange)
          // }
          // if (Math.random() < 0.5) {
          //   this.target.y = knight.y + (5 * 16)  + (Math.random() * targetRange)
          // } else {
          //   this.target.y = knight.y + (5 * 16)  - (Math.random() * targetRange)
          // }

        } else {
          const targetRange = (15 * 16)
          const targetRoom = { x: 752, y: 1792}
          if (Math.random() < 0.5) {
            this.target.x = targetRoom.x + (Math.random() * targetRange)
          } else {
            this.target.x = targetRoom.x - (Math.random() * targetRange)
          }
          if (Math.random() < 0.5) {
            this.target.y = targetRoom.y + (Math.random() * targetRange)
          } else {
            this.target.y = targetRoom.y - (Math.random() * targetRange)
          }
        }
        console.log('knight', knight.x, knight.y)
        console.log('snake', this.x, this.y)
        console.log('target', this.target)

        this.time = new Date() / 1000
        this.deplacements.push(this.target)
      }

      if (this.deplacements.length > 10) {
        this.deplacements.splice(0, 1)
      }


      const speed = 20

      // mouvement de la tete
      const distanceBetween = this.#calculateDistance(this, this.target)


      if (distanceBetween > 10 ) {
        this.setVelocity(speed * (this.target.x - this.x) / distanceBetween, speed * (this.target.y - this.y) / distanceBetween);
      } else if( distanceBetween <= 20){
        if(this.body.newVelocity.x < 0){
          this.setVelocity(-0.001,0)
        }
        else {
          this.setVelocity(0.001,0)
        }
      }

      // angle du sprite



      // les body parts suivent le corps
      for (let i = 0; i < this.bodyParts.length; i++) {

        if (i == 0) {
          const distanceBetween = this.#calculateDistance(this, this.bodyParts[i])

          if (distanceBetween < 150 && distanceBetween > 10 ) {
            this.bodyParts[i].setVelocity(speed * (this.x - this.bodyParts[i].x) / distanceBetween, speed * (this.y - this.bodyParts[i].y) / distanceBetween);
          } else if( distanceBetween <= 20){
            if(this.bodyParts[i].body.newVelocity.x < 0){
              this.bodyParts[i].setVelocity(-0.001,0)
            }
            else {
              this.bodyParts[i].setVelocity(0.001,0)
            }
          }
        } else {
          const distanceBetween = this.#calculateDistance(this.bodyParts[i - 1], this.bodyParts[i])

          if (distanceBetween < 150 && distanceBetween > 10 ) {
            this.bodyParts[i].setVelocity(speed * (this.bodyParts[i - 1].x - this.bodyParts[i].x) / distanceBetween, speed * (this.bodyParts[i - 1].y - this.bodyParts[i].y) / distanceBetween);
          } else if( distanceBetween <= 20){
            if(this.bodyParts[i].body.newVelocity.x < 0){
              this.bodyParts[i].setVelocity(-0.001,0)
            }
            else {
              this.bodyParts[i].setVelocity(0.001,0)
            }
          }
        }
      }
    }
  }

  blinkingTail() {
    if ((new Date() / 1000) - this.blinkTime > 0.5) {
      this.bodyPart9.setTint(0xff6666)
      this.blinkTime = new Date() / 1000
    } else if ((new Date() / 1000) - this.blinkTime > 0.25){
      this.bodyPart9.clearTint()
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
              this.damage(30)
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

            // const x = this.x
            // const y = this.y + 10

            // if(Math.random() < 0.05) {
            //   let potion = new Potion({ x, y }, this.gameScene)
            //   this.gameScene.time.delayedCall(12000, () => potion.destroy());
            //   potion.addPhysics(knight)
            //   potion.setScale(0.4, 0.4)
            // }

            }
          }
        }
      })

  }

  damageKnight(knight) {
    this.bodyParts.forEach((bodyPart) => {
      this.gameScene.physics.add.overlap(knight, bodyPart, (gameObject1, gameObject2) => {
        // console.log(this.timeToHit)
        if ((new Date() / 1000) - this.timeToHit > 2 ) {
          knight.damage(15)
          this.timeToHit = new Date() / 1000
        }
      })
    })

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
