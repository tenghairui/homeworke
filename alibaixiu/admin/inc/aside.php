<div class="aside">
    <div class="profile">
    <?php if(empty($_SESSION['user_info']['avatar'])) { ?>
      <img class="avatar" src="/assets/img/default.png">
    <?php } else { ?>
      <img class="avatar" src="<?php echo $_SESSION['user_info']['avatar']; ?>">
    <?php } ?>
      <h3 class="name"><?php echo $_SESSION['user_info']['nickname'] ; ?></h3>
    </div>
    <ul class="nav">
      <li class="active">
        <a href="/admin"><i class="fa fa-dashboard"></i>仪表盘</a>
      </li>
      <li>
        <a href="#menu-posts" class="collapsed" data-toggle="collapse">
          <i class="fa fa-thumb-tack"></i>文章<i class="fa fa-angle-right"></i>
        </a>
        <ul id="menu-posts" class="collapse">
          <li><a href="/admin/posts.php">所有文章</a></li>
          <li><a href="/admin/post.php">写文章</a></li>
          <li><a href="/admin/categories.php">分类目录</a></li>
        </ul>
      </li>
      <li>
        <a href="comments.html"><i class="fa fa-comments"></i>评论</a>
      </li>
      <li>
        <a href="./users.php"><i class="fa fa-users"></i>用户</a>
      </li>
      <li>
        <a href="#menu-settings" class="collapsed" data-toggle="collapse">
          <i class="fa fa-cogs"></i>设置<i class="fa fa-angle-right"></i>
        </a>
        <ul id="menu-settings" class="collapse">
          <li><a href="nav-menus.html">导航菜单</a></li>
          <li><a href="slides.html">图片轮播</a></li>
          <li><a href="settings.html">网站设置</a></li>
        </ul>
      </li>
    </ul>
  </div>