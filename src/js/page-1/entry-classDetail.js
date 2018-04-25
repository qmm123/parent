// 1-课程详情页（班课）-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/header",
  "public/tools/method",
  "public/business/jsFun",
  "public/business/nativeFun",
  "publicLogic/classDetail",
], function (
	ajax, layer, Header, Method, jsFun, nativeFun, classDetail
) {
	return function(){
		// 头部
		Header.init();
		// js注册方法
		jsFun("wbSearchList", function(paramNative){
			var oParam = JSON.parse(paramNative);
		});
		
		// 课程详情
		classDetail.init();
		
	}

});