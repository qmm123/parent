// 1-关于我们页-入口
define([
	"publicLogic/systemAboutUs"
], function (AboutUs) {
	return function(){
		AboutUs.init();
	}
});