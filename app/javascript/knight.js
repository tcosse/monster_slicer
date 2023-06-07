// import { Phaser } from "phaser"

export class Knight {
  constructor(start, gameScene) {
    this.start = start
    this.gameScene = gameScene
    this.object = this.gameScene.physics.add.sprite(start.x, start.y, 'knight_idle').setSize(50, 80).setOffset(40,50)
    this.object.setScale(0.4,0.4)
    this.object.play("idle", true)
    this.object.depth = 1;
    
    var keyW = this.gameScene.input.keyboard.addKey('W')
    var keyZ = this.gameScene.input.keyboard.addKey('Z')
    var keyS = this.gameScene.input.keyboard.addKey('S')
    var keyA = this.gameScene.input.keyboard.addKey('A')
    var keyQ = this.gameScene.input.keyboard.addKey('Q')
    var keyD = this.gameScene.input.keyboard.addKey('D')
    var keyV = this.gameScene.input.keyboard.addKey('V')
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
        this.object.play('run', true)
        console.log(this.object)
        this.object.setVelocity(0, -speed);
      }
      else if(keyS.isDown) {
        // User wants to go down (presses S)
        this.object.setVelocity(0, speed);
        this.object.play('run', true)
      }

      if(keyA.isDown || keyQ.isDown) {
        // User wants to go left (presses Q in french keyboard, or A if english)
        this.object.play('run', true)
        this.object.setVelocity(-speed, 0);
        this.object.flipX = true
      }
      else if(keyD.isDown) {
        // User wants to go right (presses D)
        this.object.play('run', true)
        this.object.setVelocity(speed, 0);
        this.object.flipX = false
      }
      else if(keyV.isDown) {
        // User wants to go attack (presses V)
        this.object.play('attack', true)
        // console.log(this.anims.anims.entries.attack)
        this.anims.anims.entries.attack.type
      }
    }
    else {
      this.object.chain('idle', true)
      this.object.setVelocity(0,0)
    }

  }
}
