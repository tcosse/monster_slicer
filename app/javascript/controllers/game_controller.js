import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
// Connects to data-controller="game"
export default class extends Controller {
  static values = {playerImageUrl: String, bgImageUrl: String, basicTiles: String, keyboardType: String, tilemapUrl: String}
  connect() {
    const bgImageUrl = this.bgImageUrlValue
    const playerImageUrl = this.playerImageUrlValue
    const basicTiles = this.basicTilesValue
    const keyboardType = this.keyboardTypeValue
    const tilemapUrl = this.tilemapUrlValue

// window.onload = function() {
//   var game = new Phaser.Game();
// }
    let gameScene = new Phaser.Scene('Game');
    gameScene.preload = function() {
      this.load.image('background', bgImageUrl);
      this.load.image('player', playerImageUrl);
      this.load.image('enemy', playerImageUrl)
      this.load.image('tiles', basicTiles)
      this.load.tilemapTiledJSON('dungeon', tilemapUrl)
      console.log(tilemapUrl)
    };

    gameScene.create = function(){

      // this.bg = this.add.sprite(0,0, 'background');
      // this.bg.setOrigin(0,0);

      // Add tileset to the scene
      const map = this.make.tilemap( {key:'dungeon'} )
      const tileset = map.addTilesetImage('basictiles','tiles')
      map.createLayer('Ground', tileset)
      const wallLayer = map.createLayer('Walls', tileset)
      wallLayer.setCollisionByProperty( {collision: true} )

      const debugGraphics = this.add.graphics().setAlpha(0.7)

      wallLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });

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
      if (keyboardType === 'fr') {
        var keyUp = gameScene.input.keyboard.addKey('Z')
        var keyDown = gameScene.input.keyboard.addKey('S')
        var KeyLeft = gameScene.input.keyboard.addKey('Q')
        var KeyRight = gameScene.input.keyboard.addKey('D')
      } else {
        var keyUp = gameScene.input.keyboard.addKey('W')
        var keyDown = gameScene.input.keyboard.addKey('S')
        var KeyLeft = gameScene.input.keyboard.addKey('A')
        var KeyRight = gameScene.input.keyboard.addKey('D')
      }
      if(keyUp.isDown) {
        this.player.y -= 1;
      }
      else if(keyDown.isDown) {
        this.player.y += 1;
      }
      else if(KeyLeft.isDown) {
        this.player.x -= 1;
      }
      else if(KeyRight.isDown) {
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
