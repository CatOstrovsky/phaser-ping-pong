export const LOCALSTORAGE_BEST_SCORE = "LOCALSTORAGE_BEST_SCORE";

export default class ScoreManager{
  protected static _score:number = 0

  public static get score():number {
    return ScoreManager._score
  }
  public static set score(value:number) {
    ScoreManager._score += value
  }

  protected static _bestScore: number = parseInt(window.localStorage.getItem(LOCALSTORAGE_BEST_SCORE))

  public static  get bestScore(): number {
    return this._bestScore
  }
  public static set bestScore(value: number) {
    this._bestScore = value
    window.localStorage.setItem(LOCALSTORAGE_BEST_SCORE, `${this._bestScore}`)
  }

  public static EndGame() {
    if(!ScoreManager.bestScore || ScoreManager.bestScore < ScoreManager.score)
      ScoreManager.bestScore = ScoreManager.score;

    ScoreManager.score = -(ScoreManager.score)
  }
}
