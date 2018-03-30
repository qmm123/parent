<?php
/**
 * 验证码类
 *
 * @author gaoxiang <gaoxiang@xiaohe.com>
 *
 * @date 2017-06-30
 */
class VerificationCode
{
	private $character = '0123456789abcdefghijklmnopqrstuvwxyz';
	private $code      = '';
    private $Conf      = [];

	public function __construct()
	{
        require dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Conf.php';
        $this->Conf = $Conf;

		for ($i = 0; $i < 4; $i++) {
			$inx = rand(0, 35);
			$this->code .= $this->character[$inx];
		}
	}

    /*
    * 返回生成验证码
    *
    * @param
    *
    * @return string $code
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * 生成图片并输出
     *
     * @param string $code   生成文字
     * @param int    $width  宽度
     * @param int    $height 高度
     *
     * @return image 输出图片
     */
    public function outputImg($code = '', $width = 120, $height = 40)
    { 
        header("Content-type: image/PNG");

        // create image
        $img = imagecreate($width, $height);

        // create color
        $font_color   = imagecolorallocate($img, 68, 198, 169);
        $bg_color     = imagecolorallocate($img, 255, 255, 255);
        $border_color = imagecolorallocate($img, 234, 234, 234);

        imagefill($img, 0, 0, $bg_color);

        imagerectangle($img, 0, 0, $width-1, $height-1, $border_color);  

        $strh = 0;
        for ($i = 0; $i < 4; $i++) {
            $rotate = rand(-10, 10); // 旋转
            ImageTTFText(
                $img,
                25,
                $rotate,
                20*($i+1),
                30+$strh,
                $font_color,
                $this->Conf['fonts_path'],
                substr($code, $i, 1)
            );
            $strh = rand(-10, 10);  
        } 

        imagepng($img); // 输出图片
        imagedestroy($img); // 释放图片所占内存
    }
}