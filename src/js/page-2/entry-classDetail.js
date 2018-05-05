// 1-课程详情页（班课）-入口
define([
	"public/tools/ajax",
	"publicLogic/header",
  "public/tools/method",
  "public/business/jsFun",
  "public/business/nativeFun",
  "publicLogic/classDetail",
], function (
	ajax, Header, Method, jsFun, nativeFun, classDetail
) {
	return function(){
		// 头部
		Header.init();
		
		// 课程详情
		classDetail.init();
	}

});