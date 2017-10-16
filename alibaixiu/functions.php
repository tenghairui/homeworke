<?php
//导入配置文件
require '../config.php';

// 开启 session
session_start();
    
function checkLogin(){


	if(!isset($_SESSION['user_info'])) {

		header('Location: /admin/login.php');
		exit;
	}
}
//封装连接数据操作
function connect(){
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD);

	if(!$connection){
		die("数据库登录失败");
		// 等同于 echo 数据库连接失失败！ + return;
	}
	//选择数据库
	mysqli_select_db($connection,DB_NAME);
	//设置编码集
	mysqli_set_charset($connection,DB_CHARSET);

	return $connection;
}
function query($sql){
	//连接数据库
	$connection = connect();
	//资源
	$result = mysqli_query($connection,$sql);
	//将资源转化为数组
	$rows = fetch($result);

	return $rows;
}
function insert($table,$arr){
	//连接数据库
	$connection = connect();

	$keys = array_keys($arr);

	$values = array_values($arr);

	$sql = 'INSERT INTO ' . $table . ' (' . implode(', ', $keys) . ') VALUES("' . implode('", "', $values) . '")';


	//执行插入语句
	$result = mysqli_query($connection,$sql);
	//返回
	return $result;
}
function fetch($result) {
	//创建一个数组 存取result
	$rows = array();
	//循环添加result 
	while ($row = mysqli_fetch_assoc($result)) {
		$rows[]=$row;
	}

	return $rows;
}
function delete($sql) {
	$connection = connect();

	$result = mysqli_query($connection, $sql);

    return $result;

}
//修改
function update($table,$arr,$id) {
		$connection = connect();
		//定义空的字符串
		$str = '';
		// 将关联数组处理成 字段名=值, 字段名=值... 格式
		foreach ($arr as $key => $val) {
			$str .= $key . '=' . '"' . $val . '", ' ;
		}
		//截取多余部分
		$str = substr($str, 0 , -2);

		//拼凑修改语句	
		 $sql = 'UPDATE ' . $table . ' SET ' . $str . ' WHERE id=' . $id;
		//执行语句
		$result = mysqli_query($connection,$sql);
		// var_dump($sql); 
		return $result;
	}


