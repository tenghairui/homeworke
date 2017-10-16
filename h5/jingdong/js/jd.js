

var zong = 7200;

var time = setInterval(function(){

var shi = Math.floor(zong/60/60);

var fen = Math.floor(zong/60%60);

var miao = Math.floor(zong%60);

shi = shi>9?shi:"0" + shi;

fen = fen>9?fen:"0" + fen;

miao=miao>9?miao:"0" + miao;

$(".time span:eq(0)").html(shi);

$('.time span:eq(1)').html(fen);

$('.time span:eq(2)').html(miao);

zong--

},1000)