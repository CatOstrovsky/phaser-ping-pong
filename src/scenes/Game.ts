/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2019 web-panda
 * @license      CatOstrovsky
 */
interface GameSceneParams {
  level: number;
}

import Config from "../const/config"
import Helper from "../classes/Helper"
import Enemy from '../objects/Enemy'
import ScoreManager from '../classes/ScoreManager'

export class GameScene extends Phaser.Scene {

  private keys: Phaser.Input.Keyboard.CursorKeys
  private GameScrore: Array<Phaser.GameObjects.DynamicBitmapText> = []
  private ball: Phaser.Physics.Impact.ImpactImage
  private player: Phaser.Physics.Impact.ImpactImage
  private enemy: Enemy
  private scores:Array<any> = [0,0]
  private totalScoreObject: Phaser.GameObjects.DynamicBitmapText

  private maxPlayerSpeed: number = 280

  constructor() {
    super({
      key: "Game",
      physics: {
        default: 'impact',
        impact: {
            gravity: 0,
            debug: false,
            maxVelocity: 500,
            debugBodyColor: 0xff00ff
        }
      }
    });
  }

  create(params: GameSceneParams) : void {
    // reset local vars
    this.scores = [0,0]
    this.GameScrore = []
    this.totalScoreObject = null
    
    this.impact.world.setBounds(20, 60, Config.width - 40, Config.height - 80);

    Helper.DrawCoins(this);
    Helper.DrawBestScore(this);

    this.drawStage()
    this.drawGameScore()
    this.drawTotalScore()

    this.player = this.impact.add.image(50, (Config.height-80)/2, 'sofa').setRotation(1.55)
    this.player.setActiveCollision()
    this.player.setFixedCollision()

    this.keys = this.input.keyboard.addKeys('up,down');
    this.enemy = new Enemy(this)
    this.resetBall()

    this.enemy.maxSpeed += params.level * 80;

  }

  drawTotalScore() : void {
    if(!this.totalScoreObject)
      this.totalScoreObject = this.add.dynamicBitmapText( Config.width/2 , 20, 'joystix', "", 20).setOrigin(.5)

    this.totalScoreObject.setText(`${ScoreManager.score}`)
  }

  drawGameScore() : void {
    this.GameScrore.push( this.add.dynamicBitmapText( Config.width/2 - 50, 80, 'joystix', "0", 20).setOrigin(.5) );
    this.GameScrore.push( this.add.dynamicBitmapText( Config.width/2 + 50, 80, 'joystix', "0", 20).setOrigin(.5) );
  }

  drawStage() : void {
    let graphics = this.add.graphics();

    var color = 0xffffff;
    var thickness = 2;
    var alpha = 1;

    graphics.lineStyle(thickness, color, alpha);
    graphics.strokeRect(20, 60, Config.width - 40, Config.height - 80);

    graphics.lineStyle(thickness, color, .2);
    graphics.beginPath();
    graphics.moveTo(Config.width/2, 60);
    graphics.lineTo(Config.width/2, Config.height - 20);
    graphics.closePath().strokePath();

  }

  resetBall(velocityTo: number = -1) : void {

    if(this.ball) this.ball.destroy();

    this.ball = this.impact.add.image( Config.width/2, (Config.height-80) / 2, 'ball')
    this.ball.setActiveCollision()
    this.ball.setBounce(1)

    this.ball.setVelocity(velocityTo * 300, Phaser.Math.Between(-200, 200))

    this.enemy.setBall(this.ball);
  }

  addScore(player:number = 0) {
    this.scores[player] += 1
    this.GameScrore[player].setText(`${this.scores[player]}`)

    if(this.scores[player] >= 10) {
      if(player == 0) {
        alert("Вы проиграли!")
      }else{
        alert("Вы победили!")
      }

      this.scene.start("Menu")
      ScoreManager.EndGame();
    }
  }

  update(delta) : void {

    ScoreManager.score = 1;
    this.drawTotalScore()

    if(this.enemy) this.enemy.update(delta);

    if(this.keys.up.isDown && this.player.y >= 100)
      this.player.setVelocityY(-(this.maxPlayerSpeed))
    else if(this.keys.down.isDown && this.player.y <= Config.height-55)
      this.player.setVelocityY(this.maxPlayerSpeed)
    else
      this.player.setVelocityY(0)

    if(this.ball.x >= Config.width - 50) {
      this.addScore(1)
      this.resetBall(-1)
    }else if(this.ball.x <= 50) {
      this.addScore(0)
      this.resetBall(1)
    }
  }

}
