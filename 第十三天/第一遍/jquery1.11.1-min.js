/**
 * Created by admin on 2017/8/24.
 */
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

