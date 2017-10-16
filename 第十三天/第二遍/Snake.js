/**
 * Created by admin on 2017/8/29.
 */
(function (window, Food) {
    //建立一个数组  来放蛇身部分
    var ele=[]
    //构建蛇身函数
    //把蛇抽象成一个对象
    //蛇身属性有：高（height） 宽（width） 默认方向  身分为头和身子（body身子默认为一个头两个身）
    //direction 方向
    function Snake(height,width,direction){
        this.height=height||20
        this.width=width||20;
        this.direction=direction||"right"
        //身分为头和身子（body身子默认为一个头两个身）
        this.body=[
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"orange"},
            {x:1,y:2,color:"orange"},
        ]
    }
    function ccColor(){
        return "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
    }
    //render渲染,吧蛇身渲染出来
    Snake.prototype.render= function (map) {

        //渲染之前先删去原来的蛇
        remove()

        //根据蛇的身体来循环生成蛇
        for(var i=0;i<this.body.length;i++){
            var odiv=document.createElement("div");
            if(i==0){
                odiv.style.zIndex=2
            }
            odiv.style.width=this.width+"px";
            odiv.style.height=this.height+"px";
            odiv.style.position="absolute";
            odiv.style.left=this.body[i].x*this.width+"px"
            odiv.style.top=this.body[i].y*this.height+"px"
            this.body[i].color=ccColor()
            odiv.style.backgroundColor=this.body[i].color;

            map.appendChild(odiv)
            ele.push(odiv)
        }
    }
    //建立一个私有的方法成员  用来删除页面上原有的蛇的身题
    function remove(){
        for(var i=0;i<ele.length;i++){
            ele[i].parentNode.removeChild(ele[i]);
        }
        ele=[]
    }
    Snake.prototype.move= function (food,map) {
        for(var i=this.body.length-1;i>0;i--){
            //身子的坐标向前推近1  才算是让蛇开始走
            this.body[i].x=this.body[i-1].x
            this.body[i].y=this.body[i-1].y
        }
        //往哪走取决于头，而头往那走取决于方向。所以进行判断
        switch(this.direction){
            case "left":
                this.body[0].x=this.body[0].x-1
                break
            case "right":
                this.body[0].x=this.body[0].x+1
                break
            case "up":
                this.body[0].y=this.body[0].y-1
                break
            case "down":
                this.body[0].y=this.body[0].y+1
                break
        }
        // 获取一下当前的蛇的头部坐标
        var headx=this.body[0].x*this.width
        var heady=this.body[0].y*this.height
        //判断蛇头有没有碰到食物  碰到的话  食物消失  然后蛇自身增加一个单位
        //console.log(food)
        if(headx==food.x&&heady==food.y){
            //如果碰到了食物自身增加一个单位
            //把最后一个蛇身先存起来
            var last = this.body[this.body.length-1]
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            })
            //如果蛇吧食物吃没有了。那么食物应该删除，重新生成一个食物
            food.render(map);
        }
    }
    window.Snake=Snake


})(window,Food)
