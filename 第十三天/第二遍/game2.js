/**
 * Created by admin on 2017/8/30.
 */
(function (window, Food, Snake) {
    //������Ϸ�Ĺ�������
    function Game(map) {
        this.Food = new Food();
        this.Snake = new Snake();
        this.map = map
    }

    //ԭ��    ������һ��ִ��
    Game.prototype.start = function (map) {
        //��Ⱦ���ҳ��
        this.Food.render(this.map)
        this.Snake.render(this.map);
        //����������  ����Ҫ�Ӷ�ʱ��ʵ��
        runSnake.apply(this)
        bindKey.apply(this)
    }
    //ֱ�Ӹ���˽�з����ͺ�
    function runSnake() {
        //this��ָ���ڶ�ʱ�����Ƿ��������  ������that����
        //��Ӷ�ʱ�� ���߿�ʼ������
        var timer = setInterval(function () {
            this.Snake.move(this.Food, this.map);
            this.Snake.render(this.map)
            //��ȡ��ͷ������
            var headx = this.Snake.body[0].x * this.Snake.width;
            var heady = this.Snake.body[0].y * this.Snake.height;
            //��ȡ�ߺ�ҳ���������
            var maxx = this.map.offsetWidth - this.Snake.width;
            var maxy = this.map.offsetHeight - this.Snake.height;
            //�����ж�  �����ͷײ����ҳ��ı�Ե ��ô��Ϸ����
            if (headx < 0 || headx > maxx) {
                //��ʱ������  ��Ϸ����
                clearInterval(timer)
                alert("game over")
            }
            if (heady < 0 || heady > maxy) {
                clearInterval(timer);
                alert("game over")
            }

        }.bind(this), 200)
    }

    //����������˽�з���  �ð����������ߵķ���direction
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