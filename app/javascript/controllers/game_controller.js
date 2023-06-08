import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
import {Skeleton} from "../skeleton.js"
import {Knight} from "../knight.js"
import {HealthBar} from "../healthbar.js"
import { loadAnimations } from "../game_loader.js"
import PhaserHealth from 'phaser_health';

var Health = PhaserHealth;
Health.MixinTo(Knight);
var Shuffle = Phaser.Utils.Array.Shuffle;

// Connects to data-controller="game"
export default class extends Controller {
  static values = {playerImageUrl: String,
    bgImageUrl: String,
    skeletonImageUrl: String,
    knightImageUrl: String,
    knightRunImageUrl: String,
    knightAttackImageUrl: String,
    basicTiles: String,
    tilemapUrl: String
  }


  connect() {
    const bgImageUrl = this.bgImageUrlValue
    const playerImageUrl = this.playerImageUrlValue
    const skeletonImageUrl = this.skeletonImageUrlValue
    const knightImageUrl = this.knightImageUrlValue
    const knightRunImageUrl = this.knightRunImageUrlValue
    const knightAttackImageUrl = this.knightAttackImageUrlValue
    const basicTiles = this.basicTilesValue
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
      console.log("first:", this.knight)
      // this.knight = this.gameScene.physics.add.sprite(100,100,'knight_idle')
      this.knight.depth = 1;
      this.skeletons.forEach(skeleton => skeleton.addPhysics(this.knight))
      // this.gameScene.enemy.depth = 1;
      // this.gameScene.enemy.setScale(0.5,0.5)
      this.knight.setHealth(50, 0, 50);

      this.healthBar = new HealthBar(
        this.gameScene,
        this.knight.x - 30,
        this.knight.y - 15,
        this.knight.getMaxHealth(),
        6
      );
      this.healthBar.add(this.knight);


      this.knight.setScale(0.4,0.4)
      this.knight.play("idle", true)

      this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight);

      // console.log(wallLayer)
      // this.knight.setCollideWorldBounds(true)
      // this.physics.world.addCollider(this.knight, wallLayer)
      const collider = this.gameScene.physics.add.collider(this.knight, wallLayer)
      // console.log(collider)
      this.gameScene.physics.add.collider(this.knight, this.skeleton)

    };

    this.gameScene.update = () => {
      console.log(this.knight)
      var keyW = this.gameScene.input.keyboard.addKey('W')
      var keyZ = this.gameScene.input.keyboard.addKey('Z')
      var keyS = this.gameScene.input.keyboard.addKey('S')
      var keyA = this.gameScene.input.keyboard.addKey('A')
      var keyQ = this.gameScene.input.keyboard.addKey('Q')
      var keyD = this.gameScene.input.keyboard.addKey('D')
      var keyV = this.gameScene.input.keyboard.addKey('V')
      var keyShift = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)

      if(keyW.isDown || keyA.isDown||keyS.isDown||keyD.isDown ||keyV.isDown ||keyZ.isDown||keyQ.isDown) {

        let speed = 50;
        const highSpeed = 200;

        if (keyShift.isDown) { speed = highSpeed}
        //if shiftkey is pressed, the knight speed will be higher

        if(keyW.isDown || keyZ.isDown) {
          // User wants to go up (presses W if english keyboard, Z for french)
          this.knight.play('run', true)
          this.knight.setVelocity(0, -speed);
        }
        else if(keyS.isDown) {
          // User wants to go down (presses S)
          // console.log(this.knight)
          this.knight.setVelocity(0, speed);
          this.knight.play('run', true)
        }

        if(keyA.isDown || keyQ.isDown) {
          // User wants to go left (presses Q in french keyboard, or A if english)
          this.knight.play('run', true)
          this.knight.setVelocity(-speed, 0);
          this.knight.flipX = true
        }
        else if(keyD.isDown) {
          // User wants to go right (presses D)
          this.knight.play('run', true)
          this.knight.setVelocity(speed, 0);
          this.knight.flipX = false
        }
        else if(keyV.isDown) {
          // User wants to go attack (presses V)
          this.knight.play('attack', true)
          // console.log(this.anims.anims.entries.attack)
          this.anims.anims.entries.attack.type
        }
      }
      else {

        this.knight.chain('idle', true)
        this.knight.setVelocity(0,0)
      }

      var skeleton_speed = 30;
      var distance_between = Math.sqrt((this.knight.x-this.skeleton.x)**2 + (this.knight.y-this.skeleton.y)**2)
      var skeleton_start_distance = Math.sqrt((skeleton_start[0]-this.skeleton.x)**2 + (skeleton_start[1]-this.skeleton.y)**2)
      if(this.skeleton.scene != undefined) {
        if(distance_between < 100) {
          this.skeleton.setVelocity(skeleton_speed*(this.knight.x-this.skeleton.x)/distance_between, skeleton_speed*(this.knight.y-this.skeleton.y)/distance_between);
        }
        else {
          if(this.skeleton.x != skeleton_start[0] && this.skeleton.y != skeleton_start[1]) {
            this.skeleton.setVelocity(skeleton_speed*(skeleton_start[0]-this.skeleton.x)/skeleton_start_distance, skeleton_speed*(skeleton_start[1]-this.skeleton.y)/distance_between);
          }
        }
      }
      this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight))

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
