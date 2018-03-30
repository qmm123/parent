// 后台状态码及参数配置
define([], function () {
	var statusCode = {
		"platform_id": "f7a3d19f52d6c5ab7841c7b82f03805a",//api2.0（域名为api.baonahao.com）
		"tokenFailure": "API_COMM_008",//token验证失效
		"goodsNameRepeat": "API_GOODS_101",//商品名称重复
		"goodsNumberNoMore": "API_GOODS_REALIAS_013"//商品库存不足
	}
	return statusCode;
})