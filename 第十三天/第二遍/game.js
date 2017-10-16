/**
 * Created by admin on 2017/8/29.
 */
(function (window,Food,Snake) {
    function Game(map){
        this.Food=new Food();
        this.Snake=new Snake();
        this.map=map;
    }
    Game.prototype.start= function (map) {
        this.Food.render(this.map);
        this.Snake.render(this.map)
        //蛇运动；
//            console.log(this)
        runSnake(this);
        bindKey(this)
    }
    function runSnake(that){
        //添加定时器  让蛇开始运动
        var timer =setInterval(function () {
//                console.log(that.Food,this.Fond)
            that.Snake.move(that.Food,that.map);
            that.Snake.render(that.map);
            //获取蛇头的坐标
            var headx=that.Snake.body[0].x*that.Snake.width;
            var heady=that.Snake.body[0].y*that.Snake.height;
            //蛇身与页面的最大值  用页面大小-蛇的大小
            var maxx=that.map.offsetWidth-that.Snake.width;
            var maxy=that.map.offsetHeight-that.Snake.height;
//                console.log(headx,heady,maxx,maxy)
            //进行判断  如果蛇头撞到了页面的边缘  那么游戏结束
            if(headx<0||headx>maxx){
                clearInterval(timer)
                alert("game over")
            }
            if(heady<0||heady>maxy){
                clearInterval(timer)
                alert("game over")
            }
        },200)
    }
    //建立按键的私有方法  用按键来控制蛇的方向direction
    function bindKey(that){
        document.addEventListener("keydown", function (event) {
            event=event||event
            switch (event.keyCode){
                case 37:
                    that.Snake.direction="left"
                    break
                case 38:
                    that.Snake.direction="up"
                    break
                case 39:
                    that.Snake.direction="right"
                    break
                case 40:
                    that.Snake.direction="down"
                    break
            }

        })
    }
    window.Game=Game
})(window,Food,Snake)
