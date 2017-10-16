<?php
require '../functions.php';

checkLogin();

  $message = '';
  $title = '添加用户';
  $btnText = '添加';

  //获取地址参数
  $action = isset($_GET['action'])?$_GET['action']:'add';
if(!empty($_POST)){

  //添加 
  if($action=='add'){
  // 为数组添加新的单元
  $_POST['status'] = 'unactivated';
   // 执行插入操作（新方法替换上述插入操作）
  $result = insert('users',$_POST);


  //插入成功
  if($result) {
    header('Location: /admin/users.php ');

  }else {//插入失败
    $message ='添加用户失败';

  }
}

  //更新
  if($action=='update'){
    //获取用户id，根据用户id 进行修改
    $id = $_POST['id'];
    //执行操作修改
      // id 字段是主键，不可被修改
      // 所以要从数组中将其删除
    unset($_POST['id']);

    $result = update('users', $_POST, $id);
    // var_dump($result);  exit;
    if($result) {
      header('Location: /admin/users.php');
      exit;
    }
  }

  //批量删除
  if($action == 'deleteAll') {

    //拼凑语句
    $sql = 'DELETE FROM users WHERE id in (' . implode(',', $_POST['ids']) .')';

    //删除
    $result = delete($sql);
    // 响应头设置，jQuery自动解析 json
    header('Content-Type: application/json');
   
    //成功提示
    if($result) {
 
       $info = array('code' => 10000 , 'message'=>'删除成功');
       echo json_encode($info);
    }else {
       $info = array('code' => 10001 , 'message'=>'删除失败');
       echo json_encode($info);
    }
    exit;
  }
}

  $lists = query('SELECT * FROM users');

  //获取用户id
  $user_id=isset($_GET['user_id']) ? $_GET['user_id'] : '';
  
  if($action=='edit') {
    //操作名
    $action='update';
    $title = '编辑新用户';
    $btnText = '更新';

    //查询结果
  $rows = query('SELECT * FROM users WHERE id=' . $user_id);
    
  }
  if($action == 'delete') {
    $result = delete('DELETE FROM users WHERE id=' . $user_id);
      if($result) {
        header('Location: /admin/users.php');
        exit;
      }
    }
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Users &laquo; Admin</title>
  <?php include './inc/style.php' ; ?>
  <link rel="stylesheet" href="../assets/css/admin.css">
  <script src="./template-web.js"></script>
  <script src="../assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <div class="main">

    <?php include './inc/nav.php' ; ?>

    <div class="container-fluid">
      <div class="page-title">
        <h1>用户</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <?php if(!empty($message)){ ?>
      <div class="alert alert-danger">
        <strong>错误！</strong> <?php echo $message; ?>
      </div>
      <?php } ?>
      <div class="row">
        <div class="col-md-4">
          <form action = "/admin/users.php?action=<?php echo $action; ?>" method = 'post'>
            <h2><?php echo $title ?></h2>
            <div class="form-group">
              <label for="email">邮箱</label>
              <?php if($action != 'add') { ?>
                <input type="hidden"  name = 'id'  value="<?php echo $rows[0]['id']; ?>" >
              <?php } ?>

              <input id="email" class="form-control" name="email" type="email" value="<?php echo isset($rows[0]['email']) ? $rows[0]['email']:"" ; ?>" placeholder="邮箱">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" value="<?php echo isset($rows[0]['slug']) ? $rows[0]['slug']:''; ?>" placeholder="slug">
              <p class="help-block">https://zce.me/author/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <label for="nickname">昵称</label>
              <input id="nickname" class="form-control" name="nickname" value = "<?php echo isset($rows[0]['nickname']) ? $rows[0]['nickname'] : "" ; ?>" type="text" placeholder="昵称">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input id="password" class="form-control" name="password" value = "<?php echo isset($rows[0]['password']) ?$rows[0]['password'] :"" ; ?>" type="text" placeholder="密码">
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit"><?php echo $btnText ?></button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <a class="btn btn-danger btn-sm delete" href="javascript:;" style="display: none">批量删除</a>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
               <tr>
                <th class="text-center" width="40"><input type="checkbox" id="toggle"></th>
                <th class="text-center" width="80">头像</th>
                <th>邮箱</th>
                <th>别名</th>
                <th>昵称</th>
                <th>状态</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($lists as $key => $val) { ?>
              <tr>
                <td class="text-center"><input type="checkbox" class="chk" value ="<?php echo $val['id'] ; ?> "></td>
                <td class="text-center"><img class="avatar" src="<?php echo $val['avatar'] ; ?>"></td>
                <td><?php echo $val['email'] ; ?></td>
                <td><?php echo $val['slug'] ; ?></td>
                <td><?php echo $val['nickname'] ; ?></td>
                <?php if($val['status'] == 'activated') { ?>
                <td>已激活</td>
                <?php } else if($val['status'] == 'unactivated') { ?>
                  <td>未激活</td>
                <?php } else if($val['status'] == 'forbidden') { ?>
                  <td>已禁用</td>
                <?php } else { ?>
                  <td>已删除</td>
                <?php } ?>
                <td class="text-center">
                  <a href="/admin/users.php?action=edit&user_id=<?php echo $val['id'] ; ?>" class="btn btn-default btn-xs">编辑</a>
                  <a href="/admin/users.php?action=delete&user_id=<?php echo $val['id'] ; ?>" class="btn btn-danger btn-xs">删除</a>

                </td>
              </tr>
              <?php } ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <?php include './inc/aside.php' ; ?>
  <?php include './inc/script.php' ; ?>
   <script>
      //对复选框表单全选框进行点击事件
      $("#toggle").on('click',function () { 
        if(this.checked) {
          //prop：checkde 的属性true都会选中
          $('.chk').prop('checked',true);
          //批量显示图标显示
          $('.delete').show();
        }else {
          //prop：checkde 的属性true都会取消选中
          $('.chk').prop('checked',false);
          //批量显示图标隐藏
          $('.delete').hide();
        }
       })
       //对复选框单个选框进行点击事件
      $('.chk').on('change', function () { 
        //查找有几个checked的元素
        var size = $('.chk:checked').size();
        //如果选中元素大于0，那么批量显示图标显示
        if(size>0) {
          $('.delete').show();
          return;
        }
        //否则隐藏批量图标
        $('.delete').hide();
       })

       //进行删除处理
       $('.delete').on('click',function () { 
         //获取所选中的元素
         var ids = [];
         $('.chk:checked').each(function () { 
           //将遍历到的单个选框的值循环添加到这个数组中
           ids.push($(this).val());

          });
          //发送ajax请求
          $.ajax({
            url:"/admin/users.php?action=deleteAll",
            type:'post',
            //数组的名字 进行的添加
            data:{ids: ids},
            
            success:function(info){
              //提示信息
                alert(info.message);

                if(info.code==10000){
                  // 成功后刷新当前页
                  location.reload();
                }
            }
        });  
      })
   
   </script>
</body>
</html>
