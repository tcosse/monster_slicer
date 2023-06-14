import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
import {Skeleton} from "skeleton"
import {Knight} from "knight"
import {PauseScene} from "pause_scene"
import { loadAnimations } from "game_loader"
import { loadSounds } from "game_loader"
import { UIScene } from 'ui_scene'
import { Snake } from 'snake'
import {Fireball} from 'fireball'
import {SelectCharacter} from 'select_character'
// import {Spell} from 'spell'
import { eventsCenter } from 'events_center'



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
    snakeHeadImageUrl: String,
    snakeBodyImageUrl: String,
    snakeImageUrl: String,
    spellUrl: String,
    coinSound: String,
    healSound: String,
    wilhelmSound: String,
    fireballUrl: String,
    explosionUrl: String,
    selectMcUrl: String,
    mcWindowUrl: String,
    spellSound: String,
    explosionSound: String,
    okSound: String,
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
    const snakeHeadImageUrl = this.snakeHeadImageUrlValue
    const snakeBodyImageUrl = this.snakeBodyImageUrlValue
    const snakeImageUrl = this.snakeImageUrlValue
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
    const spellSound = this.spellSoundValue
    const explosionSound = this.explosionSoundValue
    const okSound = this.okSoundValue
    const fireballUrl = this.fireballUrlValue
    const explosionUrl = this.explosionUrlValue
    const mcWindowUrl = this.mcWindowUrlValue
    const selectMcUrl = this.selectMcUrlValue
    const spellUrl = this.spellUrlValue
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
      this.gameScene.load.image('snake_head', snakeHeadImageUrl);
      this.gameScene.load.image('snake_body', snakeBodyImageUrl);

      this.gameScene.load.tilemapTiledJSON('dungeon', tilemapUrl)

      this.gameScene.load.spritesheet('enemy_skeleton', skeletonImageUrl, {frameWidth: 16, frameHeight: 16})
      this.gameScene.load.spritesheet('enemy_skeleton_idle', skeletonIdleImageUrl, {frameWidth: 32, frameHeight: 32})
      this.gameScene.load.spritesheet('enemy_skeleton_death', skeletonDeathImageUrl, {frameWidth: 96, frameHeight: 64})
      this.gameScene.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 64 , frameHeight: 64 })
      this.gameScene.load.spritesheet('player_all', newPlayerUrl, {frameWidth: 48, frameHeight:48})
      this.gameScene.load.spritesheet('skeleton_all', newSkeletonUrl, {frameWidth: 64, frameHeight:64})
      this.gameScene.load.spritesheet('coin', coinImageUrl, { frameWidth: 8 , frameHeight: 8 })
      this.gameScene.load.spritesheet('fireball', fireballUrl, {frameWidth: 64, frameHeight:64})
      this.gameScene.load.spritesheet('explosion', explosionUrl, {frameWidth: 196, frameHeight:190})
      this.gameScene.load.spritesheet('spell', spellUrl, {frameWidth: 16, frameHeight:24})

      this.gameScene.load.audio("death_sound", deathSound)
      this.gameScene.load.audio("slash_sound", slashSound)
      this.gameScene.load.audio("coin_sound", coinSound)
      this.gameScene.load.audio("heal_sound", healSound)
      this.gameScene.load.audio("wilhelm_sound", wilhelmSound)
      this.gameScene.load.audio("spell_sound", spellSound)
      this.gameScene.load.audio("explosion_sound", explosionSound)
      this.gameScene.load.audio("ok_sound", okSound)

    };

    // const skeleton_start =
    this.gameScene.create = () =>{
      // this.gameScene.physics.world.setFPS(10)
      // console.log(this.frameCnt)
      console.log(lastSaveMc)
      // creer la scene de pause
      // passer d'une scene à l'autre en appuyant sur P
      this.gameScene.scene.add('pauseScene', PauseScene, false, {gameScene: this.gameScene, bgUrl: bgpauseUrl, controller: this})

      // creer la scene de selection du perso
      this.gameScene.scene.add('select_character', SelectCharacter, false, {mcUrl: newPlayerUrl, bgUrl: selectMcUrl, mcWindowUrl: mcWindowUrl, gameScene: this.gameScene})

      loadAnimations(this.gameScene) //from game_loader
      // ajout du clic sur P pour mettre en Pause le jeu dans l'update
      this.gameScene.keyP = this.gameScene.input.keyboard.addKey('P')
      this.gameScene.keyEchap = this.gameScene.input.keyboard.addKey('ESC')
      loadSounds(this.gameScene)

      // this.gameScene.bg = this.gameScene.add.sprite(0,0, 'background');
      // this.gameScene.bg.setOrigin(0,0);

      // Add tileset to the scene
      const map = this.gameScene.make.tilemap( {key:'dungeon'} )
      const tileset = map.addTilesetImage('basictiles', 'tiles', 16, 16, 1, 2)
      this.groundLayer = map.createLayer('Ground', tileset)
      this.lavaLayer = map.createLayer('Lava', tileset)
      map.createLayer('Path', tileset)
      this.wallsLayer = map.createLayer('Walls', tileset)
      this.upperWallsLayer = map.createLayer('Upper_walls', tileset)
      this.treesLayer = map.createLayer('Trees', tileset)
      this.furnituresLayer = map.createLayer('Furnitures', tileset)
      this.wallsLayer.setCollisionByProperty( {collision: true} )
      this.upperWallsLayer.setCollisionByProperty( {collision: true} )
      this.treesLayer.setCollisionByProperty( {collision: true} )
      // furnituresLayer.setCollisionByProperty( {collision: true} )

      // Uncomment the following lines to see which tiles collide

      // const debugGraphics = this.gameScene.add.graphics().setAlpha(0.7)
      // wallsLayer.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });
      this.newStartMc = {
        x: (50 * 16),
        y:  (12 * 16),
        health: 50,
        coins: 0,
        kills: 0,
        score: 0,
      };
      if(lastSaveMc.length == 0 || lastSaveMc[2] == 0){
        // on doit commencer par choisir son perso en cas de 1ere game / de mort
        this.gameScene.scene.stop('ui-scene')
        this.gameScene.scene.switch('select_character');
        // on commence la partie avec les données de base
        lastSaveMc = this.newStartMc
      } else {
        lastSaveMc = {
          x: lastSaveMc[0],
          y:  lastSaveMc[1],
          health: lastSaveMc[2],
          coins: lastSaveMc[5],
          kills: lastSaveMc[4],
          score: lastSaveMc[3],
        }
      }
      console.log(lastSaveMc)
      this.skeleCount = 4
      this.gameScene.kills = lastSaveMc.kills
      this.gameScene.coinCount = lastSaveMc.coins
      this.gameScene.score = lastSaveMc.score
      this.knight = new Knight({x:lastSaveMc.x, y: lastSaveMc.y}, this.gameScene, lastSaveMc.health)

      this.skeletons = this.#spawnSkeletons(this.skeleCount)
      console.log("spawned: ", this)
      console.log(this.knight.x)
      const fireball = new Fireball({x: this.knight.x, y: this.knight.y+100}, this.gameScene, "bottom", this)
      // this.gameScene.enemy.depth = 1;
      // this.gameScene.enemy.setScale(0.5,0.5)

      this.snake = new Snake({x: (46 * 16), y: (113 * 16)}, this.gameScene)
      this.snakeIsDead = false
      // dégats gratuits
      // this.knight.damage(Phaser.Math.Between(8, 9))

      // gestion de la caméra
      // this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight);
      this.gameScene.cameras.main.setZoom(2)
      const characters = this.skeletons.concat(this.knight)
      this.gameScene.physics.add.collider(characters, [this.wallsLayer, this.upperWallsLayer, this.furnituresLayer, this.treesLayer])
      this.gameScene.physics.add.collider(fireball, [this.wallsLayer, this.upperWallsLayer, this.furnituresLayer, this.treesLayer])
      // const coinsLabel = this.gameScene.add.text(100, 100, '0', {
      //   fontSize: '100'
      // })

      // ajout de l'ui
      this.gameScene.scene.add('ui-scene', UIScene , true, {gameScene: this.gameScene} )

      console.log(this.snake)
    }


    this.gameScene.update = () => {
      this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight))
      this.knight.update()
      this.#checkSkeleton()
      if(this.gameScene.keyP.isDown || this.gameScene.keyEchap.isDown){
        this.gameScene.scene.switch('pauseScene');
      }

      if (this.knight.getHealth() == 0) {
        // je suis mort
        this.knight.isDead = true
        //this.gameScene.wilhelmSound.play() // :( save wilhelm
        this.knight.setVelocity(0,0);
        this.#saveKnight({x: 0, y: 0, health: 0, score: this.gameScene.score, kills: this.gameScene.kills, coins: this.gameScene.coinCount})
        // this.#saveKnight(this.newStartMc)

        // this.play('dead', true)
        setTimeout(() => {
          window.location.replace(this.gameoverUrl);
        }, "1000");
        this.gameScene.physics.world.disableUpdate()
      }

      if (this.snakeIsDead == false){
        this.snake.move()
        this.snake.addPhysics(this.knight)
        if (this.snake.getHealth() == 0) {
          this.snakeIsDead = true
          delete this.snake
        }
      }
    }

    let config = {
      type: Phaser.AUTO,
      scale : {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 800,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [this.gameScene, this.UIScene, this.pauseScene, this.SelectCharacter],
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
      let randX =  Math.floor(Math.random() * (65*16 - 43*16) + 43*16)
      let randY =  Math.floor(Math.random() * (41*16 - 27*16) + 27*16)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons.push(skeleton)
    }
    skeletons.forEach(skeleton => skeleton.addPhysics(this.knight))
    return skeletons
  }
  #checkSkeleton(){
    let newSkeletons = []
    while(this.skeletons.length < this.skeleCount + this.knight.skeleKilled*4) {
      let randX =  Math.floor(Math.random() * (96*16 - 70*16) + 70*16)
      let randY =  Math.floor(Math.random() * (47*16 - 33*16) + 33*16)
      newSkeletons.push(new Skeleton({x: randX,y:randY}, this.gameScene))
      newSkeletons.forEach(skeleton => {
        skeleton.addPhysics(this.knight)
        this.skeletons.push(skeleton)
      });
      this.gameScene.physics.add.collider(newSkeletons, [this.wallsLayer, this.upperWallsLayer, this.furnituresLayer, this.treesLayer])
    }
    return this.skeletons

  }
  #saveKnight(newStartMc){
    fetch("/main_characters", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newStartMc)
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }

}
