export default class Card {
    public static SET_VALUE
        = { 'D': 20, 'S': 40, 'H': 60, 'C': 80, 'J': 0 };

    public set: string
    public value: number
    public sortValue: number
    public color: string
    public isJocker: boolean
    constructor(set: string, value: number, color: string, isJocker: boolean = false) {
        this.set = set;
        this.value = value;
        this.color = color
        this.isJocker = isJocker
        this.sortValue = this.value + Card.SET_VALUE[set]
    }
}