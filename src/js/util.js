/* 键盘绑定 */
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };
    return key;
}
/* 碰撞检测 */
//The `hitTestRectangle` function
function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false;
  
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2; 
    r1.centerY = r1.y + r1.height / 2; 
    r2.centerX = r2.x + r2.width / 2; 
    r2.centerY = r2.y + r2.height / 2; 
  
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
  
      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
  
        //There's definitely a collision happening
        hit = true;
      } else {
  
        //There's no collision on the y axis
        hit = false;
      }
    } else {
  
      //There's no collision on the x axis
      hit = false;
    }
  
    //`hit` will be either `true` or `false`
    return hit;
  };

let _toast = document.createElement('div');
$(function(){
  document.body.appendChild(_toast);
})
function toast(content,bgColor='rgba(255,255,255,1)',fontColor='green'){
  _toast.innerHTML = content;
  _toast.style.cssText = `
    text-align:center;
    color:${fontColor};
    position:fixed;
    top:28%;
    left:50%;
    transform: translateX(-50%) skewX(-8deg);
    background: ${bgColor};
    padding:6px 18px;
    font-size:14px;
  `
  $(_toast).fadeIn();
  // document.body.appendChild(_toast);

  setTimeout(()=>{
    $(_toast).fadeOut();
  },2000)
}


/* 计算排名进行提示 */
function calcRankingList(coin){
  if(coin<5) return
  if(coin % 15 === 0){
      let data = JSON.parse(sessionStorage.getItem('rankinglist'));
      data.push({
        user:_Main.userName,
        coin:coin,
        flag:true
      })
      data.sort(function(a,b){
        return b.coin - a.coin
      })
      data.forEach((item,index)=>{
        if(item.flag && index!==0){
          toast(`距前一名[<span style='color:#b00101'>${data[index-1].user}</span>][<span style='color:#b00101'>${data[index-1].coin - coin}</span>]分,<br/>继续加油!`);
        }
        if(index===0){
          toast(`恭喜你,当前排名第一！超越第二[${coin - data[index+1].coin}]分`);
        }
      })
  }
}