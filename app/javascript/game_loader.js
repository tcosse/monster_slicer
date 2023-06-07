const loadAnimations = (gameScene) => {
  gameScene.anims.create({
    key:"skeleton_idle",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("enemy_skeleton", {start: 0, end: 4}),
    repeat: -1,
  })

  gameScene.anims.create({
    key:"skeleton_dead",
    framerate:6,
    frames:gameScene.anims.generateFrameNumbers("enemy_skeleton", {start:5, end: 12}),
    repeat: 0,
    delay: 100
  })
  gameScene.anims.create({
    key: "idle",
    frameRate: 10,
    frames: gameScene.anims.generateFrameNumbers("knight_idle", { start: 0, end: 4 }),
    repeat: -1
  });
  gameScene.anims.create({
    key: "run",
    frameRate: 10,
    frames: gameScene.anims.generateFrameNumbers("knight_run", { start: 0, end: 2 }),
    repeat: 0
  });
  gameScene.anims.create({
    key: "attack",
    frameRate: 10,
    frames: gameScene.anims.generateFrameNumbers("knight_attack", { start: 0, end: 4 }),
    repeat: 0
  });

}
export {loadAnimations}