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
    }

    preload ()
    {
        this.load.image('pause_bg', this.bgUrl);
    }

    create ()
    {
        this.add.image(400, 300, 'pause_bg').setAlpha(1);

        let labelResume = this.add.text(150, 150, "RESUME", { color: '#00ff00' });
        labelResume.setInteractive();
        let labelSave = this.add.text(150, 300, "SAVE", { color: '#00ff00' });
        labelSave.setInteractive();

        this.input.on('gameobjectover', (pointer, obj) =>
        {
          obj.setColor('#ff00ff');
        });

        this.input.on('gameobjectout', (pointer, obj) =>
        {
          obj.setColor('#00ff00');
        });

        this.input.on('pointerdown', (pointer, obj) =>
        {
          console.log(obj)
          if(obj.text == "SAVE"){
            // save des choses
            this.#saveKnight(this.gameScene.knight)
          } else if (obj.text == "RESUME"){
            this.gameScene.scene.switch('Game'); // Game est la clef de gameScene
          }
        });
    }

    #saveKnight(knight){
      localStorage.setItem('hero_checkpoint', JSON.stringify({
        x: knight.x,
        y: knight.y,
        health: knight.getHealth()
      }));
    }
}
