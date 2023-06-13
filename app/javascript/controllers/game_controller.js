import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
import {Skeleton} from "skeleton"
import {Knight} from "knight"
import {PauseScene} from "pause_scene"
import { loadAnimations } from "game_loader"
import { loadSounds } from "game_loader"
import { UIScene } from 'ui_scene'



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
    skeletonDeathImageUrl: String,
    emptyUrl: String,
    gameover: String,
    bgpauseUrl: String,
    coinImageUrl: String,
    newPlayerUrl: String,
    deathSound: String,
    slashSound: String,
    lastSaveMc: Array,
    newSkeletonUrl: String,
    potionImageUrl: String,

    coinSound: String,
    healSound: String,
    wilhelmSound: String,

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
    const coinImageUrl = this.coinImageUrlValue
    const potionImageUrl = this.potionImageUrlValue
    const emptyUrl = this.emptyUrlValue
    const bgpauseUrl = this.bgpauseUrlValue
    this.gameoverUrl = this.gameoverValue
    const newPlayerUrl = this.newPlayerUrlValue
    const deathSound = this.deathSoundValue
    const slashSound = this.slashSoundValue
    let lastSaveMc = this.lastSaveMcValue
    const newSkeletonUrl = this.newSkeletonUrlValue
    const coinSound = this.coinSoundValue
    const healSound = this.healSoundValue
    const wilhelmSound = this.wilhelmSoundValue

    this.gameoverUrl = this.gameoverValue


