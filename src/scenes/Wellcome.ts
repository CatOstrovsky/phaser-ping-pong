/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import Helper from "../classes/Helper"

export class Wellcome extends Phaser.Scene {

  private menuButtons: Array<Phaser.GameObjects.DynamicBitmapText>  = [];
  private menuCaret: Phaser.GameObjects.Image;
  private activeMenuItem: number = 0;
  private btnLocked: boolean = false;

  private keys: Phaser.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: "wellcome",
    });
  }

  create() : void {
    let frameSpaceBorder = 20;

    this.add.dynamicBitmapText(Config.width/2, Config.height/2 - 80, 'joystix', 'пинг понг', 30).setOrigin(.5);

    Helper.DrawCoins(this);
    Helper.DrawBestScore(this);

    this.keys = this.input.keyboard.addKeys('up,down,shift');;

    this.drawMenu();
  }

  drawMenu() : void {
      let buttons = [
        "Игра",
        "Настройки",
        "Магазин"
      ]

      buttons.forEach((el, index) => {
        let item = this.add.dynamicBitmapText(Config.width/2, Config.height/2 + (index * 30), 'joystix', el, 20).setOrigin(.5);
        this.menuButtons.push(item)
      })

      this.menuCaret = this.add.image(0, 0, 'arrow')
      this.setActiveMenu(0)
  }

  setActiveMenu(id = 0) : void {
    this.activeMenuItem = (id > this.menuButtons.length-1) ? 0 : id;
    if(this.activeMenuItem < 0) this.activeMenuItem = this.menuButtons.length-1;

    let textObject = this.menuButtons[this.activeMenuItem];
    this.menuCaret.setPosition(textObject.x - textObject.width/2 - 20, textObject.y);

  }

  actionMenuButton() : void {
    //TODO: cases for all buttons and any actions
  }

  lockBtns() : void {
    this.btnLocked = true;
    setTimeout(() => this.btnLocked = false, 150);
  }

  update() : void {

    if(this.btnLocked == false) {

      if(this.keys.down.isDown) {
        this.setActiveMenu(this.activeMenuItem + 1)
        this.lockBtns()
      }else if(this.keys.up.isDown) {
        this.setActiveMenu(this.activeMenuItem - 1)
        this.lockBtns()
      }else if(this.keys.shift.isDown) {
        this.actionMenuButton()
      }

    }

  }

}
