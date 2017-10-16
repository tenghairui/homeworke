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
        //���˶���
//            console.log(this)
        runSnake(this);
        bindKey(this)
    }
    function runSnake(that){
        //��Ӷ�ʱ��  ���߿�ʼ�˶�
        var timer =setInterval(function () {
//                console.log(that.Food,this.Fond)
            that.Snake.move(that.Food,that.map);
            that.Snake.render(that.map);
            //��ȡ��ͷ������
            var headx=that.Snake.body[0].x*that.Snake.width;
            var heady=that.Snake.body[0].y*that.Snake.height;
            //������ҳ������ֵ  ��ҳ���С-�ߵĴ�С
            var maxx=that.map.offsetWidth-that.Snake.width;
            var maxy=that.map.offsetHeight-that.Snake.height;
//                console.log(headx,heady,maxx,maxy)
            //�����ж�  �����ͷײ����ҳ��ı�Ե  ��ô��Ϸ����
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
    //����������˽�з���  �ð����������ߵķ���direction
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
