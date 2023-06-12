const loadAnimations = (gameScene) => {
  gameScene.anims.create({
    key:"skeleton_idle",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("enemy_skeleton_idle", {start: 0, end: 3}),
    repeat: -1,
  })
  gameScene.anims.create({
    key:"skeleton_dead",
    framerate:6,
    frames:gameScene.anims.generateFrameNumbers("enemy_skeleton_death", {start:0, end: 7}),
    repeat: 0,
    delay: 100
  })
  gameScene.anims.create({
    key: "idle",
    frameRate: 10,
    frames: gameScene.anims.generateFrameNumbers("knight_idle", { start: 0, end: 3 }),
    repeat: -1
  });
  gameScene.anims.create({
    key: "run",
    frameRate: 10,
    frames: gameScene.anims.generateFrameNumbers("knight_run", { start: 0, end: 5}),
    repeat: 0
  });
  gameScene.anims.create({
    key: "attack",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("knight_attack", { start: 0, end: 3 }),
    repeat: 0
  });
  //                  //
  /* new player anims */
  //                  //
  gameScene.anims.create({
    key: "idle_down",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 0, end: 5 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "idle_side",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 6, end: 11 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "idle_up",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 12, end: 17 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "walk_down",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 18, end: 23 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "walk_side",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 24, end: 29 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "walk_up",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 30, end: 35 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "attack_down",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 36, end: 39 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "attack_side",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 42, end: 45 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "attack_up",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 48, end: 51 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "death",
    frameRate: 15,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 54, end: 56 }),
    repeat: 0
  })
}
export {loadAnimations}


const loadSounds = (gameScene) => {
  gameScene.deathSound = gameScene.sound.add("death_sound")
  gameScene.slashSound = gameScene.sound.add("slash_sound")
}
export {loadSounds}
