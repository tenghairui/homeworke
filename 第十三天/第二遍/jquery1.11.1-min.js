/**
 * Created by admin on 2017/8/24.
 */
//              ���ٷ�װ

//ele  ���ڵ�λ��  targetҪ�����λ��
function aaa(ele,target){
    //�����ʱ��

    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        var step=target>ele.offsetLeft?10:-10;
        ele.style.left=ele.offsetLeft+step+"px";
        if(Math.abs(target-ele.offsetLeft)<=Math.abs(step)){
            ele.style.left=target+"px";
            clearInterval(ele.timer)
        }

    },13)

}

//������װ


//ele���ڵ�λ��  target�ǵ���
function bbb(ele,target) {
    //�����ʱ��
    clearInterval(ele.timer);
    //һ��һ����ʱ��
    ele.timer = setInterval(function () {
        var step = (r = target - ele.offsetLeft) / 10;
        //���δ���
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //��ֵ
        ele.style.left = ele.offsetLeft + step + "px"
        //ȡ����ʱ��
        if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
            ele.style.left = target + "px"
            clearInterval(ele.timer)
        }

    }, 20)
}

//��װһ����������ȡ�������������Ŀ�;
function clientWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
}
function clientHeight(){
    return window.innerHeight || document.documentElement.clientHeight;
}


//��װ��ȡҳ�汻�ڵ��Ķ�������ಿ��,ҳ�����ķ�װ
function scrollTop(){
    return window.pageYOffset || document.documentElement.scrollTop;
}
function scrollLeft(){
    return window.pageXOffset || document.documentElement.scrollLeft;
}


//��ʾ������
function show(ele){     //������ʾ
    ele.style.display = "block";
}
function hide(ele){ //��������
    ele.style.display = "none";
}

