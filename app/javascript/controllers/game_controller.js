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
    tilemapUrl: String,
    skeletonIdleImageUrl: String,
    skeletonDeathImageUrl: String
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
    const skeletonIdleImageUrl = this.skeletonIdleImageUrlValue
    const skeletonDeathImageUrl = this.skeletonDeathImageUrlValue


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

      this.gameScene.load.spritesheet('enemy_skeleton', skeletonImageUrl, {frameWidth: 16, frameHeight: 16})
      this.gameScene.load.spritesheet('enemy_skeleton_idle', skeletonIdleImageUrl, {frameWidth: 32, frameHeight: 32})
      this.gameScene.load.spritesheet('enemy_skeleton_death', skeletonDeathImageUrl, {frameWidth: 96, frameHeight: 64})
      this.gameScene.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 32 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 48 , frameHeight: 64 })

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
      // Uncomment to display collision debug graphics

      // const debugGraphics = this.gameScene.add.graphics().setAlpha(0.7)
      // wallLayer.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });

      //this.gameScene.player = this.gameScene.physics.add.image(10,180, 'player').setCollideWorldBounds(true);

      this.knight = new Knight({x:100, y:100}, this.gameScene)
      this.skeleCount = 4
      this.skelesKilled = 0

      this.#spawnSkeletons(this.skeleCount)
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

      this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight);

      // this.knight.setCollideWorldBounds(true)
      // this.physics.world.addCollider(this.knight, wallLayer)
      const collider = this.gameScene.physics.add.collider(this.knight, wallLayer)
      // this.physics.add.collider(this.knight, this.skeleton)



    };

    this.gameScene.update = () => {
      this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight))
      this.knight.update()
      this.#checkSkeleton()
      }

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
  #spawnSkeletons(skeleCount){
    this.skeletons = []
    for(let i = 0; i < skeleCount; i++) {
      let randX =  Math.floor(Math.random() * (340 - 20) + 20)
      let randY =  Math.floor(Math.random() * (340 - 20) + 20)
      this.skeletons.push(new Skeleton({x: randX,y:randY}, this.gameScene))
    }
    this.skeletons.forEach(skeleton => skeleton.addPhysics(this.knight))
    return this.skeletons
  }
  #checkSkeleton(){
    let newSkeletons = []
    while(this.skeletons.length < this.skeleCount + this.knight.skeleKilled*2) {
      let randX =  Math.floor(Math.random() * (340 - 20) + 20)
      let randY =  Math.floor(Math.random() * (340 - 20) + 20)
      newSkeletons.push(new Skeleton({x: randX,y:randY}, this.gameScene))
      newSkeletons.forEach(skeleton => {
        skeleton.addPhysics(this.knight)
        this.skeletons.push(skeleton)
      });
    }


    // console.log(this.skeletons)
    return this.skeletons

  }

}
