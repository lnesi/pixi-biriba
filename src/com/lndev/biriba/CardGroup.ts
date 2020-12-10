// import Card from './Card'

// export default class CardGroup {
//     public hand: Array<Card>
//     constructor(cards: Array<Card> = []) {
//         this.hand = cards;
//     }
//     public take(index = 0) {
//         var card = this.hand[index];
//         if (index === 0) {
//             this.hand.shift();
//         } else {
//             this.hand.slice(index, index + 1);
//         }
//         return card;
//     }
//     public shuffle() {
//         var currentIndex = this.hand.length,
//             temporaryValue,
//             randomIndex;

//         // While there remain elements to shuffle...
//         while (0 !== currentIndex) {
//             // Pick a remaining element...
//             randomIndex = Math.floor(Math.random() * currentIndex);
//             currentIndex -= 1;

//             // And swap it with the current element.
//             temporaryValue = this.hand[currentIndex];
//             this.hand[currentIndex] = this.hand[randomIndex];
//             this.hand[randomIndex] = temporaryValue;
//         }

//         return this.hand;
//     }
//     public sort() {
//         this.hand = this.hand.sort((a: Card, b: Card) => {
//             return a.sortValue - b.sortValue
//         });
//     }
//     discard(card) {

//         this.hand.splice(this.hand.indexOf(card), 1)
//     }
//     public faceDownAll() {
//         this.hand.forEach((card) => { card.faceDown() })
//     }
//     public unselectAll(){
//         this.hand.forEach((card) => { card.selected=false })
//     }
// }
