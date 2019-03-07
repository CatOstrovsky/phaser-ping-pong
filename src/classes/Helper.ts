import Config from "../const/config"
import ScoreManager from './ScoreManager'
import CoinsManager from './CoinsManager'

const frameSpaceBorder = 20;

export default class Helper {

	static DrawBestScore(ctx: Phaser.Scene) {
		let bestScore = ScoreManager.bestScore
		if(!bestScore) bestScore = 0

		ctx.add.dynamicBitmapText(Config.width - frameSpaceBorder, frameSpaceBorder, 'joystix', `лучший счет: ${bestScore}`, 20).setOrigin(1, .5);
	}

	static DrawCoins(ctx: Phaser.Scene) {
		ctx.add.image(frameSpaceBorder, frameSpaceBorder, 'coin').setOrigin(0, .5).setDisplaySize(30, 30);
    ctx.add.dynamicBitmapText(frameSpaceBorder + 40, frameSpaceBorder, 'joystix', `${CoinsManager.coins}`, 20).setOrigin(0, .5);
	}
}
