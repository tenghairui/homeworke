/**
 * Created by admin on 2017/8/29.
 */
(function (window, Food) {
    //�����ߵĹ�������
    var ele = []
    //�ߵ�������  width  height Ĭ�Ϸ���direction  ����body��һ��ͷ  ��������)
    function Snake(width, height, direction) {
        this.width = width || 20
        this.height = height || 20
        this.direction = direction || "right"

        //���������������
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ]
    }

    Snake.prototype.render = function (map) {

        remove()
        //��������������ѭ��;
        //����β��ʼ��������Ҫ���ű������и���
        for (var i = 0; i < this.body.length; i++) {
            //����ڵ�  ������
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
        //���ӿ�ʼ���������ں�߿�ʼ����  �����ǵ�ѭ��
        for (var i = this.body.length - 1; i > 0; i--) {
            //���ӵ�������ǰ�ƽ�1  ���������߿�ʼ��
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        //�����Ǳ���ȡ����ͷ  ͷ���Ǳ���ȡ���ڷ���  �����Է�������ж�
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
        //��ȡͷ������
        var headx = this.body[0].x * this.width;
        var heady = this.body[0].y * this.height;



        if (headx == food.x && heady == food.y) {
            //���������ʳ����������һ����λ
            //�����һ�������ȴ�����
            var last = this.body[this.body.length - 1]
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            //����߰�ʳ���û���ˡ���ôʳ��Ӧ��ɾ������������һ��ʳ��
            food.render(map);
        }
    }
    window.Snake = Snake
})(window, Food)