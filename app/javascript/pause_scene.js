import * as Phaser from "phaser"
import PhaserHealth from 'phaser_health';

export class PauseScene extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    init(){
      // console.log(this.scene.settings.data)
      this.gameScene = this.scene.settings.data.gameScene
      this.bgUrl = this.scene.settings.data.bgUrl
      this.controller = this.scene.settings.data.controller
    }

    preload ()
    {
        this.load.image('pause_bg', this.bgUrl);
    }

    create ()
    {
        this.add.image(400, 300, 'pause_bg').setAlpha(1);

        let labelResume = this.add.text(150, 150, 'RESUME', { color: '#00ff00', fontSize: '40px' });
        labelResume.setInteractive();
        let labelSave = this.add.text(150, 300, 'SAVE', { color: '#00ff00', fontSize: '40px'  });
        labelSave.setInteractive();

        this.input.on('gameobjectover', (pointer, obj) =>
        {
          obj.setColor('#ff00ff');
        });

        this.input.on('gameobjectout', (pointer, obj) =>
        {
          obj.setColor('#00ff00');
        });

        this.input.on('gameobjectdown', (pointer, obj) =>
        {
          if(obj.text == "SAVE"){
            console.log(this.controller.knight)
            console.log(this.gameScene.coinCount)
            this.#saveScene(this.controller.knight, this.gameScene)
          } else if (obj.text == "RESUME"){
            console.log("OK")
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              this.scene.switch('Game'); // Game est la clef de gameScene
            })
          }
        });
    }

    #saveScene(knight, gameScene){
      const mainCharacter = {
        x: knight.x,
        y: knight.y,
        health: knight.getHealth(),
        coins: gameScene.coinCount,
        kills: gameScene.kills,
        score: gameScene.score,
      };

      fetch("/main_characters", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mainCharacter)
      }).then(res => {
        console.log("Request complete! response:", res);
      });
    }
}
