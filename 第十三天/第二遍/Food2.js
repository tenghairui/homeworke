/**
 * Created by admin on 2017/8/29.
 */
    //函数自调用  建立起架子  封装起这个吃的这个食物对象
(function (window) {
    var ele=[]
    //构建食物的构造函数
    //属性有：坐标x，y 颜色color 位置width height
    function Food(x,y,color,width,height){
        this.x=x||0;
        this.y=y||0;
        this.color=color||"blue";
        this.height=height||20
        this.width=width||20;
    }
    //原型,渲染出来render
    Food.prototype.render= function (map) {
        remove()
        //创造节点  也就是创造食物
        var odiv =document.createElement("div")


        //找出食物的坐标  向下取整  生成随机数
        this.x=Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width
        this.y=Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height
        //将他的坐标赋值给odiv
        odiv.style.left=this.x+"px";
        odiv.style.top=this.y+"px";
        odiv.style.position="absolute"
        //他的宽度===定义好的宽度
        odiv.style.height=this.height+"px"
        odiv.style.width=this.width+"px"
        odiv.style.backgroundColor=this.color
        map.appendChild(odiv)

        ele.push(odiv)

    }
    function remove(){
        for(var i=0;i<ele.length;i++){
            ele[i].parentNode.removeChild(ele[i])
        }
        ele=[]
    }
    window.Food=Food
})(window)