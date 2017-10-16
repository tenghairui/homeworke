/**
 * Created by admin on 2017/8/30.
 */
(function (window, Food, Snake) {
    //构建游戏的构建函数
    function Game(map) {
        this.Food = new Food();
        this.Snake = new Snake();
        this.map = map
    }

    //原型    让他们一起执行
    Game.prototype.start = function (map) {
        //渲染这个页面
        this.Food.render(this.map)
        this.Snake.render(this.map);
        //让蛇走起来  所以要加定时器实现
        runSnake.apply(this)
        bindKey.apply(this)
    }
    //直接给他私有方法就好
    function runSnake() {
        //this的指向在定时器中是发生错误的  所以用that代替
        //添加定时器 让蛇开始动起来
        var timer = setInterval(function () {
            this.Snake.move(this.Food, this.map);
            this.Snake.render(this.map)
            //获取蛇头的坐标
            var headx = this.Snake.body[0].x * this.Snake.width;
            var heady = this.Snake.body[0].y * this.Snake.height;
            //获取蛇和页面的最大距离
            var maxx = this.map.offsetWidth - this.Snake.width;
            var maxy = this.map.offsetHeight - this.Snake.height;
            //进行判断  如果蛇头撞见了页面的边缘 那么游戏结束
            if (headx < 0 || headx > maxx) {
                //定时器结束  游戏结束
                clearInterval(timer)
                alert("game over")
            }
            if (heady < 0 || heady > maxy) {
                clearInterval(timer);
                alert("game over")
            }

        }.bind(this), 200)
    }

    //建立按键的私有方法  用按键来控制蛇的方向direction
    function bindKey(that) {
        document.addEventListener("keydown", function (event) {
            event = event || event
            switch (event.keyCode) {
                case 37:
                    this.Snake.direction = "left"
                    break
                case 38:
                    this.Snake.direction = "up"
                    break
                case 39:
                    this.Snake.direction = "right"
                    break
                case 40:
                    this.Snake.direction = "down"
                    break
            }

        }.bind(this))
    }

    window.Game = Game
})(window,Food, Snake)