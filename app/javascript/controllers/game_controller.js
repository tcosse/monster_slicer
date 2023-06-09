import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
import {Skeleton} from "skeleton"
import {Knight} from "knight"
import { loadAnimations } from "game_loader"

// Pas sur que ce soit encore necessaire car present dans les fichiers skeleton et knight.js
import PhaserHealth from 'phaser_health';
var Health = PhaserHealth;
Health.MixinTo(Knight);
Health.MixinTo(Skeleton);
// Fin de commentaire

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
      this.gameScene.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 64 , frameHeight: 64 })

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
      map.createLayer('Path', tileset)
      const wallsLayer = map.createLayer('Walls', tileset)
      const upperWallsLayer = map.createLayer('Upper_walls', tileset)
      const treesLayer = map.createLayer('Trees', tileset)
      const furnituresLayer = map.createLayer('Furnitures', tileset)
      wallsLayer.setCollisionByProperty( {collision: true} )
      upperWallsLayer.setCollisionByProperty( {collision: true} )
      treesLayer.setCollisionByProperty( {collision: true} )
      furnituresLayer.setCollisionByProperty( {collision: true} )

      // Uncomment the following lines to see which tiles collide

      // const debugGraphics = this.gameScene.add.graphics().setAlpha(0.7)
      // wallLayer.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });

      this.knight = new Knight({x:(35 * 16), y: (12 * 16)}, this.gameScene)
      this.skeleCount = 4
      this.skelesKilled = 0

      this.skeletons = this.#spawnSkeletons(this.skeleCount)

      // this.gameScene.enemy.depth = 1;
      // this.gameScene.enemy.setScale(0.5,0.5)

      // dégats gratuits
      // this.knight.damage(Phaser.Math.Between(8, 9))

      // gestion de la caméra
      // this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight);
      this.gameScene.cameras.main.setZoom(2)

      const characters = this.skeletons.concat(this.knight)
      characters.forEach( character => character.setCollideWorldBounds(true) )
      const WallsCollider = this.gameScene.physics.add.collider(characters, [wallsLayer, upperWallsLayer, furnituresLayer, treesLayer])

    };

    this.gameScene.update = () => {
      this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight))
      this.knight.update()
      this.#checkSkeleton()
      }

    let config = {
      type: Phaser.AUTO,
      parent: 'game',
      width: 800,
      height: 600,
      scene: this.gameScene,
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      }
    };
    let game = new Phaser.Game(config);
  }


  #spawnSkeletons(skeleCount){
    let skeletons = []
    for(let i = 0; i < skeleCount; i++) {
      let randX =  Math.floor(Math.random() * (720 - 360) + 360)
      let randY =  Math.floor(Math.random() * (720 - 360) + 360)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons.push(skeleton)
    }
    skeletons.forEach(skeleton => skeleton.addPhysics(this.knight))
    return skeletons
  }
  #checkSkeleton(){
    let newSkeletons = []
    while(this.skeletons.length < this.skeleCount + this.knight.skeleKilled*2) {
      let randX =  Math.floor(Math.random() * (720 - 360) + 360)
      let randY =  Math.floor(Math.random() * (720 - 360) + 360)
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
