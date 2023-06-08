import * as Phaser from "phaser"

export class Knight extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'knight_idle')
    this.start = start
    this.gameScene = gameScene
    gameScene.physics.add.world.enableBody(this, 0);
    this.setScale(0.4,0.4)
    this.play("idle", true)
    this.depth = 1;
    this.setSize(50, 80)
    this.setOffset(40,50)
    this.depth = 1;
    gameScene.add.existing(this);
  }

  update () {
    var keyW = this.gameScene.input.keyboard.addKey('W')
    var keyZ = this.gameScene.input.keyboard.addKey('Z')
    var keyS = this.gameScene.input.keyboard.addKey('S')
    var keyA = this.gameScene.input.keyboard.addKey('A')
    var keyQ = this.gameScene.input.keyboard.addKey('Q')
    var keyD = this.gameScene.input.keyboard.addKey('D')
    var keyV = this.gameScene.input.keyboard.addKey('V')
    // var keyShift = this.this.gameScene.input.keyboard.addKey("shiftKey")

    if(keyW.isDown || keyA.isDown || keyS.isDown || keyD.isDown || keyV.isDown || keyZ.isDown || keyQ.isDown) {
      const defaultSpeed = 50;
      const highSpeed = 200;
      let speed = defaultSpeed ;

      // if (keyShift.isDown) { speed = highSpeed} else { speed = defaultSpeed}
      //if shiftkey is pressed, the knight speed will be higher

      if(keyW.isDown || keyZ.isDown) {
        // User wants to go up (presses W if english keyboard, Z for french)
        this.play('run', true)
        this.setVelocityY(-speed);
      }
      else if(keyS.isDown) {
        // User wants to go down (presses S)
        this.setVelocityY(speed);
        this.play('run', true)
      }

      if(keyA.isDown || keyQ.isDown) {
        // User wants to go left (presses Q in french keyboard, or A if english)
        this.play('run', true)
        this.setVelocityX(-speed);
        this.flipX = true
      }
      else if(keyD.isDown) {
        // User wants to go right (presses D)
        this.play('run', true)
        this.setVelocityX(speed);
        this.flipX = false
      }
      else if(keyV.isDown) {
        // User wants to go attack (presses V)
        this.play('attack', true)
        console.log(this.gameScene.anims.anims)
        this.gameScene.anims.anims.entries.attack.type
      }
    }
    else {
      this.chain('idle', true)
      this.setVelocity(0,0)
    }
  }
}
