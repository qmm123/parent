<?php
$Conf = [
	'fonts_path' => '/usr/share/fonts/wqy-zenhei/wqy-zenhei.ttc', // 字体目录

	// api请求地址
	'api_url'	 => 'http://api.baonahao.com.cn', // 本地
	// 'api_url'	 => 'https://api.test.baonahao.com', // 测试
	// 'api_url'	 => 'https://api.fangzhen.baonahao.com', // 仿真
	// 'api_url'	 => 'https://api.baonahao.com', // 线上

	// 文件服务器
	'file_url'	 => 'http://file.baonahao.com.cn', // 本地
	// 'file_url'	 => 'http://file.test.baonahao.com', // 测试
	// 'file_url'	 => 'http://file.fangzhen.baonahao.com', // 仿真
	// 'file_url'	 => 'http://file.baonahao.com', // 线上

	'keys'		 => [
		'packey' 		=> 'f7a3d19f52d6c5ab7841c7b82f03805a', // 应用ID

		'security_code' => 'L@TqvgHQ]Ih4ozz^^[x*JU)C.!4F.XOq4V*Xgoza)KLp6b4Qh61]o0hO#]*BQOS%', //本地
		// 'security_code' => '@D2ncoBcuU9@H,%ejV?@JlkJane102G6#dQjK.vA]87g5%LAz^jQfs($?9^tVqZn', //测试
		// 'security_code' => 't2)H)@g]R]&[VhG&CJCB?QxdFJH#j)LUIU#VyO^grY[ZjQ)wMz%qxUD6aG8EUFv[', //仿真
		// 'security_code' => 'v1YDrA19KqLn5khsko8db6]4eR3(qS3[7fdew$c^XMh$6g6x)R.GaNHBmb86n%qV', //生产

		'data_type'		=> 'json', // 数据传输类型
		'token_key'		=> '', // token key
		'token_val'		=> '', // token value
		'data_sign'     => '', // 签名
		'timestamp'     => time() // 请求时间戳
	]
];

$apiConf = [
    // 移动中心-家长端接口
	// api_parent 为ajax api_name 字段的值
    'api_parent' => array(
		// api请求地址
		'api_url'	 => 'http://apiparent.xiaohe.com.cn', // 本地
		// 'api_url'	 => 'https://apiparentcs.xiaohe.com', // 测试
		// 'api_url'	 => 'https://apiparentfz.xiaohe.com', // 仿真
		// 'api_url'	 => 'https://apiparent.xiaohe.com', // 线上

		// 文件服务器
		'file_url'	 => 'http://file.baonahao.com.cn', // 本地
		// 'file_url'	 => 'http://file.test.baonahao.com', // 测试
		// 'file_url'	 => 'http://file.fangzhen.baonahao.com', // 仿真
		// 'file_url'	 => 'http://file.baonahao.com', // 线上

		'keys'		 => [
			'packey' 		=> 'd2eef03584d44ae0b6344d4c54731211', // 应用ID
			'security_code' => 'v1YDrA19KqLn5khsko8db6]4eR3(qS3[7fdew$c^XMh$6g6x)R.GaNHBmb86n%qV', // 安全码
			'data_type'		=> 'json', // 数据传输类型
			'token_key'		=> '', // token key
			'token_val'		=> '', // token value
			'data_sign'     => '', // 签名
			'timestamp'     => time() // 请求时间戳
		]
    ),
];