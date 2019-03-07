/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2019 web-panda
 * @description  Boot game scene. Gift is preloader :)
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot"
    });
  }

  preload() : void {
    this.load.audio('bump', ['assets/audio/bump.mp3']);
    this.load.audio('bump-1', ['assets/audio/bump-1.mp3']);
    this.load.audio('cash', ['assets/audio/cash.mp3']);
    this.load.audio('select', ['assets/audio/select.mp3']);
    this.load.audio('auch', ['assets/audio/auch.mp3']);
    this.load.audio('lose', ['assets/audio/lose.mp3']);
    this.load.audio('win', ['assets/audio/win.mp3']);

    this.load.image('coin', 'assets/images/coin.png')

    this.load.image('sofa', 'assets/images/sofa.png')
    this.load.image('sofa_1', 'assets/images/sofa_1.png')
    this.load.image('sofa_2', 'assets/images/sofa_2.png')
    this.load.image('sofa_3', 'assets/images/sofa_3.png')
    this.load.image('sofa_4', 'assets/images/sofa_4.png')

    this.load.image('ball', 'assets/images/ball.png')
    this.load.image('arrow', 'assets/images/arrow.png')
    this.load.bitmapFont('joystix', 'assets/fonts/joystix.png', 'assets/fonts/joystix.fnt')

    this.drawProgress();
  }

  drawProgress() : void {
    var progress = this.add.graphics();
    let bootText = this.add.text(Config.width/2,Config.height/2, "Load assets...", {color: "#ffffff", fontSize: "30px" }).setOrigin(.5,.5);

    var onProgress = (value:number) : void => {
        progress.clear();
        let progressProcent = parseInt(`${value*100}`);
        bootText.setText(`${progressProcent}%`)
        progress.fillStyle(0x484848, 1);
        progress.fillRect(0, 0, Config.width , Config.height * value);
    }

    this.load.on('progress', (value) : void => {
        onProgress(value);
    });
  }

  create() : void {

  	this.scene.start('Menu');

  }

}
