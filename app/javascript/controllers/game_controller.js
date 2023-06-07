import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
// Connects to data-controller="game"
export default class extends Controller {
  static values = {playerImageUrl: String, bgImageUrl: String, skeletonImageUrl: String,
    knightImageUrl: String,
    knightRunImageUrl: String,
    knightAttackImageUrl: String}
  connect() {
    const bgImageUrl = this.bgImageUrlValue
    const playerImageUrl = this.playerImageUrlValue
    const skeletonImageUrl = this.skeletonImageUrlValue
    const knightImageUrl = this.knightImageUrlValue
    const knightRunImageUrl = this.knightRunImageUrlValue
    const knightAttackImageUrl = this.knightAttackImageUrlValue

// window.onload = function() {
//   var game = new Phaser.Game();
// }
    let gameScene = new Phaser.Scene('Game');

    gameScene.preload = function() {
      console.log(this.playerImageUrlValue)
      this.load.image('background', bgImageUrl);
      this.load.image('player', playerImageUrl);
      this.load.image('enemy', playerImageUrl)
      this.load.spritesheet('enemy_skeleton', skeletonImageUrl, {frameWidth: 16, frameHeight: 16})
      this.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 128 , frameHeight: 128 })

      console.log(skeletonImageUrl)
    };


    const enemy_start = [330, 180]
    const skeleton_start = [180,180]
    gameScene.create = function(){
      this.anims.create({
        key:"skeleton_idle",
        frameRate: 6,
        frames: this.anims.generateFrameNumbers("enemy_skeleton", {start: 0, end: 4}),
        repeat: -1
      })

      this.anims.create({
        key:"skeleton_dead",
        framerate:6,
        frames:this.anims.generateFrameNumbers("enemy_skeleton", {start:5, end: 12}),
        repeat: 0
      })
      this.anims.create({
        key: "idle",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("knight_idle", { start: 0, end: 4 }),
        repeat: -1
      });
      this.anims.create({
        key: "run",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("knight_run", { start: 0, end: 6 }),
        repeat: -1
      });
      this.anims.create({
        key: "attack",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("knight_attack", { start: 0, end: 4 }),
        repeat: 0
      });


      this.bg = this.add.sprite(0,0, 'background');

      this.bg.setOrigin(0,0);

      //this.player = this.physics.add.image(10,180, 'player').setCollideWorldBounds(true);
      this.skeleton = this.physics.add.sprite(180, 180,'enemy_skeleton')
      this.knight = this.physics.add.sprite(100,100,'knight_idle')
      this.knight.depth = 1;
      if(this.skeleton != null) {
        this.skeleton.play('skeleton_idle');
      }

      //this.physics.add.existing(this.skeleton)

      // this.enemy = this.physics.add.image(enemy_start[0], enemy_start[1], 'enemy').setCollideWorldBounds(true);
      this.physics.add.overlap(this.knight, this.skeleton, (gameObject1, gameObject2) =>
      {
          if (gameScene.input.keyboard.addKey("V").isDown) {
            this.skeleton.play("skeleton_dead", true)
            this.skeleton.setVelocity(0,0)
            this.skeleton.on('animationcomplete',()=> {
            this.skeleton.destroy()
            });
          }
      });

      // this.enemy.depth = 1;
      // this.enemy.setScale(0.5,0.5)
      this.skeleton.depth=1;
      this.knight.setScale(0.4,0.4)
      this.cameras.main.setBounds(0, 0, 2000, 4000)
      this.cameras.main.startFollow(this.knight);


    };

    gameScene.update = function() {
      var keyW = gameScene.input.keyboard.addKey('W')
      var keyZ = gameScene.input.keyboard.addKey('Z')
      var keyS = gameScene.input.keyboard.addKey('S')
      var keyA = gameScene.input.keyboard.addKey('A')
      var keyQ = gameScene.input.keyboard.addKey('Q')
      var keyD = gameScene.input.keyboard.addKey('D')
      var keyV = gameScene.input.keyboard.addKey('V')
      if(keyW.isDown || keyZ.isDown) {
        this.knight.y -= 1;
        this.knight.play('run', true)
      }
      else if(keyS.isDown) {
        this.knight.y += 1;
        this.knight.play('run', true)
      }
      else if(keyA.isDown || keyQ.isDown) {
        this.knight.x -= 1;
        this.knight.play('run', true)
        this.knight.flipX = true
      }
      else if(keyD.isDown) {
        this.knight.x += 1;
        this.knight.play('run', true)
        this.knight.flipX = false
      }
      else if(keyV.isDown) {
        this.knight.play('attack',true)
      }
      else {
        this.knight.play('idle', true)
      }

      var skeleton_speed = 30;
      var distance_between = Math.sqrt((this.knight.x-this.skeleton.x)**2 + (this.knight.y-this.skeleton.y)**2)
      var skeleton_start_distance = Math.sqrt((skeleton_start[0]-this.skeleton.x)**2 + (skeleton_start[1]-this.skeleton.y)**2)
      if(this.skeleton.scene != undefined) {
        if(distance_between < 100) {
          this.skeleton.setVelocity(
            skeleton_speed*(this.knight.x-this.skeleton.x)/distance_between,
            skeleton_speed*(this.knight.y-this.skeleton.y)/distance_between);
        }
        else {
          if(this.skeleton.x != skeleton_start[0] && this.skeleton.y != skeleton_start[1]) {
            this.skeleton.setVelocity(skeleton_speed*(skeleton_start[0]-this.skeleton.x)/skeleton_start_distance, skeleton_speed*(skeleton_start[1]-this.skeleton.y)/distance_between);
          }
        }

      }

    };

    let config = {
      type: Phaser.AUTO,
      width: 360,
      height: 360,
      scene: gameScene,
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      }
    };



    let game = new Phaser.Game(config);

  }


}
