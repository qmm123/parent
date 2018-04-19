// 1-校区详情主页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/header",
  "public/tools/method",
  "publicService/service",
  "publicLogic/schoolDetail",
], function (
	ajax, layer, Header, Method, Service, schoolDetail
) {
	return function(){
		// 头部
		Header.init();

		// 校区对象
		schoolDetail.init({
			headerTxtEle: Header.headerTxt
		});
	}

});