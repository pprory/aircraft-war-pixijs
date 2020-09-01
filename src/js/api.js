$(function(){

   
    getRankinglist();
    /* 设置用户名 */
    if(!localStorage.getItem('_userinfo')){
        let name = '';
        function getRandomChineseWord () {
            var _rsl = "";
            var _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
            eval("_rsl=" + '"\\u' + _randomUniCode + '"');
            return _rsl;
        }
        for(let i=0;i<3;i++){
            name+=getRandomChineseWord()
        }
        localStorage.setItem('_userinfo',name);
    }
    $('#userName').val(localStorage.getItem('_userinfo'));
    // 点击修改用户名
    $('#submit').click(res=>{
        $.get('http://47.94.17.117/game/users/set?name='+$('#userName').val(), ( res, status) =>{
            if(!status === 'success') return
            if(res.data.use == 0){
                localStorage.setItem('_userinfo',$('#userName').val())
                _Main.userName = $('#userName').val()
                toast('修改成功');
            }else{
                toast('用户名已使用');
            }
        })
    })
    // 访问量
    $.get('http://47.94.17.117/game/users/visit?name='+localStorage.getItem('_userinfo'),(res)=>{})
})
function updataRankinglist(value,name,fn){
    if(value<1)return
    $.post('http://47.94.17.117/game/top/updata',{'name':name,'coin':value}, ( res, status) =>{
        if(res.code === 1){
            getRankinglist(function(data){
                if(fn)fn(data);
            });
        }
    })
}
function getRankinglist(fn){
    /* 获取排行榜数据 */
    $.get('http://47.94.17.117/game/top/rankingList', (res, status) =>{
        if(status === 'success' && res.code === 1){
            $('.ranking-list').html('');
            let wrapper_tr = '';
            res.data.forEach(( item ,index) => {
                wrapper_tr += `<tr>
                    <td class='cup'>${index>2?index+1:''}</td>
                    <td>${item.user}</td>
                    <td>${item.coin}</td>
                    <td>${item.date}</td>
                </tr>`;
            });
            sessionStorage.setItem('rankinglist',JSON.stringify(res.data));
            $('.ranking-list').append(wrapper_tr);
            if(fn)fn(res.data);
        }
    })
}
/* 
http://47.94.17.117/game/top/rankingList  获取排行榜数据
http://47.94.17.117/game/top/updata  更新排行榜数据
http://47.94.17.117/game/users/set?name=34 查看用户名是否已使用
*/
