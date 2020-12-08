import Card from './Card'

export default class Cards {
  static COLORS = ["R", "B", "G"];
  static SETS = ["C", "D", "S", "H"];

  static VALUES = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  public hand: Array<Card>
  constructor(color: string = "R", sheet: PIXI.LoaderResource) {
    this.hand = [];
    for (var j = 0; j < Cards.SETS.length; j++) {
      for (var i = 0; i < Cards.VALUES.length; i++) {
        this.hand.push(new Card(Cards.SETS[j], Cards.VALUES[i], color, false, sheet));
      }
    }
    this.hand.push(new Card("J", 14, color, true, sheet));
    this.hand.push(new Card("J", 14, color, true, sheet));
    
  }
}
