/* 地图类 */
class Map{
    constructor() {
        this.map = null;
    }
    init (){
        this.map = new PIXI.extras.TilingSprite(
            PIXI.loader.resources['images/map2.jpg'].texture,
            $('.app').width(),
            $('.app').height()
        );
        return this.map;
    }
}