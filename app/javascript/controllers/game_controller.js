import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
import {Skeleton} from "../skeleton.js"
import {Knight} from "../knight.js"
import { loadAnimations } from "../game_loader.js"
// Connects to data-controller="game"
export default class extends Controller {
  static values = {playerImageUrl: String, bgImageUrl: String, skeletonImageUrl: String, basicTiles: String, keyboardType: String, tilemapUrl: String,
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
    const basicTiles = this.basicTilesValue
    const keyboardType = this.keyboardTypeValue
    const tilemapUrl = this.tilemapUrlValue



    this.skeleton_start =
// window.onload = function() {
//   var game = new Phaser.Game();
// }
    //let gameScene = new Phaser.Scene('Game'); //this.gameScene local
    this.gameScene = new Phaser.Scene('Game'); //gameScene global (controller)
    this.gameScene.preload = () => {
      this.gameScene.load.image('background', bgImageUrl);
      this.gameScene.load.image('player', playerImageUrl);
      this.gameScene.load.image('enemy', playerImageUrl)

      this.gameScene.load.image('tiles', basicTiles)
      this.gameScene.load.tilemapTiledJSON('dungeon', tilemapUrl)
      console.log(tilemapUrl)

      this.gameScene.load.spritesheet('enemy_skeleton', skeletonImageUrl, {frameWidth: 16, frameHeight: 16})
      this.gameScene.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.gameScene.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.gameScene.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 128 , frameHeight: 128 })

      console.log(skeletonImageUrl)

    };

    // const skeleton_start =
    this.gameScene.create = () =>{

      loadAnimations(this.gameScene) //from game_loader

      // this.gameScene.bg = this.gameScene.add.sprite(0,0, 'background');
      // this.gameScene.bg.setOrigin(0,0);

      // Add tileset to the scene
      const map = this.gameScene.make.tilemap( {key:'dungeon'} )
      const tileset = map.addTilesetImage('basictiles','tiles')
      map.createLayer('Ground', tileset)
      const wallLayer = map.createLayer('Walls', tileset)
      wallLayer.setCollisionByProperty( {collision: true} )

      // const debugGraphics = this.gameScene.add.graphics().setAlpha(0.7)

      // wallLayer.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });

      //this.gameScene.player = this.gameScene.physics.add.image(10,180, 'player').setCollideWorldBounds(true);
      this.skeletons = []
      for(let i = 0; i <4; i++) {
        let randX =  Math.floor(Math.random() * (340 - 20) + 20)
        let randY =  Math.floor(Math.random() * (340 - 20) + 20)
        this.skeletons.push(new Skeleton({x: randX,y:randY}, this.gameScene))
      }

      this.knight = new Knight({x:100, y:100}, this.gameScene)
      // this.knight.object = this.gameScene.physics.add.sprite(100,100,'knight_idle')
      this.knight.object.depth = 1;
      this.skeletons.forEach(skeleton => skeleton.addPhysics(this.knight))
      // this.gameScene.enemy.depth = 1;
      // this.gameScene.enemy.setScale(0.5,0.5)

      this.knight.object.setScale(0.4,0.4)
      this.knight.object.play("idle", true)

      this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight.object);


    };

    this.gameScene.update = () => {
      var keyW = this.gameScene.input.keyboard.addKey('W')
      var keyZ = this.gameScene.input.keyboard.addKey('Z')
      var keyS = this.gameScene.input.keyboard.addKey('S')
      var keyA = this.gameScene.input.keyboard.addKey('A')
      var keyQ = this.gameScene.input.keyboard.addKey('Q')
      var keyD = this.gameScene.input.keyboard.addKey('D')
      var keyV = this.gameScene.input.keyboard.addKey('V')
      if(keyW.isDown || keyA.isDown||keyS.isDown||keyD.isDown ||keyV.isDown ||keyZ.isDown||keyQ.isDown) {

        if(keyW.isDown || keyZ.isDown) {
          this.knight.object.y -= 1;
          this.knight.object.play('run', true)
        }
        else if(keyS.isDown) {
          this.knight.object.y += 1;
          this.knight.object.play('run', true)
        }

        if(keyA.isDown || keyQ.isDown) {
          this.knight.object.x -= 1;
          this.knight.object.play('run', true)
          this.knight.object.flipX = true
        }
        else if(keyD.isDown) {
          this.knight.object.x += 1;
          this.knight.object.play('run', true)
          this.knight.object.flipX = false
        }
        else if(keyV.isDown) {
          this.knight.object.play('attack', true)
          console.log(this)
          console.log(this.gameScene)

        }
      }
      else {
        this.knight.object.chain('idle', true)
      }
      this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight.object))

    };

    let config = {
      type: Phaser.AUTO,
      width: 360,
      height: 360,
      scene: this.gameScene,
      physics: {
        default: 'arcade',
        arcade: { debug: true }
      }
    };



    let game = new Phaser.Game(config);

  }



}
