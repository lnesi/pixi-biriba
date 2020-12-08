import TweenMax from 'gsap'
export default class Card {
    public static SET_VALUE
        = { 'D': 20, 'S': 40, 'H': 60, 'C': 80, 'J': 0 };

    public set: string
    public value: number
    public sortValue: number
    public color: string
    public isJocker: boolean
    public Object: PIXI.Container;
    public FrontFace: PIXI.Sprite;
    public BackFace: PIXI.Sprite;
    

    constructor(set: string, value: number, color: string, isJocker: boolean = false, sheet: PIXI.LoaderResource) {
        this.set = set;
        this.value = value;
        this.color = color
        this.isJocker = isJocker
        this.sortValue = this.value + Card.SET_VALUE[set]
        this.Object = new PIXI.Container;
        this.FrontFace = new PIXI.Sprite(
            sheet.textures[
            "card" + set + value + ".png"
            ]
        );
        this.BackFace = new PIXI.Sprite(
            sheet.textures[
            "cardBackColor" + color + ".png"
            ]
        );
        this.Object.addChild(this.FrontFace);
        this.Object.scale.x = .5
        this.Object.scale.y = .5
        this.Object.interactive=true;
        this.Object.addListener('click',this.handlerClick.bind(this))
    }
    public handlerClick(e){
       this.Object.parent.emit('CARD_CLICK',this);
    }
    public faceDown() {
        this.Object.removeChildAt[0];
        this.Object.addChild(this.BackFace)
    }
    public faceUp() {
        this.Object.removeChildAt[0];
        this.Object.addChild(this.FrontFace)
    }
    public moveTo(x: number, y: number, delay: number) {
        TweenMax.to(this.Object,0.5,{x:x,y:y,delay:delay/1000})
    }
    

}