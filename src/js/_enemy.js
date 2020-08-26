/* 敌机 */
class Enemy{
    constructor(){
        this.enemy=null;
    }
    init (x,y){
        let frames = su.filmstrip('images/enemy1.png', 87, 123);
        this.enemy = new PIXI.extras.AnimatedSprite(frames);
        this.enemy.position.x = x;
        this.enemy.position.y = y;
        // this.enemy.vy = 5;
        this.enemy.vy = 1;
        this.enemy.vx = 0;
        this.enemy.health = 2;
        this.enemy.animationSpeed = 0.6;
        this.enemy.play();
        // this.enemy.anchor.x = 0.5;
        // this.enemy.anchor.y = 0.5;
        /* 创建子弹池 */
        return this.enemy;
    }
}
