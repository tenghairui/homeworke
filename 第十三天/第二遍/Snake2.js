/**
 * Created by admin on 2017/8/29.
 */
(function (window, Food) {
    //构建蛇的构建函数
    var ele = []
    //蛇的属性有  width  height 默认方向direction  蛇身body（一节头  两节身子)
    function Snake(width, height, direction) {
        this.width = width || 20
        this.height = height || 20
        this.direction = direction || "right"

        //蛇身用数组来完成
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ]
    }

    Snake.prototype.render = function (map) {

        remove()
        //根据蛇身来进行循环;
        //在蛇尾开始遍历所以要倒着遍历进行更改
        for (var i = 0; i < this.body.length; i++) {
            //创造节点  创造蛇
            var odiv = document.createElement("div");

            odiv.style.width = this.width + "px";
            odiv.style.height = this.height + "px";
            odiv.style.position = "absolute";
            odiv.style.left = this.body[i].x * this.width + "px"
            odiv.style.top = this.body[i].y * this.height + "px";
            odiv.style.backgroundColor = this.body[i].color;

            map.appendChild(odiv)
            ele.push(odiv)
        }
    }
    function remove() {
        for (var i = 0; i < ele.length; i++) {
            ele[i].parentNode.removeChild(ele[i]);
        }
        ele = []
    }

    Snake.prototype.move = function (food, map) {
        //身子开始算起所以在后边开始计算  所以是倒循环
        for (var i = this.body.length - 1; i > 0; i--) {
            //身子的坐标向前推近1  才算是让蛇开始走
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        //蛇往那边走取决于头  头往那边走取决于方向  所以以方向进行判断
        switch (this.direction) {
            case "left":
                this.body[0].x = this.body[0].x - 1;
                break
            case "right":
                this.body[0].x = this.body[0].x + 1;
                break
            case "up":
                this.body[0].y = this.body[0].y - 1;
                break
            case "down":
                this.body[0].y = this.body[0].y + 1;
        }
        //获取头的坐标
        var headx = this.body[0].x * this.width;
        var heady = this.body[0].y * this.height;



        if (headx == food.x && heady == food.y) {
            //如果碰到了食物自身增加一个单位
            //把最后一个蛇身先存起来
            var last = this.body[this.body.length - 1]
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            //如果蛇吧食物吃没有了。那么食物应该删除，重新生成一个食物
            food.render(map);
        }
    }
    window.Snake = Snake
})(window, Food)