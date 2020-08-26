/* 雪花类 */
class Snow{
    constructor(){
        this.snow = null;
    }
    renderer (x,y,r,alpha){
        this.snow = new PIXI.Graphics();
        this.snow.beginFill(0xFFFFFF,alpha);
        this.snow.drawCircle(10,10,r);
        this.snow.endFill();
        this.snow.x = x;
        this.snow.y = y;
        app.stage.addChild(this.snow);
        this.snow.ResetPosition = this.ResetPosition;
        return this.snow;
    }
    rendererSnow (x,y,r,alpha){
        this.snow = new PIXI.Sprite(PIXI.loader.resources['images/snow.png'].texture);
        this.snow.x = x;
        this.snow.y = y;
        this.snow.width = r;
        this.snow.height = r;
        this.snow.alpha = alpha;
        this.snow.anchor.x=0.5;
        this.snow.anchor.y=0.5;
        this.snow.ResetPosition = this.ResetPosition;
        return this.snow;
    }
    ResetPosition (item){
        if(item.x<-10){
            item.x = Math.random()*$('.app').width();
            item.y = -50;
        }
        if(item.y>$('.app').height()){
            item.x = Math.random()*$('.app').width();
            item.y = -50;
        }
    }
}


