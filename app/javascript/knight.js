import * as Phaser from "phaser"

export class Knight extends Phaser.GameObjects.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'knight_idle')
    this.start = start
    this.gameScene = gameScene
    this.setScale(0.4,0.4)
    this.play("idle", true)
    this.depth = 1;

    var keyW = gameScene.input.keyboard.addKey('W')
    var keyZ = gameScene.input.keyboard.addKey('Z')
    var keyS = gameScene.input.keyboard.addKey('S')
    var keyA = gameScene.input.keyboard.addKey('A')
    var keyQ = gameScene.input.keyboard.addKey('Q')
    var keyD = gameScene.input.keyboard.addKey('D')
    var keyV = gameScene.input.keyboard.addKey('V')
    // var keyShift = this.gameScene.input.keyboard.addKey("shiftKey")
    console.log(keyW)

    if(keyW.isDown || keyA.isDown || keyS.isDown || keyD.isDown || keyV.isDown || keyZ.isDown || keyQ.isDown) {
      console.log(keyW.isDown)
      const defaultSpeed = 50;
      const highSpeed = 200;
      let speed = defaultSpeed ;

      // if (keyShift.isDown) { speed = highSpeed} else { speed = defaultSpeed}
      //if shiftkey is pressed, the knight speed will be higher

      if(keyW.isDown || keyZ.isDown) {
        // User wants to go up (presses W if english keyboard, Z for french)
        this.play('run', true)
        console.log(this)
        this.setVelocity(0, -speed);
      }
      else if(keyS.isDown) {
        // User wants to go down (presses S)
        this.setVelocity(0, speed);
        this.play('run', true)
      }

      if(keyA.isDown || keyQ.isDown) {
        // User wants to go left (presses Q in french keyboard, or A if english)
        this.play('run', true)
        this.setVelocity(-speed, 0);
        this.flipX = true
      }
      else if(keyD.isDown) {
        // User wants to go right (presses D)
        this.play('run', true)
        this.setVelocity(speed, 0);
        this.flipX = false
      }
      else if(keyV.isDown) {
        // User wants to go attack (presses V)
        this.play('attack', true)
        // console.log(this.anims.anims.entries.attack)
        this.anims.anims.entries.attack.type
      }
    }
    else {
      this.chain('idle', true)
      this.setVelocity(0,0)
    }
    gameScene.add.existing(this);
    this.setSize(50, 80)
    this.body.setOffset(40,50)
  }
}
