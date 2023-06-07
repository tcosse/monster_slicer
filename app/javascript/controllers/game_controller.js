import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
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

      this.load.spritesheet('enemy_skeleton', skeletonImageUrl, {frameWidth: 16, frameHeight: 16})
      this.load.spritesheet('knight_idle', knightImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.load.spritesheet('knight_run', knightRunImageUrl, { frameWidth: 128 , frameHeight: 128 })
      this.load.spritesheet('knight_attack', knightAttackImageUrl, { frameWidth: 128 , frameHeight: 128 })

      console.log(skeletonImageUrl)

    };


    const enemy_start = [330, 180]
    const skeleton_start = [180,180]
    gameScene.create = function(){
      this.anims.create({
        key:"skeleton_idle",
        frameRate: 6,
        frames: this.anims.generateFrameNumbers("enemy_skeleton", {start: 0, end: 4}),
        repeat: -1
      })

      this.anims.create({
        key:"skeleton_dead",
        framerate:6,
        frames:this.anims.generateFrameNumbers("enemy_skeleton", {start:5, end: 12}),
        repeat: 0
      })
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
        repeat: 0
      });
      this.anims.create({
        key: "attack",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("knight_attack", { start: 0, end: 4 }),
        repeat: 0
      });


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


      //this.player = this.physics.add.image(10,180, 'player').setCollideWorldBounds(true);
      this.skeleton = this.physics.add.sprite(180, 180,'enemy_skeleton')
      this.knight = this.physics.add.sprite(100,100,'knight_idle')
      this.knight.depth = 1;
      if(this.skeleton != null) {
        this.skeleton.play('skeleton_idle');
      }

      //this.physics.add.existing(this.skeleton)

      // this.enemy = this.physics.add.image(enemy_start[0], enemy_start[1], 'enemy').setCollideWorldBounds(true);
      this.physics.add.overlap(this.knight, this.skeleton, (gameObject1, gameObject2) => {
          if (gameScene.input.keyboard.addKey("V").isDown) {
            this.skeleton.play("skeleton_dead", true)
            this.skeleton.setVelocity(0,0)
            this.skeleton.on('animationcomplete',()=> {
            this.skeleton.destroy()
            });
          }
      });

      // this.enemy.depth = 1;
      // this.enemy.setScale(0.5,0.5)
      this.skeleton.depth=1;
      this.knight.setScale(0.4,0.4)
      // this.knight.body.setSize(this.knight.width, this.knight.height * 0.8)
      this.knight.body.offset.y = 32
      this.skeleton.setScale(2,2)
      this.cameras.main.setBounds(0, 0, 2000, 4000)
      this.cameras.main.startFollow(this.knight);

      console.log(wallLayer)
      // this.knight.setCollideWorldBounds(true)
      // this.physics.world.addCollider(this.knight, wallLayer)
      const collider = this.physics.add.collider(this.knight, wallLayer)
      console.log(collider)
      this.physics.add.collider(this.knight, this.skeleton)

    };

    gameScene.update = function() {
      var keyW = gameScene.input.keyboard.addKey('W')
      var keyZ = gameScene.input.keyboard.addKey('Z')
      var keyS = gameScene.input.keyboard.addKey('S')
      var keyA = gameScene.input.keyboard.addKey('A')
      var keyQ = gameScene.input.keyboard.addKey('Q')
      var keyD = gameScene.input.keyboard.addKey('D')
      var keyV = gameScene.input.keyboard.addKey('V')
      // var keySpace = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      var keyShift = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
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
          console.log(this.anims.anims.entries.attack)
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

    };

    let config = {
      type: Phaser.AUTO,
      width: 360,
      height: 360,
      scene: gameScene,
      physics: {
        default: 'arcade',
        arcade: { debug: true }
      }
    };



    let game = new Phaser.Game(config);

  }


}
