// 获取元素  给暂停播放按钮添加点击事件
var video = document.querySelector('video')
var playbtn = document.querySelector('.play-button');
var iconCircle = document.querySelector('.play-button i');
var sum = document.querySelector('.sum');
var current = document.querySelector('.current');
var progressbar = document.querySelector('.progress-bar');
var progress = document.querySelector('.progress');
var fullscreen = document.querySelector('.fullscreen');

playbtn.onclick = function() {
    // 判断是在暂停状态还是播放状态 获取在暂停时的状态 paused
    if(video.paused) {
        // 如果是暂停状态 那么开始
        video.play();
        iconCircle.classList.toggle('fa-pause-circle');
    }else {
        // 如果是开始状态，那么调用暂停方法
        video.pause();
        iconCircle.classList.toggle("fa-pause-circle");
    }
}

        // 总时间显示
    // 获取元素sum
    //当视频是可以播放的时候 用oncanplay事件
    video.oncanplay = function() {
        // 获取视频总时间 属性：duration
        //小时
        var h = Math.floor(video.duration/60/60);
        //分
        var m = Math.floor(video.duration/60%60);
        //秒
        var s = Math.floor(video.duration%60);

        // 判断 如果 大于9 那么就显示h，m，s 否则就前面要加0
        var h = h > 9 ? h :"0" + h;

        var m = m > 9 ? m :"0" + m;

        var s = s > 9 ? s :"0" + s;

        // 将获取到的时间添加到sum中
        sum.innerHTML = h + ":" + m + ":" + s;
    }

    // 获取当前时间
    // 视频的当前时间是不断的变化的 所以要用到事件 ontimeupdate

    video.ontimeupdate=function () {

        // 获取当前时间的进度 事件要用到currentTime
        //转化成h m s 形式
        var h = Math.floor(video.currentTime/60/60);

        var m = Math.floor(video.currentTime/60%60);

        var s = Math.floor(video.currentTime%60);

        // 判断 如果 大于9 那么就显示h，m，s 否则就前面要加0
        var h = h > 9 ? h : "0" + h;

        var m = m > 9 ? m : "0" + m;

        var s = s > 9 ? s : "0" + s;

        // 添加到当前时间current中
        current.innerHTML= h + ":" + m + ":" + s ;

        // 进度条的显示
        // 获取progress-bar
        // 进度条显示，当前时间/总时间*100+%
        progressbar.style.width = video.currentTime/video.duration*100+"%";

    }

    // 跳跃播放

    progress.onclick = function (e) {
        // 获取鼠标在progress的点击的x轴的坐标
        var x = e.offsetX;
        // 获取进度的总宽度
        var pWith = this.offsetWidth;
        //当前时间=鼠标点击progress的x坐标/总进度*总时间
        video.currentTime = x/pWith*video.duration;
    }

    // 全屏播放
    fullscreen.onclick = function(){
        video.webkitRequestFullscreen()
        
           video.webkitExitFullScreen();
    }