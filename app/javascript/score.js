import * as Phaser from "phaser"


export class Score extends Phaser.GameObjects.Text {
  constructor(gameScene){
    super(gameScene, 100, 120, "0", { font: "60px calibri", fill: "black", align:"center" })
    this.style = ""
    this.gameScene = gameScene
    this.totalScore = 0;
  }


  showScore() {
    const score = game.add.text(20, 20, `${this.totalScore} Points`, this.style);
  }

  addPoint(number) {
    this.totalScore += number
  }


}
