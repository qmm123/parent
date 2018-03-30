<?php
/**
* request api
*
* @author gaoxiang <gaoxiang@xiaohe.com>
*
* @date 2017-07-03
*/
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/VerificationCode.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/Sign.php';

class RequestApi
{	
	private $api_url  = '';
	private $file_url = '';
	private $keys 	  = [];
	
	function init($apiName)
	{
		require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Conf.php';
		$tmpConf = [];
		if ($apiName == 'default') {
			$tmpConf = $Conf;
		} else {
			$tmpConf = isset($apiConf[$apiName]) ? $apiConf[$apiName] : [];	
		}

		$this->api_url  = $tmpConf['api_url'];
		$this->file_url = $tmpConf['file_url'];
		$this->keys     = $tmpConf['keys'];
	}

    /**
     * 请求接口api
     *
     * @param string $api_uri 接口地址
     * @param array Array(
     *        	['keys']['token'] 需要验证的token
     *        	['data'][]        具体请求参数
     *       )
     *
     * @return json 接口返回json结果
     */
	public function callApi($api_uri, $params, $apiName='default')
	{
		$this->init($apiName);
		$this->keys['token_key'] = isset($params['keys']['token_key']) ? $params['keys']['token_key'] : '';
		$this->keys['token_val'] = isset($params['keys']['token_val']) ? $params['keys']['token_val'] : '';
		unset($params['keys']);

		// 生成签名
		$this->keys['data_sign'] = Sign::getSign($params['data'], $this->keys['security_code']);

		$this->keys['token'] = $this->keys['token_val'];
		// 组装请求方法
		$data = [
			'keys' => $this->keys,
			'data' => $params['data']
		];
        
		$api_params = http_build_query($data);
        $curl       = curl_init($this->api_url . $api_uri);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $api_params);
        curl_setopt($curl, CURLOPT_TIMEOUT, 600);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        if (curl_errno($curl)) {
            printf('CURL errno��<pre>%s</pre>', curl_error($curl));
        }
        curl_close($curl);

