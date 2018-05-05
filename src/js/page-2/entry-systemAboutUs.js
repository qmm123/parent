// 1-关于我们页-入口
define([
	"publicLogic/header",
	"publicService/service",
	"publicTool/method",
	"publicBusiness/nativeFun",
], function (Header, Service, Method, nativeFun) {
	return function(){
		// 头部
		Header.init();
		// 获取详情
		Service.getMerchantInfo({}, {}, function (data) {
			$("#version").html(localStorage.version);
			$("#phone").html(Method.getUrlParam("merchant_phone"))
			$("#phone").click(function(){
				nativeFun("callPhone", {"phone":Method.getUrlParam("merchant_phone")});
			})
			$("#address").html(data.result.addr.address);
		});
	}
});