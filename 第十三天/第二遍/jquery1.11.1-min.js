/**
 * Created by admin on 2017/8/24.
 */
//              匀速封装

//ele  现在的位置  target要到达的位置
function aaa(ele,target){
    //清除定时器

    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        var step=target>ele.offsetLeft?10:-10;
        ele.style.left=ele.offsetLeft+step+"px";
        if(Math.abs(target-ele.offsetLeft)<=Math.abs(step)){
            ele.style.left=target+"px";
            clearInterval(ele.timer)
        }

    },13)

}

//缓动封装


//ele现在的位置  target是到哪
function bbb(ele,target) {
    //清除定时器
    clearInterval(ele.timer);
    //一人一个定时器
    ele.timer = setInterval(function () {
        var step = (r = target - ele.offsetLeft) / 10;
        //二次处理
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //赋值
        ele.style.left = ele.offsetLeft + step + "px"
        //取消定时器
        if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
            ele.style.left = target + "px"
            clearInterval(ele.timer)
        }

    }, 20)
}

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

