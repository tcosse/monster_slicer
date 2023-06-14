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

  gameScene.anims.create({
    key: 'coin_rotate',
    frames: gameScene.anims.generateFrameNumbers("coin", { start: 0, end: 4 }),
    frameRate: 6,
    repeat: -1
  })




  //                  //
  /* new player anims */
  //                  //
  gameScene.anims.create({
    key: "idle_down",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 0, end: 5 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "idle_side",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 6, end: 11 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "idle_up",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 12, end: 17 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "walk_down",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 18, end: 23 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "walk_side",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 24, end: 29 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "walk_up",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 30, end: 35 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "attack_down",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 36, end: 39 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "attack_side",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 42, end: 45 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "attack_up",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 48, end: 51 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "death",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 54, end: 56 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "throw_down",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 60, end: 63 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "throw_side",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 66, end: 69 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "throw_up",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("player_all", { start: 72, end: 75 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "spell",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("spell", { start: 0, end: 2 }),
    repeat: -1
  })


  //                    //
  /* new Skeleton anims */
  //                    //

  gameScene.anims.create({
    key: "skeleton_idle_new",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("skeleton_all", { start: 0, end: 5 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "skeleton_walk_new",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("skeleton_all", { start: 6, end: 11 }),
    repeat: -1
  })
  gameScene.anims.create({
    key: "skeleton_attack_new",
    frameRate: 4,
    frames: gameScene.anims.generateFrameNumbers("skeleton_all", { start: 12, end: 16 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "skeleton_death_new",
    frameRate: 6,
    frames: gameScene.anims.generateFrameNumbers("skeleton_all", { start: 24, end: 28 }),
    repeat: 0
  })

  //                     //
  /* Boss fireball anims */
  //                     //

  gameScene.anims.create({
    key: "fireball_left",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 0, end: 7 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_top_left",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 8, end: 15 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_top",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 16, end: 23 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_top_right",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 24, end: 31 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_right",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 32, end: 39 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_bottom_rigth",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 40, end: 47 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_bottom",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 48, end: 55 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_bottom_left",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("fireball", { start: 56, end: 63 }),
    repeat: 0
  })
  gameScene.anims.create({
    key: "fireball_explosion",
    frameRate: 8,
    frames: gameScene.anims.generateFrameNumbers("explosion", { start: 0, end: 12 }),
    repeat: 0
  })

}
export {loadAnimations}


const loadSounds = (gameScene) => {
  gameScene.deathSound = gameScene.sound.add("death_sound")
  gameScene.slashSound = gameScene.sound.add("slash_sound")
  gameScene.coinSound = gameScene.sound.add("coin_sound")
  gameScene.healSound = gameScene.sound.add("heal_sound")
  gameScene.wilhelmSound = gameScene.sound.add("wilhelm_sound")
  gameScene.spellSound = gameScene.sound.add("spell_sound")
  gameScene.explosionSound = gameScene.sound.add("explosion_sound")
}
export {loadSounds}
