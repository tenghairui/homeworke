<?php 
  //包含公共文件 例如调用的函数
  require '../functions.php';
  //检测登录
  checkLogin();
  
  //分页进行封装
  $sql = 'SELECT count(*) AS total FROM posts';
                      //二位数组 所以第0 项的名为total数组
  $total = query($sql)[0]['total'];
  //假定每页显示十条
  $pageSize = 10;

  //根据上述两个值可以判断有多少页
  $pageCount = ceil($total/$pageSize);

  //一页显示多少页码（页码长度）
  //假设页码长度为6
  $pageLimit = 6;

  //获取用户当前页码
  $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;

  //上一页，当前页码-1
  $prevPage = $currentPage -1 ;

  //下一页，当前页码+1
  $nextPage = $currentPage +1 ;

  //根据当前页几算起点位置  当前页码位置 - 长度/2
  $start = $currentPage - floor($pageLimit/2);

  //判断当前页码边界不能小于1
  if($start<1) {
    $start = 1;
  }
  //根据页码起点计算终点（长度是固定的）
  $end = $start + $pageLimit -1;

  //判断终点的边界
  if($end>=$pageCount){
    $end = $pageCount;

    // 当页码终点确定后
      // 为了保证长度固定，可以根据终点
      // 重新计算起点
    $start = $end - $pageLimit + 1;

    //同样也要判断气短的边界不能小于1
    if($start<1) {
      $start = 1;
    }
  }
  //所有有可能的页码
  $pages = range($start,$end);

  $offset = ($currentPage - 1) * $pageSize;

  // 页面需要展示的数据来自于多张表
  $sql = 'SELECT posts.id, posts.title, 
          posts.created, posts.status, users.nickname, 
          categories.name FROM posts LEFT JOIN users ON 
          posts.user_id=users.id LEFT JOIN categories ON 
          posts.category_id = categories.id LIMIT ' . $offset . ', ' . $pageSize;

  //结果
  $lists = query($sql);
  //删除
  $lists = query($sql);
  //删除
  if($_GET['action']=='delete') {
    $sql = 'DELETE FROM posts WHERE id=' . $_GET['pid'];

    $result = delete($sql);

    if($result) {
      header('Location:/admin/posts.php?page=' . $currentPage);
    }
  }


?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Posts &laquo; Admin</title>
  <?php include './inc/style.php'; ?>
  <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
  <div class="main">
    <?php include './inc/nav.php'; ?>
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有文章</h1>
        <a href="post-add.html" class="btn btn-primary btn-xs">写文章</a>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <form class="form-inline">
          <select name="" class="form-control input-sm">
            <option value="">所有分类</option>
            <option value="">未分类</option>
          </select>
          <select name="" class="form-control input-sm">
            <option value="">所有状态</option>
            <option value="">草稿</option>
            <option value="">已发布</option>
          </select>
          <button class="btn btn-default btn-sm">筛选</button>
        </form>
        <ul class="pagination pagination-sm pull-right">
          <?php if($currentPage > 1) { ?>
            <li>
              <a href="/admin/posts.php?page=<?php echo $prevPage; ?>"> 上一页
              </a>
            </li>
          <?php } ?>

          <?php foreach($pages as $key=>$val) { ?>
            <?php if($currentPage == $val) { ?>
            <li class="active" >
                <a href="/admin/posts.php?page=<?php echo $val; ?>">
                  <?php echo $val; ?>
                </a>
            </li>
            <?php } else { ?>
            <li>
                <a href="/admin/posts.php?page=<?php echo $val; ?>">
                  <?php echo $val; ?>
                </a>
            </li>
            <?php } ?>
          <?php } ?>

          <?php if($currentPage < $pageCount) { ?>
            <li>
              <a href="/admin/posts.php?page=<?php echo $nextPage; ?>">
                下一页
              </a>
            </li>
          <?php } ?>
        </ul>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="80">序号</th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach($lists as $key=>$val) { ?>
          <tr>
            <td class="text-center">
              <?php echo $key+1; ?>
            </td>
            <td><?php echo $val['title']; ?></td>
            <td><?php echo $val['nickname']; ?></td>
            <?php if(empty($val['name'])) { ?>
            <td>未分类</td>
            <?php } else { ?>
            <td><?php echo $val['name']; ?></td>
            <?php } ?>
            <td class="text-center"><?php echo $val['created']; ?></td>
            <?php if($val['status'] == 'published') { ?>
            <td class="text-center">已发布</td>
            <?php } else { ?>
            <td class="text-center">草稿</td>
            <?php } ?>
            <td class="text-center">
              <a href="/admin/post.php?action=edit&pid=<?php echo $val['id']; ?>" class="btn btn-default btn-xs">编辑</a>
              <a href="/admin/posts.php?action=delete&page=<?php echo $currentPage ?>&pid=<?php echo $val['id']; ?>" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
    </div>
  </div>
  <?php include './inc/aside.php'; ?>
  <?php include './inc/script.php'; ?>
</body>
</html>

