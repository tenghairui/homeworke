/**
 * Created by admin on 2017/8/24.
 */
//封装一个方法：获取浏览器可视区域的宽;
function clientWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
}
function clientHeight(){
    return window.innerHeight || document.documentElement.clientHeight;
}


//封装获取页面被遮挡的顶部和左侧部分,页面卷起的封装
function scrollTop(){
    return window.pageYOffset || document.documentElement.scrollTop;
}
function scrollLeft(){
    return window.pageXOffset || document.documentElement.scrollLeft;
}


//显示和隐藏
function show(ele){     //盒子显示
    ele.style.display = "block";
}
function hide(ele){ //盒子隐藏
    ele.style.display = "none";
}

