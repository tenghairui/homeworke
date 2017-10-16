<?php

//等同于include
require '../functions.php';

$message='';

//如果数组不为空，肯定有数据
if(!empty($_POST)){

  $email = $_POST['email'];
  $password = $_POST['password'];
  
  //添加数据
  $rows = query('SELECT * FROM users WHERE email="'. $email .'"');


  //判断资源中是否有这个名字
  if($rows && $rows[0]){
    if($rows[0]['password']==$password ){
      //通过会话记录下登录状态
      //这样的话浏览器再次发起请求时
      //可以检测判断这个状态
       // 存一个 session ，服务器会自动的设置一个响应头
        // Set-Cookie 给浏览器，然后浏览器在本地存一个 cookie
        // 这个 cookie 默认叫 PHPSESSID
        
        // PHP 通过超全局数组 $_SESSION 存一个 session 

      //开启session
      session_start();
      //将数据记录在服务器的session中
      $_SESSION['user_info']=$rows[0];


      header('Location:/admin');
        //阻止下边的程序执行 退出程序
        exit;
    }else {
      $message = '密码错误';
    }
  }else {
   $message = '登录失败';
  }


}

?>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Sign in &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
  <div class="login">
    <form action="./login.php" method="post" class="login-wrap">
      <img class="avatar" src="../assets/img/default.png">
      <!-- 有错误信息时展示 --> 
      <?php if(!empty($message)) { ?>
       <div class="alert alert-danger">
        <strong>错误！</strong> <?php echo $message ; ?>
      </div>
      <?php } ?>
      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" name="email" type="email" class="form-control" placeholder="邮箱" autofocus>
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" name="password" type="password" class="form-control" placeholder="密码">
      </div>
      <input type="submit" class="btn btn-primary btn-block" value="登 录">
    </form>
  </div>
</body>
</html>
