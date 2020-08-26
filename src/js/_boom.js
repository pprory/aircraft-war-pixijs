class Boom{
    constructor() {
        this.boom = null;
    }
    play (x,y){
        let _frames = su.filmstrip('images/boom.png', 64, 64);
        this.boom = new PIXI.extras.AnimatedSprite(_frames);
        this.boom.position.x = x;
        this.boom.position.y = y;
        this.boom.width = 87;
        this.boom.height = 87;
        this.boom.animationSpeed = 0.26;
        this.boom.anchor.x = 0.5;
        this.boom.anchor.y = 0.5;
        this.boom.play();
        return this.boom;         
    }    
}