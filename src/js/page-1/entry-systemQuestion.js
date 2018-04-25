// 1-常见问题页-入口
define([
	"publicLogic/header",
], function (Header) {
	return function(){
		// 头部
		Header.init();
	}
});