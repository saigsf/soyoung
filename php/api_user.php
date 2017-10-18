<?php
//<!--<meta charset="utf-8" />-->
//输出数据的数组
$output = array();
$mdpass='';
//获取传递参数

$name= @$_REQUEST['name'] ? $_REQUEST['name'] : '';
$email = @$_REQUEST['email'] ? $_REQUEST['email'] : '';
$phone = @$_REQUEST['phone'] ? $_REQUEST['phone'] : '';
$content = @$_REQUEST['content'] ? $_REQUEST['content'] : '';
//判断是否为空
if (empty($name)) {
	$output = array('data' => array(), 'message' => '姓名不能为空!', 'code' => 10001);
	//退出并输出数组
	exit(json_encode($output));
}elseif (empty($email)) {
	$output = array('data' => array(), 'message' => '邮箱不能为空!', 'code' => 10002);
	//退出并输出数组
	exit(json_encode($output));
}elseif (empty($phone)) {
	$output = array('data' => array(), 'message' => '电话不能为空!', 'code' => 10003);
	//退出并输出数组
	exit(json_encode($output));
}elseif (empty($content)) {
	$output = array('data' => array(), 'message' => '内容不能为空!', 'code' => 10004);
	//退出并输出数组
	exit(json_encode($output));
}

//走接口

//连接数据库获取数据
require('connect.php');
// $conn = mysql_connect("qdm114548101.my3w.com", "qdm114548101", "saigsf2270029397");
// mysql_select_db("qdm114548101_db", $conn);
// //设置字符集
// mysql_query("SET NAMES UTF8 ");

$result = mysql_query("INSERT INTO `myfriend`(`name`, `email`, `content`, `phone`) VALUES ('{$name}','{$email}','{$content}','{$phone}')");

if ($result==1) {
	$output = array('data' => array(), 'message' => '提交成功!谢谢支持', 'code' => 0);
	exit(json_encode($output));
}else{		
	$output = array('data' => array($result), 'message' => '提交失败!请重新提交~', 'code' => 10005);
	exit(json_encode($output));
}
mysql_close($conn);

?>