/**
 * Created by admin on 2017/8/29.
 */
    //�����Ե���  ���������  ��װ������Ե����ʳ�����
(function (window) {
    var ele=[]
    //����ʳ��Ĺ��캯��
    //�����У�����x��y ��ɫcolor λ��width height
    function Food(x,y,color,width,height){
        this.x=x||0;
        this.y=y||0;
        this.color=color||"blue";
        this.height=height||20
        this.width=width||20;
    }
    //ԭ��,��Ⱦ����render
    Food.prototype.render= function (map) {
        remove()
        //����ڵ�  Ҳ���Ǵ���ʳ��
        var odiv =document.createElement("div")


        //�ҳ�ʳ�������  ����ȡ��  ���������
        this.x=Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width
        this.y=Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height
        //���������긳ֵ��odiv
        odiv.style.left=this.x+"px";
        odiv.style.top=this.y+"px";
        odiv.style.position="absolute"
        //���Ŀ��===����õĿ��
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