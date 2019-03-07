/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2019 web-panda
 * @license      CatOstrovsky
 */

import Config from "../const/config"
import Helper from "../classes/Helper"

export default class Enemy {
  private scene: Phaser.Scene;
  private hero: Phaser.Physics.Impact.ImpactImage
  private ball: Phaser.Physics.Impact.ImpactImage
  public maxSpeed: number = 150
  private prevDelta: number = 0
  private moveInterval: number = 200

  constructor (scene) {
    this.scene = scene

    this.hero = this.scene.impact.add.image(Config.width - 50, (Config.height-80)/2, 'sofa').setRotation(1.55)
    this.hero.setActiveCollision()
    this.hero.setFixedCollision()

    this.hero.on("update", this.update)
  }

  setBall(ball) {
    this.ball = ball
  }

  public update (delta)
  {
    if(this.ball && delta > this.prevDelta + this.moveInterval) {

      this.prevDelta = delta;

      if(this.ball.y > this.hero.y)
        this.hero.setVelocityY(this.maxSpeed)
      else if(this.ball.y < this.hero.y)
        this.hero.setVelocityY(-(this.maxSpeed))
      else
        this.hero.setVelocity(0)

    }
  }

}
