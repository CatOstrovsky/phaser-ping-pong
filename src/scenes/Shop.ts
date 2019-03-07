/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2019 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import Helper from "../classes/Helper"
import CoinsManager from "../classes/CoinsManager"

interface ShopItem {
  image: string
  price: number
  gameElements: any
}

export class Shop extends Phaser.Scene {

  private keys: Phaser.Input.Keyboard.CursorKeys;
  private items: Array<ShopItem> = []
  private menuCaret: Phaser.GameObjects.Image;
  private activeMenuItem: number = 0;
  private btnLocked: boolean = false;

  constructor() {
    super({
      key: "Shop",
    });
  }

  create() : void {
    this.items = [
      {image : "sofa", price: 0, gameElements: {}},
      {image : "sofa_1", price: 100, gameElements: {}},
      {image : "sofa_2", price: 300, gameElements: {}},
      {image : "sofa_3", price: 700, gameElements: {}},
      {image : "sofa_4", price: 1600, gameElements: {}}
    ]

    this.add.dynamicBitmapText(Config.width/2, Config.height/2 - 80, 'joystix', 'Магазин диванов', 30).setOrigin(.5);

    Helper.DrawCoins(this);
    Helper.DrawBestScore(this);

    this.keys = this.input.keyboard.addKeys('right,left,shift');

    this.drawShopItems()
  }

  drawShopItems() : void {
    this.items.forEach((item:ShopItem, id) => {
      item.gameElements.image = this.add.image(id * 80 + 190, Config.height/2 + 20, item.image).setOrigin(0, .5)
      item.gameElements.price = this.add.dynamicBitmapText(item.gameElements.image.x + (item.gameElements.image.width/2), item.gameElements.image.y + 30 , 'joystix', `${item.price}`, 15).setOrigin(.5)
    })

    this.menuCaret = this.add.image(0, 0, 'arrow')
    this.setActiveMenu(0)
  }

  lockBtns() : void {
    this.btnLocked = true;
    setTimeout(() => this.btnLocked = false, 150);
  }

  setActiveMenu(id = 0) : void {
    this.activeMenuItem = (id > this.items.length-1) ? 0 : id;
    if(this.activeMenuItem < 0) this.activeMenuItem = this.items.length-1;

    let item = this.items[this.activeMenuItem];
    this.menuCaret.setPosition(item.gameElements.price.x - item.gameElements.price.width/2 - 20, item.gameElements.price.y);

  }

  buyItem() : void {
    let item = this.items[this.activeMenuItem];
    if(CoinsManager.coins < item.price) {
      alert("Нужно больше денег!")
    }else{
      // CoinsManager.coins = -(item.price)
      Helper.SetActiveHero(item.image)
      this.scene.start("Menu")
    }
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
          this.buyItem()
      }

    }

  }

}
