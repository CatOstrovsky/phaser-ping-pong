/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2019 web-panda
 * @description  Setup game
 * @license      CatOstrovsky
 */

// Add basic phaser namespaces
/// <reference path="../typescript/phaser.d.ts"/>

import "phaser";
import { Boot } from './scenes/Boot'
import { Menu } from './scenes/Menu'
import { Shop } from './scenes/Shop'
import { Level } from './scenes/Level'
import { GameScene } from './scenes/Game'
import Config from './const/config'

const config: GameConfig = {
  ...Config,
  scene: [Boot, Menu, Level, GameScene, Shop]
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
