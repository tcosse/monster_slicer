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
import {Minotaurus} from 'minotaurus'
import {SelectCharacter} from 'select_character'
import { eventsCenter } from 'events_center'
import { Slime } from "slime"



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
    winUrl: String,
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
    minotaurusUrl: String,
    blueslimeUrl: String,
    minotaurusSound: String,
    backgroundSound: String,
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
    const minotaurusSound = this.minotaurusSoundValue
    const fireballUrl = this.fireballUrlValue
    const explosionUrl = this.explosionUrlValue
    const mcWindowUrl = this.mcWindowUrlValue
    const selectMcUrl = this.selectMcUrlValue
    const minotaurusUrl = this.minotaurusUrlValue
    const blueslimeUrl = this.blueslimeUrlValue
    this.gameoverUrl = this.gameoverValue
    const backgroundSound = this.backgroundSoundValue

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
      this.gameScene.load.spritesheet('minotaurus', minotaurusUrl, {frameWidth: 96, frameHeight:96})
      this.gameScene.load.spritesheet('blue_slime', blueslimeUrl, {frameWidth: 32, frameHeight:32})


      this.gameScene.load.audio("death_sound", deathSound)
      this.gameScene.load.audio("slash_sound", slashSound)
      this.gameScene.load.audio("coin_sound", coinSound)
      this.gameScene.load.audio("heal_sound", healSound)
      this.gameScene.load.audio("wilhelm_sound", wilhelmSound)
      this.gameScene.load.audio("spell_sound", spellSound)
      this.gameScene.load.audio("explosion_sound", explosionSound)
      this.gameScene.load.audio("ok_sound", okSound)
      this.gameScene.load.audio("minotaurus_sound", minotaurusSound)
      this.gameScene.load.audio("background_sound", backgroundSound)

    };

    // const skeleton_start =
    this.gameScene.create = () =>{
      console.log("loader: ", this)
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
        x: (12 * 16),
        y:  (10 * 16),
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
      this.skeleCount = 8
      this.gameScene.kills = lastSaveMc.kills
      this.gameScene.coinCount = lastSaveMc.coins
      this.gameScene.score = lastSaveMc.score
      this.knight = new Knight({x:lastSaveMc.x, y: lastSaveMc.y}, this.gameScene, lastSaveMc.health)

      this.minotaurusOne = new Minotaurus({x: 700, y: 1341}, this.gameScene)
      this.minotaurusOne.addPhysics(this.knight)

      this.minotaurusTwo = new Minotaurus({x: 800, y: 1341}, this.gameScene)
      this.minotaurusTwo.addPhysics(this.knight)

      this.slimes = this.#spawnSlimes()
      this.skeletons = this.#spawnSkeletons(this.skeleCount)
      console.log("spawned: ", this)
      console.log(this.knight.x)
      // this.gameScene.enemy.depth = 1;
      // this.gameScene.enemy.setScale(0.5,0.5)

      this.snake = new Snake({x: (46 * 16), y: (113 * 16)}, this.gameScene)
      this.snake.addPhysics(this.knight)
      this.snake.damageKnight(this.knight)
      this.snakeIsDead = false

      this.lastFireball = new Date() / 1000
      this.debutJeu = new Date() / 1000
      // dégats gratuits
      // this.knight.damage(Phaser.Math.Between(8, 9))

      // this.lastFireball = new Date() / 1000
      this.lastFireballFromBossroom = new Date() / 1000


      // gestion de la caméra
      // this.gameScene.cameras.main.setBounds(0, 0, 2000, 4000)
      this.gameScene.cameras.main.startFollow(this.knight);
      this.gameScene.cameras.main.setZoom(2)
      const characters = this.skeletons.concat(this.knight).concat(this.slimes)
      this.gameScene.physics.add.collider(characters, [this.wallsLayer, this.upperWallsLayer, this.furnituresLayer, this.treesLayer])
      // this.gameScene.physics.add.collider(fireball, [this.wallsLayer, this.upperWallsLayer, this.furnituresLayer, this.treesLayer])
      // const coinsLabel = this.gameScene.add.text(100, 100, '0', {
      //   fontSize: '100'
      // })

      // ajout de l'ui
      this.gameScene.scene.add('ui-scene', UIScene , true, {gameScene: this.gameScene} )

      console.log(this.snake)

      // bg music
      this.gameScene.backgroundSound.play()
      this.gameScene.backgroundSound.setLoop(true);
    }


    this.gameScene.update = () => {
      this.knight.update()
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
        // il faut donc arreter les updates
        this.gameScene.scene.stop();
        // this.gameScene.physics.world.disableUpdate()
      } else {
        this.skeletons.forEach(skeleton => skeleton.moveSkeleton(this.knight))
        this.slimes.forEach(slime => {slime.moveSlime()})
        this.minotaurusOne.moveMinotaurus(this.knight)
        this.minotaurusTwo.moveMinotaurus(this.knight)
        this.#checkSkeleton()
        this.#fireballSallePreBoss()
        if (this.snakeIsDead == false){
          this.snake.move(this.knight)
          this.snake.blinkingTail()

          this.snake.knightInBossRoom(this.knight)
          this.#timerThrowFireball()
          if (this.snake.getHealth() == 0) {
            this.snakeIsDead = true
            delete this.snake
            if(new Date() / 1000 - this.debutJeu > 10){
              this.debutJeu = new Date() / 1000
              setTimeout(() => {
                this.#saveKnight({x: 0, y: 0, health: 0, score: this.gameScene.score, kills: this.gameScene.kills, coins: this.gameScene.coinCount})
              }, "100");
              // redirect to win page
              setTimeout(() => {
                this.gameScene.scene.stop()
                window.location.replace(this.winUrlValue);
              }, "1000");
            }
          }
        } else {
          this.gameScene.cameras.main.fadeOut(400, 0, 0, 0)
          // this.gameScene.scene.pause();
        }
        if(this.gameScene.keyP.isDown || this.gameScene.keyEchap.isDown){
          this.gameScene.scene.switch('pauseScene');
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
        arcade: { debug: false }
      },
      fps: {
        target: 60,
        forceSetTimeOut: true
      },
    };
    let game = new Phaser.Game(config);
  }

  #spawnSkeletons(skeleCount){
    let skeletons1 = []
    for(let i = 0; i < skeleCount+2; i++) {
      let randX =  Math.floor(Math.random() * (65*16 - 43*16) + 43*16)
      let randY =  Math.floor(Math.random() * (41*16 - 27*16) + 27*16)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons1.push(skeleton)
    }
    skeletons1.forEach(skeleton => skeleton.addPhysics(this.knight))
    let skeletons2 = []
    for(let i = 0; i < skeleCount; i++) {
      let randX =  Math.floor(Math.random() * (96*16 - 70*16) + 70*16)
      let randY =  Math.floor(Math.random() * (47*16 - 33*16) + 33*16)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons2.push(skeleton)
    }
    skeletons2.forEach(skeleton => skeleton.addPhysics(this.knight))
    let skeletons3 = []
    for(let i = 0; i < skeleCount-2; i++) {
      let randX =  Math.floor(Math.random() * (78*16 - 65*16) + 65*16)
      let randY =  Math.floor(Math.random() * (63*16 - 53*16) + 53*16)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons3.push(skeleton)
    }
    skeletons3.forEach(skeleton => skeleton.addPhysics(this.knight))
    let skeletons4 = []
    for(let i = 0; i < skeleCount-8; i++) {
      let randX =  Math.floor(Math.random() * (56*16 - 37*16) + 37*16)
      let randY =  Math.floor(Math.random() * (89*16 - 61*16) + 61*16)
      let skeleton = new Skeleton({x: randX,y:randY}, this.gameScene)
      skeletons4.push(skeleton)
    }
    skeletons4.forEach(skeleton => skeleton.addPhysics(this.knight))
    let skeletons = skeletons1.concat(skeletons2).concat(skeletons3).concat(skeletons4)
    return skeletons
  }
  #checkSkeleton(){
    let newSkeletons = []
    while(this.skeletons.length < this.skeleCount + this.knight.skeleKilled*4) {
      let randX =  Math.floor(Math.random() * (39*16 - 22*16) + 22*16)
      let randY =  Math.floor(Math.random() * (46*16 - 36*16) + 36*16)
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
  #throwFireball() {
    // const previousVelocityX = this.snake.velocityX
    // const previousVelocityY = this.snake.velocityY
    this.snake.setTint(0xF24C3D)
    // this.snake.setVelocity(0,0)
    if(this.knight.y <= this.snake.y){
      this.directionFireball = ["top", "top_right", "top_left"]
    } else {
      this.directionFireball = ["bottom", "bottom_right", "bottom_left"]
    }
    // this.directionFireball = ["top", "top_right", "right", "bottom_right", "bottom", "bottom_left", "left", "top_left"]
    this.gameScene.time.delayedCall(2000, () => {
      for(let i=0; i<this.directionFireball.length; i++){
        const fireball = new Fireball({x: this.snake.x, y: this.snake.y}, this.gameScene, this.directionFireball[i], this)
        this.gameScene.physics.add.collider(fireball, [this.wallsLayer, this.upperWallsLayer, this.furnituresLayer, this.treesLayer])
      }
      this.snake.clearTint()
      // this.snake.setVelocity(previousVelocityX, previousVelocityY)
    })
  }
  #timerThrowFireball(){
    const now = new Date() / 1000
    if (this.lastFireball + 5 < now){
      this.#throwFireball()
      this.lastFireball = now
    }
  }
  #spawnSlimes(){
    let slimes = []
    for(let i = 0; i < 5; i++) {
      let randX =  Math.floor(Math.random() * (64*16 - 40*16) + 40*16)
      let randY =  Math.floor(Math.random() * (21*16 - 6*16) + 6*16)
      let slime = new Slime({x: randX,y:randY}, this.gameScene)
      slime.addPhysics(this.knight)
      slimes.push(slime)
    }
    return slimes
  }
  #fireballSallePreBoss(){
    const now = new Date() / 1000
    // il suffit de modifier le tableau dessous pour faire spawn les fireballs ailleurs
    const positionDepart = [[600, 1200, "right"], [600, 1100, "right"], [890, 1200, "left"], [890, 1100, "left"]]
    if (this.lastFireballFromBossroom + 1 < now){
      const position = positionDepart[Math.floor ( Math.random() * positionDepart.length )]
      this.lastFireballFromBossroom = now
      const fireball = new Fireball({x: position[0], y: position[1]}, this.gameScene, position[2], this)
    }
  }
}
