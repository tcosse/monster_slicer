import * as Phaser from 'phaser'
import { eventsCenter } from 'events_center'

export class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

  create() {
    this.skeletonKillsLabel = this.add.text(10, 20,'', {
      fontFamily: 'VT323',
      fontSize: 30,
    })

    this.coinCountLabel = this.add.text(10, 50, '', {
      fontFamily: 'VT323',
      fontSize: 30,
    })

    this.scoreLabel = this.add.text(640, 20, '', {
      fontFamily: 'VT323',
      fontSize: 30,
    })

    eventsCenter.addListener('update-skeleton-kills', this.#updateSkeletonsKilled, this)
    eventsCenter.addListener('update-coint-count', this.#updateCoinCount, this)
    eventsCenter.addListener('update-score', this.#updateScore, this)

    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-skeleton-kills', this.#updateSkeletonsKilled, this)
      eventsCenter.off('update-coint-count', this.#updateCoinCount, this)
      eventsCenter.off('update-score', this.#updateScore, this)
    })
  }

	#updateSkeletonsKilled(skeletonsKilled) {
		this.skeletonKillsLabel.text = `Kills : ${skeletonsKilled}`
	}

  #updateCoinCount(coinCount) {
		this.coinCountLabel.text = `Coins : ${coinCount}`
	}

  #updateScore(score) {
		this.scoreLabel.text = `Score : ${score}`
	}
}