		return $result;
	}

    /**
    * 获取验证码图片地址
    * 
    * @identify 唯一标识
    * @operation 验证码类型
    */
    public function getImg($apiName, $identify, $operation = 1)
    {
        $this->init($apiName);
        return $this->api_url . '/Validate/imageCode?identify=' . $identify . '&operation=' . $operation;
    }


    /**
     * 获取验证码图片
     *
     * @param null
     *
     * @return image 返回图片
     */
	public function getVerificationImage()
	{
		$codeCls = new VerificationCode();
		$code 	 = $codeCls->getCode();
		$codeCls->outputImg($code);
	}

    /**
     * 上传图片
     *
     * @param image $file 图片
     *
     * @return string $path 图片地址
     */
	public function uploadImage($image = [], $cut_width = 0, $cut_height = 0)
	{
		$this->init('default');
        if ($_POST['img_type'] == 1) { // base64 上传图片
            $res = [
                'code' 			=> '0',
                'code_msg'		=>'上传成功',
                'code_user_msg'	=>'上传成功',
                'msg'			=> '1',
                'result' 		=> '',
                'status' 		=> false,
                'type' 			=> 'json'
            ];

            $base64_img = trim($_POST['file']);
            if(preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_img, $result)){
				$ext = $result[2]; // 获取后缀名
                if(in_array($ext,array('pjpeg','jpeg','jpg','gif','bmp','png'))){
                    $target = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'tmp' . DIRECTORY_SEPARATOR . md5(uniqid() . time()) . '.' . $ext;
                    if(!file_put_contents($target, base64_decode(str_replace($result[1], '', $base64_img)))){
                        $res['code_msg'] = '上传失败';
                        $res['code_user_msg'] = '上传失败';
                        return $res;
                    }
                }else{
                    //文件类型错误
                    $res['code_msg'] = '图片上传类型错误';
                    $res['code_user_msg'] = '图片上传类型错误';
                    return $res;
                }

            }else{
                //文件错误
                $res['code_msg'] = '文件错误';
                $res['code_user_msg'] = '文件错误';
                return $res;
            }
        } else { // 二进制上传
            // 先临时上传到本地
            $files  = $_FILES['file'];
            $ext    = '.' . pathinfo($files['name'], PATHINFO_EXTENSION);
            $target = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'tmp' . DIRECTORY_SEPARATOR . md5(uniqid() . time()) . $ext;
            move_uploaded_file($files['tmp_name'], $target);
        }

		
		// 同步到文件服务器
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->file_url);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
		$data = array(
			'method' => 'php', // 标识PHP方式上传文件
			'app'    => 'zsgj', // 应用名简写[jwb，zjjz，ddyx，bnh，lt，hy]
			'file'   => new CURLFile($target), // 文件绝对路径，注意在路径前加'@'
			'type'   => 'image', // 类型[image，doc，video]
			'exts'   => ".png|.gif|.jpg|.jpeg", // 扩展名，用'|'隔开
			'size'   => '2', // 大小，单位是MB
			'secret' => 'dXBsb2FkX2FwaV9zZWNyZXRfa2V5', //秘钥，base64_encode('upload_api_secret_key')
			'width'  => $image['width'], // 图片宽
			'height' => $image['height'], //图片高
		);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$upload_result = curl_exec($ch);
		curl_close($ch);

		// 删除临时上传到本地文件
		@unlink($target);
		$upload_result = json_decode($upload_result, true);

		// 剪裁
		if (count($image) > 0) {
			// 原始图片信息
	        $img = getimagesize($this->file_url.$upload_result['data']);

            // 原始图片宽高
	        $old_width = $img[0];
	        $old_height = $img[1];

	        // 图片左/上偏移距离(裁剪左上角在图片中的坐标)
	        $x = $image['x'] < 0 ? 0 : $image['x']; 
	        $y = $image['y'] < 0 ? 0 : $image['y'];

	        //图片被裁剪的宽高(去除空白部分)
	        if($x == 0){
	            //当左偏移为负数时,用裁剪的宽减去左偏移量与原图宽比较
	            $width = ($cut_width + $image['x']) < $old_width ? ($cut_width + $image['x']) : $old_width;
	        }else{
	            //当左偏移为正数时,用裁剪的宽加左偏移量与原图宽比较
	            $width = ($cut_width + $image['x']) < $old_width ? $cut_width : ($old_width - $image['x']);
	        }
	        if($y == 0){
	            //当上偏移为负数时,用裁剪的高减去上偏移量与原图高比较
	            $height = ($cut_height + $image['y']) < $old_height ? ($cut_height + $image['y']) : $old_height;
	        }else{
	            //当左偏移为正数时,用裁剪的高加上偏移量与原图高比较
	            $height = ($cut_height + $image['y']) < $old_height ? $cut_height : ($old_height - $image['y']);
	        }

	        // 原始图片对象/扩展名
	        $src_img_obj = $ext = null;

            // 判断图片的类型
	        switch($img[2]){
	            case 1:
	                $src_img_obj = @imagecreatefromgif($this->file_url.$upload_result['data']);
	                $ext = 'gif';
	                break;
	            case 2:
	                $src_img_obj = @imagecreatefromjpeg($this->file_url.$upload_result['data']);
	                $ext = 'jpeg';
	                break;
	            case 3:
	                $src_img_obj = @imagecreatefrompng($this->file_url.$upload_result['data']);
	                $ext = 'png';
	                break;
	            default:
	                $src_img_obj = @imagecreatefrompng($this->file_url.$upload_result['data']);
	                $ext = 'png';
	                break;
	        }
	        $new_img_path = dirname(__FILE__).DIRECTORY_SEPARATOR.'tmp'.DIRECTORY_SEPARATOR.uniqid().'.'.$ext;

	        //目标图片对象， $cut_width就是宽 ，$cut_height就是高
	        $original_width  = $img[0];
	        $original_height = $img[1];
	        $image['width']  = ($image['width']>$original_width) ? $original_width : $image['width'];
	        $image['heihgt'] = ($image['heihgt']>$original_height) ? $original_height : $image['heihgt'];

	        $dst_img_obj = imagecreatetruecolor($cut_width, $cut_height);



	        // 这个函数不失真
	        imagecopyresampled($dst_img_obj, $src_img_obj, 0, 0, $x, $y, $cut_width, $cut_height, $width, $height);
	        imagepng($dst_img_obj, $new_img_path);

            // 同步到文件服务器
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->file_url);
            curl_setopt($ch, CURLOPT_POST, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, FALSE);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
            $data = array(
                'method' => 'php', // 标识PHP方式上传文件
                'app'    => 'zsgj', // 应用名简写[jwb，zjjz，ddyx，bnh，lt，hy]
                'file'   => new CURLFile($new_img_path), // 文件绝对路径，注意在路径前加'@'
                'type'   => 'image', // 类型[image，doc，video]
                'exts'   => ".png|.gif|.jpg|.jpeg", // 扩展名，用'|'隔开
                'size'   => '2', // 大小，单位是MB
                'secret' => 'dXBsb2FkX2FwaV9zZWNyZXRfa2V5', //秘钥，base64_encode('upload_api_secret_key')
                'width'  => $cut_width, // 图片宽
                'height' => $cut_height, //图片高
            );
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            $new_res = curl_exec($ch);
            curl_close($ch);

            // 删除临时上传到本地文件
            @unlink($new_img_path);
            $new_res = json_decode($new_res, true);
		}
		
		// 返回数据
		$res = [
			'code' 			=> '1',
			'code_msg'		=>'上传成功',
			'code_user_msg'	=>'上传成功',
			'msg'			=> '1',
			'result' 		=> [
			        'path'     => $this->file_url.$new_res['data'],
                    'uri'      => $new_res['data'],
					'old_path' => $this->file_url.$upload_result['data'],
					'old_uri'  => $upload_result['data']
				],
			'status' 		=> true,
			'type' 			=> 'json'
		];
		
		return $res;
	}
}
