<?php

  //session_start();
  //登录时将用户的信息存进了session；
  //“随时随地的”可以将用户信息从session中取出
  //现实中一般不这么去用，因为用户在登录状态中
  //用户信息随时发生改变（例如呗管理员给注销）
  //所以要重新获取一次，可以将用户id从session中
  //取出 ，利用id获取

  // 包含公共文件
  require '../functions.php';
  //检测登录
  checkLogin();
  

  // 根据用户 id 查询用户最新信息
  $user_id = $_SESSION['user_info']['id'];

  //获取查询结果
  $rows = query('SELECT * FROM users WHERE id=' . $user_id);

  if(!empty($_POST)){//检测是否为post方式提交的表单
    unset($_POST['email']);

    $result = update('users',$_POST,$user_id);

    if($result) {
      header('Location: /admin/profile.php ');
      exit;
    }
    $message = '更新失败';
  }
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Dashboard &laquo; Admin</title>
  <?php include './inc/style.php' ?>
  <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>

  <div class="main">

    <?php include './inc/nav.php' ?>

    <div class="container-fluid">
      <div class="page-title">
        <h1>我的个人资料</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <?php if(isset($message)) { ?>
      <div class="alert alert-danger">
        <strong>错误！</strong><?php echo $message ; ?>
      </div>
      <?php } ?>
      <form action="/admin/profile.php" method="post"  class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">头像</label>
          <div class="col-sm-6">
            <label class="form-image">
              <input id="avatar" type="file">
              <?php if($rows[0]['avatar']) { ?>
              <img class="preview" src="<?php echo $rows[0]['avatar'] ; ?>">
              <?php } else { ?>
                <img class="preview" src="/assets/img/default.png">
              <?php } ?>
              <i class="mask fa fa-upload"></i>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="email" class="col-sm-3 control-label">邮箱</label>
          <div class="col-sm-6">
            <input id="email" class="form-control" name="email" type="type" value="<?php echo $rows[0]['email'] ; ?>" placeholder="邮箱" disabled>
            <p class="help-block">登录邮箱不允许修改</p>
          </div>
        </div>
        <div class="form-group">
          <label for="slug" class="col-sm-3 control-label">别名</label>
          <div class="col-sm-6">
            <input id="slug" class="form-control" name="slug" type="type" value="<?php echo $rows[0]['slug'] ?>" placeholder="slug">
            <p class="help-block">https://zce.me/author/<strong>zce</strong></p>
          </div>
        </div>
        <div class="form-group">
          <label for="nickname" class="col-sm-3 control-label">昵称</label>
          <div class="col-sm-6">
            <input id="nickname" class="form-control" name="nickname" type="type" value="<?php echo $rows[0]['nickname'] ; ?>" placeholder="昵称">
            <p class="help-block">限制在 2-16 个字符</p>
          </div>
        </div>
        <div class="form-group">
          <label for="bio" class="col-sm-3 control-label">简介</label>
          <div class="col-sm-6">
            <textarea id="bio" class="form-control" placeholder="Bio" cols="30" rows="6"><?php echo $rows[0]['bio']; ?></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-6">
            <button type="submit" class="btn btn-primary">更新</button>
            <a class="btn btn-link" href="password-reset.html">修改密码</a>
          </div>
        </div>
      </form>
    </div>
  </div>

  <?php include './inc/aside.php' ?>
  <?php include './inc/script.php' ?>

  <script>
    //头像上传
    $('#avatar').on('change',function () { 
      var data = new FormData();  //可以将文件转化为二进制
      data.append('avatar',this.files[0]); //给this.files[0]追加了一条avatar的数据

      var xhr = new XMLHttpRequest;

      xhr.open('post','/admin/upfile.php');

      xhr.send(data);

      xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200) {
          $(".preview").attr('src',xhr.responseText);
        }
      }


     })
  
  </script>
</body>
</html>
