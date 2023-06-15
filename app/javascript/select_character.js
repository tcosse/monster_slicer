import * as Phaser from "phaser"
import { loadAnimations } from "game_loader"
import {Knight} from "knight"

export class SelectCharacter extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    init(){
      this.bgUrl = this.scene.settings.data.bgUrl
      this.mcUrl = this.scene.settings.data.mcUrl
      this.mcWindowUrl = this.scene.settings.data.mcWindowUrl
      this.gameScene = this.scene.settings.data.gameScene
      // this.controller = this.scene.settings.data.controller
    }

    preload ()
    {
        this.load.image('select_MC_bg', this.bgUrl);
        this.load.image('mc_window', this.mcWindowUrl);
        this.load.spritesheet('player_all', this.mcUrl, {frameWidth: 48, frameHeight:48})
    }

    create ()
    {
        this.bgImage = this.add.image(400, 400, 'select_MC_bg')
        this.bgImage.setOrigin(.5, .5);
        // Based on your game size, it may "stretch" and distort.
        this.bgImage.displayWidth = this.sys.canvas.width;
        this.bgImage.displayHeight = this.sys.canvas.height;

        this.mcWindow = this.add.image(0, 0, 'mc_window')
        this.mcWindow.setScale(0.75, 0.85)
        this.mcWindow.x = 130
        this.mcWindow.y = 591
        this.mcWindow.setInteractive()


        this.knight = new Knight({x:130, y: 630}, this, 50)
        this.knight.play("idle_down", true)
        this.knight.setScale(5,5)


        // let labelSelect = this.add.text(130, 650, 'SELECT', { color: '#00ff00', fontSize: '40px' });
        // labelSelect.setInteractive();
        // arg du setInteractive qui ne marche pas : { hitArea: new Phaser.Geom.Rectangle(100, 400, 300, 700), hitAreaCallback: Phaser.Geom.Rectangle.Contains}
        // labelSelect.visible = false;

        // this.input.keyboard.once('keydown-SPACE', () => {
        //   // fade to black
        //   this.cameras.main.fadeOut(1000, 0, 0, 0)
        // })

        // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        //   this.scene.start('phaser-logo')
        // })

        this.input.on('pointerdown', (pointer, obj) =>
        {
          console.log(obj)
          console.log(this.mcWindow)
          if(obj[0].type == this.mcWindow.type){
            console.log("OK")
            this.gameScene.okSound.play()
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              this.scene.start('ui-scene')
              this.scene.switch('Game'); // Game est la clef de gameScene
            })

          }
        });


        /* this.input.on('gameobjectover', (pointer, obj) =>
        {
          obj.setColor('#ff00ff');
        });

        this.input.on('gameobjectout', (pointer, obj) =>
        {
          obj.setColor('#00ff00');
        });

        this.input.on('gameobjectdown', (pointer, obj) =>
        {
          if(obj.text == "SELECT"){
            this.scene.start('ui-scene')
            this.scene.switch('Game'); // Game est la clef de gameScene
          }
        }); */
    }
    update(){
      this.knight.x = 130
      this.knight.y = 630
      this.knight.healthBar.bg.x = 2000
      this.knight.healthBar.bg.y = 2000
      this.knight.healthBar.bar.x = 2000
      this.knight.healthBar.bar.y = 2000
    }
}
