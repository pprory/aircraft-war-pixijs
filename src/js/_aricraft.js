
/* 飞机类 */
class Aricraft{
    constructor(){
        this.Aricraft = null;
    }
    init (){
        this.Aricraft = new PIXI.Sprite(PIXI.loader.resources['images/ace.png'].texture);
        this.Aricraft.vx = 0;
        this.Aricraft.vy = 0;
        this.Aricraft.isInvincible = false;  //无敌
        this.bindKeyboard();
        return this.Aricraft;
    }
    bindKeyboard (){
        let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown"),
        space = keyboard(" ");
        left.press = () => {
            this.Aricraft.vx = -8;
            this.Aricraft.vy = 0;
            
        };
        left.release = () => {
            if (!right.isDown && this.Aricraft.vy === 0) {
                this.Aricraft.vx = 0;
            }
        };
        //Up
        up.press = () => {
            this.Aricraft.vy = -8;
            this.Aricraft.vx = 0;
        
        };
        up.release = () => {
            if (!down.isDown && this.Aricraft.vx === 0) {
                this.Aricraft.vy = 0;
            }
        };

        //Right
        right.press = () => {
            this.Aricraft.vx = 8;
            this.Aricraft.vy = 0;
            
        };
        right.release = () => {
            if (!left.isDown && this.Aricraft.vy === 0) {
                this.Aricraft.vx = 0;
            }
        };

        //Down
        down.press = () => {
            this.Aricraft.vy = 8;
            this.Aricraft.vx = 0;
        };
        down.release = () => {
            if (!up.isDown && this.Aricraft.vx === 0) {
                this.Aricraft.vy = 0;
            }
        };

        // space 
        space.press = () => {
            _Main.createBullet();
        }
    }
    /* 开启无敌模式 */
    setInvincible(color = 16278562.9266627){
        this.Aricraft.isInvincible = true;
        let params = {
            alpha:1
        }
        TweenMax.to(params,0.18,{
            alpha:0.3,
            repeat:11,
            // ease:Bounce.easeOut,
            onUpdate:()=>{
                this.Aricraft.alpha = params.alpha;
            },
            yoyo:true,
            yoyoEase:true
        });
        this.Aricraft.tint = color;
        setTimeout(()=>{
            this.Aricraft.isInvincible = false;
            this.Aricraft.tint = 0xFFFFFF;
        },2000)
    }
}