// window.onload = function() {
//   var game = new Phaser.Game();
// }

    //let gameScene = new Phaser.Scene('Game'); //this.gameScene local

    this.gameScene = new Phaser.Scene('Game'); //gameScene global (controller)
    this.gameScene.preload = () => {
      this.gameScene.load.image('background', bgImageUrl);
      this.gameScene.load.image('player', playerImageUrl);
      this.gameScene.load.image('enemy', playerImageUrl);
      this.gameScene.load.image('empty', emptyUrl);
      this.gameScene.load.image('tiles', basicTiles);
      this.gameScene.load.image('potion', potionImageUrl);
      this.gameScene.load.tilemapTiledJSON('dungeon', tilemapUrl)

      this.gameScene.load.spritesheet('enemy_skeleton', skeletonImageUrl, {frameWidth: 16, frameHeight: 16})
      this.gameScene.load.spritesheet('enemy_skeleton_idle', skeletonIdleImageUrl, {frameWidth: 32, frameHeight: 32})
      this.gameScene.load.spritesheet('enemy_skeleton_death', skeletonDeathImageUrl, {frameWidth: 96, frameHeight: 64})
      this.gameScene.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('player_all', newPlayerUrl, {frameWidth: 48, frameHeight:48})
      this.gameScene.load.spritesheet('skeleton_all', newSkeletonUrl, {frameWidth: 64, frameHeight:64})
      console.log("death: ", deathSound)
      this.gameScene.load.audio("death_sound", deathSound)
      this.gameScene.load.audio("slash_sound", slashSound)
      this.gameScene.load.audio("coin_sound", coinSound)
      this.gameScene.load.audio("heal_sound", healSound)
      this.gameScene.load.audio("wilhelm_sound", wilhelmSound)

      console.log(this.gameScene)

      this.gameScene.load.spritesheet('coin', coinImageUrl, { frameWidth: 8 , frameHeight: 8 })

    };

    // const skeleton_start =
    this.gameScene.create = () =>{
      console.log(lastSaveMc)
      // creer la scene de pause
      this.gameScene.scene.add('pauseScene', PauseScene, false, {gameScene: this.gameScene, bgUrl: bgpauseUrl, controller: this})
      // passer d'une scene à l'autre en appuyant sur echap


      loadAnimations(this.gameScene) //from game_loader
      // ajout du clic sur P pour mettre en Pause le jeu dans l'update
      this.gameScene.keyP = this.gameScene.input.keyboard.addKey('P')
      loadSounds(this.gameScene)

      // this.gameScene.bg = this.gameScene.add.sprite(0,0, 'background');
      // this.gameScene.bg.setOrigin(0,0);

      // Add tileset to the scene
      const map = this.gameScene.make.tilemap( {key:'dungeon'} )
      const tileset = map.addTilesetImage('basictiles', 'tiles', 16, 16, 1, 2)
      const groundLayer = map.createLayer('Ground', tileset)
      const lavaLayer = map.createLayer('Lava', tileset)
      map.createLayer('Path', tileset)
      const wallsLayer = map.createLayer('Walls', tileset)
      const upperWallsLayer = map.createLayer('Upper_walls', tileset)
      const treesLayer = map.createLayer('Trees', tileset)
      const furnituresLayer = map.createLayer('Furnitures', tileset)
      wallsLayer.setCollisionByProperty( {collision: true} )
      upperWallsLayer.setCollisionByProperty( {collision: true} )
      treesLayer.setCollisionByProperty( {collision: true} )
      // furnituresLayer.setCollisionByProperty( {collision: true} )

      // Uncomment the following lines to see which tiles collide

      // const debugGraphics = this.gameScene.add.graphics().setAlpha(0.7)
      // wallsLayer.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });
      this.newStartMc = [(35 * 16), (12 * 16), 50, 0]
      if(lastSaveMc.length == 0){
        console.log("AA")
        lastSaveMc = this.newStartMc
      }
      console.log(lastSaveMc)
      this.skeleCount = 4
      this.gameScene.kills = 0
      this.gameScene.coinCount = 0
      this.gameScene.score = 0
      this.knight = new Knight({x:lastSaveMc[0], y: lastSaveMc[1]}, this.gameScene, lastSaveMc[2])

      this.skeletons = this.#spawnSkeletons(this.skeleCount)
      console.log("spawned: ", this)
      console.log(this.knight.x)
      // this.gameScene.enemy.depth = 1;
      // this.gameScene.enemy.setScale(0.5,0.5)

      // dégats gratuits
      // this.knight.damage(Phaser.Math.Between(8, 9))

      // gestion de la caméra
      // this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight);
      this.gameScene.cameras.main.setZoom(2)
      const characters = this.skeletons.concat(this.knight)
      this.gameScene.physics.add.collider(characters, [wallsLayer, upperWallsLayer, furnituresLayer, treesLayer])
      // const coinsLabel = this.gameScene.add.text(100, 100, '0', {
      //   fontSize: '100'
      // })
      this.gameScene.scene.run('ui-scene')
    }


    this.gameScene.update = () => {
      this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight))
      this.knight.update()
      this.#checkSkeleton()
      if(this.gameScene.keyP.isDown){
        this.gameScene.scene.switch('pauseScene');
      }

      if (this.knight.getHealth() == 0) {
        // je suis mort
        this.knight.isDead = true
        //this.gameScene.wilhelmSound.play() // :( save wilhelm
        this.knight.setVelocity(0,0);
        this.#saveKnight(this.newStartMc)

        // this.play('dead', true)
        setTimeout(() => {
          window.location.replace(this.gameoverUrl);
        }, "1000");
        this.gameScene.physics.world.disableUpdate()
      }
    }

    let config = {
      type: Phaser.AUTO,
      parent: 'game',
      mode: Phaser.Scale.RESIZE,
      width: 750,
      height: 650,
      scene: [this.gameScene, UIScene, this.pauseScene],
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      physics: {
        default: 'arcade',
        arcade: { debug: true }
      }
    };
    let game = new Phaser.Game(config);
  }

  #spawnSkeletons(skeleCount){
    let skeletons = []
    for(let i = 0; i < skeleCount; i++) {
      let randX =  Math.floor(Math.random() * (42*16 - 27*16) + 27*16)
      let randY =  Math.floor(Math.random() * (33*16 - 28*16) + 28*16)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons.push(skeleton)
    }
    skeletons.forEach(skeleton => skeleton.addPhysics(this.knight))
    return skeletons
  }
  #checkSkeleton(){
    let newSkeletons = []
    while(this.skeletons.length < this.skeleCount + this.knight.skeleKilled*2) {
      let randX =  Math.floor(Math.random() * (61*16 - 47*16) + 47*16)
      let randY =  Math.floor(Math.random() * (58*16 - 37*16) + 37*16)
      newSkeletons.push(new Skeleton({x: randX,y:randY}, this.gameScene))
      newSkeletons.forEach(skeleton => {
        skeleton.addPhysics(this.knight)
        this.skeletons.push(skeleton)
      });
    }
    return this.skeletons

  }
  #saveKnight(newStartMc){
    const mainCharacter = {
      x: newStartMc[0],
      y: newStartMc[1],
      health: newStartMc[2],
      cointCount: newStartMc[3],
      kills: newStartMc[4],
      score: newStartMc[5],
    };

    fetch("/main_characters", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(mainCharacter)
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }

}
