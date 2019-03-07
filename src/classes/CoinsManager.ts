export const COINS = "COINS";

export default class CoinsManager{
  protected static _coins: number = parseInt(window.localStorage.getItem(COINS))

  public static  get coins(): number {
    if(!this._coins) return 0;

    return this._coins
  }
  
  public static set coins(value: number) {
    if(!this._coins) this._coins = 0

    this._coins += value
    window.localStorage.setItem(COINS, `${this._coins}`)
  }
}
