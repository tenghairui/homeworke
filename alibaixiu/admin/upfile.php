<?php 

    require '../functions.php';

    //检测存放图片的目录是否存在
    if(!file_exists('../uploads')){
        mkdir('../uploads');
    }

    //使用时间戳作为文件名，一定程度上避免名字重复
    $filename = time();
    //根据文件名来获取文件后缀
    $ext = explode('.', $_FILES['avatar']['name'])[1];
    //拼凑目录路径
    $path = '/uploads/'. $filename . '.' . $ext;
    //读取用户id
    $user_id = $_SESSION['user_info']['id'];
    
    //转存上传文件到指定目录
    // var_dump($_FILES); exit;
    move_uploaded_file($_FILES['avatar']['tmp_name'], '..' . $path);
    //更新数据库(永久储存)
    update('users',array('avatar'=>$path),$user_id);

    // 将上传路径返回给浏览器，实现预览效果
    echo $path;
    // exit;