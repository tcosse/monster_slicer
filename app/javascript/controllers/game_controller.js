import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
// Connects to data-controller="game"
export default class extends Controller {
  static values = {playerImageUrl: String,
    bgImageUrl: String,
    knightImageUrl: String,
    knightRunImageUrl: String,
    knightAttackImageUrl: String
  }
  connect() {
    const bgImageUrl = this.bgImageUrlValue
    const playerImageUrl = this.playerImageUrlValue
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
      this.load.image('enemy', playerImageUrl);
      this.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 128 , frameHeight: 128 })
    };

    gameScene.create = function(){
      this.knight = this.add.sprite(100,100,'knight_idle')
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
      this.knight.depth = 1;



      this.bg = this.add.sprite(0,0, 'background');

      this.bg.setOrigin(0,0);

      this.player = this.physics.add.image(10,180, 'player').setCollideWorldBounds(true);
      this.enemy = this.physics.add.image(350, 180, 'enemy').setCollideWorldBounds(true);
      this.physics.add.overlap(this.player, this.enemy, (gameObject1, gameObject2, body1, body2) =>
      {
        gameObject1.setAlpha(0.5)
      });

      this.player.depth = 1;
      this.player.setScale(0.5,0.5)
      this.enemy.depth = 1;
      this.enemy.setScale(0.5,0.5)
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
        this.knight.play('attack', true)
      }
      else {
        this.knight.play('idle', true)
      }


      var enemy_speed = 30
      var distance_between = Math.sqrt((this.player.x-this.enemy.x)**2 + (this.player.y-this.enemy.y)**2)
      if(distance_between < 100) {
        this.enemy.setVelocity(enemy_speed*(this.player.x-this.enemy.x)/distance_between, enemy_speed*(this.player.y-this.enemy.y)/distance_between)
      }
      else {
        this.enemy.setVelocity(0,0);
      }

    };

    gameScene.hitEnemy = function(player, enemy){
      this.enemy.destroy()
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
