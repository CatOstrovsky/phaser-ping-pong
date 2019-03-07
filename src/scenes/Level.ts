/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2019 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import Helper from "../classes/Helper"

export class Level extends Phaser.Scene {

  private menuButtons: Array<Phaser.GameObjects.DynamicBitmapText>  = [];
  private menuCaret: Phaser.GameObjects.Image;
  private activeMenuItem: number = 0;
  private btnLocked: boolean = false;

  private keys: Phaser.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: "Level",
    });
  }

  create() : void {
    this.add.dynamicBitmapText(Config.width/2, Config.height/2 - 80, 'joystix', 'выберите сложность', 30).setOrigin(.5);

    Helper.DrawCoins(this);
    Helper.DrawBestScore(this);

    this.keys = this.input.keyboard.addKeys('right,left,shift');

    this.drawLevels();
  }

  drawLevels() : void {
    let buttons = [
      "Легко",
      "Нормально",
      "Сложно"
    ]

    let lastX = 0;
    buttons.forEach((el, index) => {
      let item = this.add.dynamicBitmapText( 160 + lastX, Config.height/2 + 20, 'joystix', el, 20).setOrigin(0, .5);
      this.menuButtons.push(item)
      lastX += item.width + 50;
    })

    this.menuCaret = this.add.image(0, 0, 'arrow').setRotation(4.7)
    this.setActiveMenu(0)
  }

  setActiveMenu(id = 0) : void {
    this.activeMenuItem = (id > this.menuButtons.length-1) ? 0 : id;
    if(this.activeMenuItem < 0) this.activeMenuItem = this.menuButtons.length-1;

    let textObject = this.menuButtons[this.activeMenuItem];
    this.menuCaret.setPosition(textObject.x + textObject.width / 2, textObject.y + 30);

  }

  actionMenuButton() : void {
    this.sound.play('select')
    this.scene.start("Game", {level: this.activeMenuItem});
  }

  lockBtns() : void {
    this.sound.play('bump-1')
    this.btnLocked = true;
    setTimeout(() => this.btnLocked = false, 150);
  }

  update() : void {

    if(this.btnLocked == false) {

      if(this.keys.right.isDown) {
        this.setActiveMenu(this.activeMenuItem + 1)
        this.lockBtns()
      }else if(this.keys.left.isDown) {
        this.setActiveMenu(this.activeMenuItem - 1)
        this.lockBtns()
      }else if(this.keys.shift.isDown) {
        this.actionMenuButton()
      }

    }

  }

}
