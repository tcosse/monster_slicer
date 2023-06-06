import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
// Connects to data-controller="game"
export default class extends Controller {
  static values = {playerImageUrl: String, bgImageUrl: String}
  connect() {
    const bgImageUrl = this.bgImageUrlValue
    const playerImageUrl = this.playerImageUrlValue

// window.onload = function() {
//   var game = new Phaser.Game();
// }
    let gameScene = new Phaser.Scene('Game');
    gameScene.preload = function() {
      console.log(this.playerImageUrlValue)
      this.load.image('background', bgImageUrl);
      this.load.image('player', playerImageUrl);
      this.load.image('enemy', playerImageUrl)
    };

    gameScene.create = function(){

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
      this.cameras.main.startFollow(this.player);

    };

    gameScene.update = function() {
      var keyW = gameScene.input.keyboard.addKey('W')
      var keyS = gameScene.input.keyboard.addKey('S')
      var keyA = gameScene.input.keyboard.addKey('A')
      var keyD = gameScene.input.keyboard.addKey('D')
      if(keyW.isDown) {
        this.player.y -= 1;
      }
      else if(keyS.isDown) {
        this.player.y += 1;
      }
      else if(keyA.isDown) {
        this.player.x -= 1;
      }
      else if(keyD.isDown) {
        this.player.x += 1;
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
