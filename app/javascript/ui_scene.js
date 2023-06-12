import * as Phaser from 'phaser'
import { eventsCenter } from 'events_center'

export class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

  create() {

    this.label = this.add.text(10, 10, 'Score: 0', {
      fontFamily: 'VT323',
      fontSize: 50,
    })

    // listen to 'update-score' event and call `updateCount()
    // when it fires
    eventsCenter.on('update-score', this.#updateScore)

    // clean up when Scene is shutdown
    // this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   eventsCenter.off('score-count', this.updateCount, this)
    // })
  }

	#updateScore(score) {
    console.log(this.label)
    console.log('update score : ', score)
		// this.label.text = `Score: ${score}`
	}
}
