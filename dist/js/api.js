"use strict";var DOMAIN="http://47.94.17.117:3000/game";function updataRankinglist(t,n,e){t<1||$.post(DOMAIN+"/top/updata",{name:n,coin:t},function(t,n){1===t.code&&getRankinglist(function(t){e&&e(t)})})}function getRankinglist(a){$.get(DOMAIN+"/top/rankingList",function(t,n){var e;"success"===n&&1===t.code&&($(".ranking-list").html(""),e="",t.data.forEach(function(t,n){e+="<tr>\n                    <td class='cup'>"+(2<n?n+1:"")+"</td>\n                    <td>"+t.user+"</td>\n                    <td>"+t.coin+"</td>\n                    <td>"+t.date+"</td>\n                </tr>"}),sessionStorage.setItem("rankinglist",JSON.stringify(t.data)),$(".ranking-list").append(e),a&&a(t.data))})}$(function(){if(getRankinglist(),!localStorage.getItem("_userinfo")){for(var getRandomChineseWord=function getRandomChineseWord(){var _rsl="",_randomUniCode=Math.floor(20902*Math.random()+19968).toString(16);return eval('_rsl="\\u'+_randomUniCode+'"'),_rsl},name="",i=0;i<3;i++)name+=getRandomChineseWord();localStorage.setItem("_userinfo",name)}$("#userName").val(localStorage.getItem("_userinfo")),$("#submit").click(function(t){$.get(DOMAIN+"/users/set?name="+$("#userName").val(),function(t,n){"success"!==!n&&(0==t.data.use?(localStorage.setItem("_userinfo",$("#userName").val()),_Main.userName=$("#userName").val(),toast("修改成功")):toast("用户名已使用"))})}),$.get(DOMAIN+"/users/visit?name="+localStorage.getItem("_userinfo"),function(t){})});