<?php
/**
 * 入口文件
 *
 * @author gaoxiang <gaoxiang@xiaohe.com>
 *
 * @date 2017-07-03
 */
function __autoload($class_name)
{ 
	$path = str_replace('_', '/', $class_name);
	
	require_once $path . '.php';
}

// 错误请求输出
function err_result()
{
	$err_result = [
		'code' 			=> '0',
		'code_msg'		=>'请求错误',
		'code_user_msg'	=>'请求错误',
		'msg'			=> '0',
		'result' 		=> null,
		'status' 		=> false,
		'type' 			=> 'json'
	];

	die(json_encode($err_result));
}

if (!isset($_GET['func']) || empty($_GET['func'])) {
	err_result();
}


$obj = new RequestApi();

// 获取验证码图片
if ($_GET['func'] == 'img') {
	$params    = $_POST['data'];
	$identify  = $params['data']['identify'];
	$operation = $params['data']['operation'];

	$apiName = isset($_POST['api_name']) && !empty($_POST['api_name']) ? $_POST['api_name'] : 'default';
	$result = $obj->getImg($apiName, $identify, $operation);
	die(json_encode(json_decode($result, true)));
}

/**
 * 请求接口api
 * @param string $uri  接口地址
 * @param array  $data 请求接口数据
 */
if ($_GET['func'] == 'api') {

	// uri
	if (!isset($_POST['uri']) || empty($_POST['uri'])) {
		err_result();
	}

	// data
	if (!isset($_POST['data']) || empty($_POST['data'])) {
		err_result();
	}
	//file
	if (!empty($_FILES)) {
		$tmp = [];
		foreach ($_FILES['file_name'] as $k => $v) {
			$tmp[$k] = (string)$v;
		}
		$_POST['data']['file_name'] = $tmp;
	}
	
	$apiName = isset($_POST['api_name']) && !empty($_POST['api_name']) ? $_POST['api_name'] : 'default';
	$result = $obj->callApi($_POST['uri'], $_POST, $apiName);
	die($result);
}

/**
 * 上传图片upload
 *
 * @param  $[name] [description]
 */
if ($_GET['func'] == 'upload') {
	$image = $_POST['image'];
	$cut_width = $_POST['cut_width'];
	$cut_height = $_POST['cut_height'];
	$result = $obj->uploadImage($image, $cut_width, $cut_height);
	die(json_encode($result));
}