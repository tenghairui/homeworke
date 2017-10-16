<?php 
  //经所造的公共文件引进来
  require '../functions.php';

  //检测是否登录
  checkLogin();

  $action = isset($_GET['action']) ? $_GET['action'] :'add';


  if(!empty($_POST)||$action=='upfile'){
    if($action=='add') {
    //将提交上来的用户插入到数据库
    $result = insert('posts',$_POST);
    //如果插入成功将刷新页面
    if($result) {
      header('Lacation:/admin/posts.php');
      exit;
    }
    $message = '添加文章错误';
  } else if($action = 'upfile') { //文件上传

    //设置一个上传目录
    $path = '../uploads/thumbs';

    //检测目录是否存在
    if(!file_exists($path)) {
      mkdir($path);
    }
    //根据文件上传信息来获取后缀名
    $ext = explode('.',$_FILES['feature']['name'])[1];
    // 以时间戳做为文件名，一定程度上避免重复
    $filename = time();

    //拼凑完整路径
    $dest = $path . '/' . $filename . '.' . $ext;

    //转移上传文件
    move_uploaded_file($_FILES['feature']['tmp_name'],$dest);

    //处理成网络路径
    echo substr($dest,2);
    exit;
    }else if($action=='update') {//更新

      //获取文章id ，根据文章id更新
      $id = $_POST['id'];

      //id为主键  不需要更新 所以 屏蔽他
      unset($_POST['id']);

      //执行更新
      $result = update('posts',$_POST,$id);
      
      if($result) {
        header('Location:/admin/posts.php');
        exit;
      }
    }
  }

  //取出所有分类
  $sql = 'SELECT * FROM categories';

  $lists = query($sql);

  //进行修改
  if($action=='edit') {

    //因为里边储存了一个update的值
    $action ='update';
    //获取文章的id
    $pid = $_GET['pid'];
    //查询文章原始信息
    $sql = 'SELECT * FROM posts WHERE id=' . $pid;

    $rows = query($sql);
  }
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Add new post &laquo; Admin</title>
  <?php include './inc/style.php' ?>
  <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
  <div class="main">
   <?php include './inc/nav.php' ?>
    <div class="container-fluid">
      <div class="page-title">
        <h1>写文章</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <form action="/admin/post.php" method="post" class="row">
        <input type="hidden" name="user_id" value="<?php echo $_SESSION['user_info']['id'] ; ?>" >
        <div class="col-md-9">
          <div class="form-group">
            <label for="title">标题</label>
            <input id="title" class="form-control input-lg" name="title" type="text" placeholder="文章标题">
          </div>
          <div class="form-group">
            <label for="content">标题</label>
            <textarea id="content"  name="content" cols="30" rows="10" placeholder="内容"></textarea>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="slug">别名</label>
            <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
            <p class="help-block">https://zce.me/post/<strong>slug</strong></p>
          </div>
          <div class="form-group">
            <label for="feature">特色图像</label>
            <!-- show when image chose -->
            <img class="help-block thumbnail" style="display: none">
            <input id="feature" id="feature" class="form-control" name="feature" type="file">
            <input type="hidden" name="feature" id="thumb" >
          </div>
          <div class="form-group">
            <label for="category">所属分类</label>
            <select id="category" class="form-control" name="category">
              <?php foreach ($lists as $key => $val) { ?>
              <option value="<?php echo $val['id'] ; ?>"><?php echo $val['name'] ; ?></option>
              <?php } ?>
            </select>
          </div>
          <div class="form-group">
            <label for="created">发布时间</label>
            <input id="created" class="form-control" name="created" type="datetime-local">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" class="form-control" name="status">
              <option value="drafted">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" type="submit">保存</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <script src="/ueditor/ueditor.config.js"></script>
  <script src="/ueditor/ueditor.all.min.js"></script>
  <?php include './inc/aside.php' ?>
  <?php include './inc/script.php' ?>
  <script>
    UE.getEditor('content', {
        autoHeightEnabled: true
      });
    $("#feature").on('change',function () { 
      //通过原生dom可以获取文件信息
      //原生多文件上传 this.files[0];
      var data = new FormData();
      data.append('feature',this.files[0]);

      var xhr =new XMLHttpRequest;

      xhr.open('post','/admin/post.php?action=upfile');

      xhr.send(data);

      xhr.onreadystatechange = function () { 
        if(xhr.readyState==4 && xhr.status==200) {
          $('.thumbnail').attr('src',xhr.responseText).show();
           // 将图片的路径做为隐藏表单的值
          // 提交给服务端进行存储
          $('#thumb').val(xhr.responseText);
        }
       }
     })
  
  </script>
</body>
</html>
