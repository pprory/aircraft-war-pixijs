/* 子弹类 */
class Bullet{
    constructor() {
        this.bullet = null;
    }
    init (
        texture = new PIXI.Sprite(PIXI.loader.resources['images/bullet.png'].texture),
        w = 62 / 2,
        h = 128 / 2,
        y = -18,
        x = -1,
        r = 0)
        {
        this.bullet = texture;
        this.bullet.width = w ;
        this.bullet.height = h;
        this.bullet.vy = y;
        this.bullet.vx = x;
        this.bullet.rotation = r ;
        this.bullet.isDest = false;
        return this.bullet;
    }
}
