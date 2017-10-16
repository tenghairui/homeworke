/**
 * Created by admin on 2017/8/29.
 */
    //函数子调用  建立架子  封装起来这个食物对象
(function (window) {
    //建立一个数组 。放入页面食物
    var ele=[];
    //巴食物抽象成对象  构建函数
    function Food(x,y,width,height,color){
        this.x=x||0
        this.y=y||0;
        this.width=width||20;
        this.height=height||20;
        this.color=color||"green"

    }

    function rnadColor(){
        return "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
    }

    Food.prototype.render= function (map) {
        //食物被吃掉之前要将原来的食物删除
        remove()


        var Odiv=document.createElement("div")

        this.x=Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width
        this.y=Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height
        Odiv.style.left=this.x+"px";
        Odiv.style.top=this.y+"px";

        Odiv.style.position="absolute"

        Odiv.style.width=this.width+"px"
        Odiv.style.height=this.height+"px";
        this.color=rnadColor()
            Odiv.style.backgroundColor=this.color
        map.appendChild(Odiv)
        //将这个放食物的页面放到数组中
        ele.push(Odiv)
    }
//属于当前环境里的食物私有方法
    function remove(){
        for(var i=0;i<ele.length;i++){
            ele[i].parentNode.removeChild(ele[i]);
        }
        ele=[]

    }
    //将食物暴漏在外边
    window.Food=Food
})(window)
