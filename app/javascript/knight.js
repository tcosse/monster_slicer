import * as Phaser from "phaser"
import {HealthBar} from "healthbar" //"/healthbar.js"
import PhaserHealth from 'phaser_health';
import { Weapon } from "weapon";
var Health = PhaserHealth;

export class Knight extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene, startHealth) {
    super(gameScene, start.x, start.y, 'idle_down')
    this.start = start
    this.gameScene = gameScene
    this.weapon = new Weapon(start, gameScene)
    gameScene.physics.add.world.enableBody(this, 0);
    this.play("idle_down", true)
    this.depth = 2;
    this.setSize(15, 20)

    this.setOffset(17,22)
    this.depth = 2;
    gameScene.add.existing(this);
    this.skeleKilled = 0
    this.isDead = false

    // Ici je donne des HP au knight, je crée une barre de vie visuelle, je lie cette barre au knight (pour accéder a ses PV)
    // puis j'attribue cette barre au knight pour pouvoir l'appeler dans la def de knight
    //health
    this.setHealth(startHealth, 0, 50);
    const healthBar = new HealthBar(
      gameScene,
      this.x - 30,
      this.y - 15,
      this.getMaxHealth(),
      2,
      0x22ff00
    );
    healthBar.add(this);
    this.healthBar = healthBar;
    // nécessaire pour actualiser la barre de vie en cas de sauvegarde
    this.damage(0.1)
    this.heal(0.1)
  }

  update () {
    this.weapon.setPosition(this.x, this.y)
    // On check si on est pas mort
    if (this.getHealth() == 0) {
      // je suis mort
    }
    else {
      // on recolle la barre de vie au knight
      this.healthBar.bg.setX(this.x - 26)
      this.healthBar.bg.setY(this.y - 16)
      this.healthBar.bar.setX(this.x - 25)
      this.healthBar.bar.setY(this.y - 15)

      var keyW = this.gameScene.input.keyboard.addKey('W')
      var keyZ = this.gameScene.input.keyboard.addKey('Z')
      var keyS = this.gameScene.input.keyboard.addKey('S')
      var keyA = this.gameScene.input.keyboard.addKey('A')
      var keyQ = this.gameScene.input.keyboard.addKey('Q')
      var keyD = this.gameScene.input.keyboard.addKey('D')
      var keyV = this.gameScene.input.keyboard.addKey('V')
      var keyShift = this.gameScene.input.keyboard.addKey("SHIFT")

      if(keyW.isDown || keyA.isDown || keyS.isDown || keyD.isDown || keyV.isDown || keyZ.isDown || keyQ.isDown || this.gameScene.input.manager.activePointer.primaryDown) {
        const defaultSpeed = 30;
        const highSpeed = 150;
        let speed = defaultSpeed ;

        //if shiftkey is pressed, the knight speed will be higher
        if (keyShift.isDown) { speed = highSpeed} else { speed = defaultSpeed}

        if(keyW.isDown || keyZ.isDown) {
          // User wants to go up (presses W if english keyboard, Z for french)
          if(this.anims.currentAnim.key != "attack_up" && this.anims.currentAnim.key != "attack_side"&& this.anims.currentAnim.key != "attack_down") {
            if(keyA.isDown == false && keyD.isDown == false) {
              this.play('walk_up', true)
            }
            this.setVelocityY(-speed);
            this.weapon.setOffset(0,-15)
          }
          // if(this.anims.currentAnim.key == "skeleton_dead")

        }
        else if(keyS.isDown) {
          // User wants to go down (presses S)
          if(this.anims.currentAnim.key != "attack_up" && this.anims.currentAnim.key != "attack_side"&& this.anims.currentAnim.key != "attack_down") {
            if(keyA.isDown == false && keyD.isDown == false) {
              this.play('walk_down', true)
            }
            this.setVelocityY(speed);
            this.weapon.setOffset(0,20)
          }
        }
        else
        {
          this.setVelocityY(0)
        }

        if(keyA.isDown || keyQ.isDown) {
          // User wants to go left (presses Q in french keyboard, or A if english)
          if(this.anims.currentAnim.key != "attack_up" && this.anims.currentAnim.key != "attack_side"&& this.anims.currentAnim.key != "attack_down") {
            this.play('walk_side', true)
            this.setVelocityX(-speed);
            this.flipX = true
            this.weapon.setOffset(-20,-5)
          }
        }
        else if(keyD.isDown) {
          // User wants to go right (presses D)
          if(this.anims.currentAnim.key != "attack_up" && this.anims.currentAnim.key != "attack_side"&& this.anims.currentAnim.key != "attack_down") {
            this.play('walk_side', true)
            this.setVelocityX(speed);
            this.flipX = false
            this.weapon.setOffset(20,-5)
          }
        }
        else
        {
          this.setVelocityX(0)
        }
        // console.log(this.gameScene.input.manager.activePointer.primaryDown == true)
        if(keyV.isDown || this.gameScene.input.manager.activePointer.primaryDown) {

          this.gameScene.slashSound.play()
          this.setVelocity(0,0)
          switch(this.anims.currentAnim.key) {
            case "idle_down":
              this.play("attack_down", true)
              break;
            case "walk_down":
              this.play("attack_down", true)
              break;
            case "idle_side":
              this.play("attack_side", true)
              break;
            case "walk_side":
              this.play("attack_side", true)
              break;
            case "idle_up":
              this.play("attack_up", true)
              break;
            case "walk_up":
              this.play("attack_up", true)
              break;
            case "attack_down":
              this.chain("idle_down", true)
              break;
            case "attack_side":
              this.chain("idle_side", true)
              break;
            case "attack_up":
              this.chain("idle_up", true)
              break;
            default:

              //this.play("attack_side", true)
          }
          // User wants to go attack (presses V)


          // this.gameScene.anims.anims.entries.attack.type

        }
      }
      else {
        switch(this.anims.currentAnim.key) {
          case "walk_side":
            this.play("idle_side", true)
            break;
          case "walk_up":
            this.play("idle_up", true)
            break;
          case "walk_down":
            this.play("idle_down", true)
            break;
          case "attack_side":
              this.chain("idle_side", true)
            break;
          case "attack_up":
              this.chain("idle_up", true)
            break;
          case "attack_down":
              this.chain("idle_down", true)
            break;

          default:
            this.chain("idle_down", true)
        }
        this.setVelocity(0,0)
      }
    }
  }
}
Health.MixinTo(Knight);
