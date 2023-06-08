export class Skeleton {
  constructor(start, gameScene) {
    this.start = start
    this.gameScene = gameScene
    this.object = this.gameScene.physics.add.sprite(start.x, start.y,'enemy_skeleton')
  }
  #calculateDistance(objectA, objectB) {
    return Math.sqrt((objectA.x-objectB.x)**2 + (objectA.y-objectB.y)**2)
  }

  moveSkeleton(knight){
    var skeleton_speed = 30;
    var distance_between = this.#calculateDistance(knight, this.object)
    // var skeleton_start_distance = Math.sqrt((skeleton_start[0]-this.object.x)**2 + (skeleton_start[1]-this.object.y)**2)
    var skeleton_start_distance = this.#calculateDistance(this.start, this.object)

    if(this.object.scene != undefined) {
      if(this.object.anims.currentAnim.key == "skeleton_dead") {
        this.object.setVelocity(0,0)
      }
      else {
        if(distance_between < 100) {
          this.object.setVelocity(skeleton_speed*(knight.x-this.object.x)/distance_between, skeleton_speed*(knight.y-this.object.y)/distance_between);
        }
        else {
          if(this.object.x != this.start.x && this.object.y != this.start.y) {
            this.object.setVelocity(skeleton_speed*(this.start.x-this.object.x)/skeleton_start_distance, skeleton_speed*(this.start.y-this.object.y)/distance_between);
          }
        }
      }
    }
  }

  addPhysics(knight) {
    if(this.object != null) {
      this.object.play('skeleton_idle');
    }
    this.object.depth=1;
    this.object.setScale(2,2)
    // console.log(knight)
    //this.gameScene.physics.add.existing(this.object)

    // this.gameScene.enemy = this.gameScene.physics.add.image(enemy_start[0], enemy_start[1], 'enemy').setCollideWorldBounds(true);
    this.gameScene.physics.add.overlap(knight, this.object, (gameObject1, gameObject2) =>
    {
        if (this.gameScene.input.keyboard.addKey("V").isDown) {
          this.object.play("skeleton_dead", true)
          this.object.setVelocity(0,0)
          this.object.on('animationcomplete',()=> {
          this.object.destroy()
          });
        }
    });
  }
}
