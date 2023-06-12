import * as Phaser from "phaser"


export class CoinCount extends Phaser.GameObjects.Text {
  constructor(gameScene){
    super(gameScene, 100, 120, "0", { font: "20px calibri", fill: "black", align:"center" })
    this.style = { font: '10px', fill: "black", align:"center", backgroundColor: "white" }
    this.gameScene = gameScene
    this.totalScore = 0;
  }

  showScore() {
    const x = this.x - (11 * 16)
    const y = this.y - (10 * 16)
    // console.log('text', this.score)
    if (this.score != undefined) {
      this.score.destroy()
    }
    const score = this.gameScene.add.text(x, y, `${this.totalScore} Coins`, this.style);
    this.score = score
    // console.log('text 2', this.score)
    // console.log(this.text)
  }

  addPoint(number) {
    this.totalScore += number
  }


}
