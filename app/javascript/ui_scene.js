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
    eventsCenter.addListener('update-score', this.#updateScore, this)

    // clean up when Scene is shutdown
    // this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   eventsCenter.off('score-count', this.updateCount, this)
    // })
  }

	#updateScore(score) {
		this.label.text = `Score: ${score}`
	}
}
