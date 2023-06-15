import * as Phaser from "phaser"

export class Slime extends Phaser.Physics.Arcade.Sprite {
  constructor(start, gameScene) {
    super(gameScene, start.x, start.y, 'slime_idle')
    this.start = start
    this.gameScene = gameScene

    // const healthBar = new HealthBar(
    //   gameScene,
    //   this.x - 20,
    //   this.y - 25,
    //   this.getMaxHealth(),
    //   6
    // );
    // healthBar.add(this);
    // this.healthBar = healthBar;

    gameScene.physics.add.world.enableBody(this, 0);
    gameScene.add.existing(this);
    this.setSize(20, 20)

    this.play('slime_idle', true);
    // this.object = this.gameScene.physics.add.sprite(start.x, start.y,'enemy_skeleton_idle')
  }

  moveSlime() {
    let directions = [10,0,-10]
    if(this.anims.currentAnim.key == "slime_idle"){
      let waitRandom = Math.random()
      if(waitRandom < 0.002 ){
        let X =  directions[Math.floor(Math.random() * directions.length)]
        let Y =  directions[Math.floor(Math.random() * directions.length)]
        this.setVelocity(X,Y)
        if(X < -1){
          this.flipX = true
        }
        else if (X > 1) {
          this.flipX = false
        }
        if(Math.random() < 0.5) {
          this.play('slime_jump1', true)
        }
        else {
          this.play('slime_jump2', true)
        }
        this.chain('slime_idle')
      }
      else{
        this.setVelocity(0,0)
      }

    }
  }

  addPhysics(knight) {
    this.gameScene.physics.add.overlap(knight, this, (gameObject1, gameObject2) => {
      knight.damage(0.01)
      knight.setTint(0xff6666)
      console.log("physics added ")
      this.gameScene.time.delayedCall(200, () => {knight.clearTint()});
    });
  }
}
