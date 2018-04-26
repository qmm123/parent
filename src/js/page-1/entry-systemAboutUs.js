// 1-关于我们页-入口
define([
	"publicLogic/header",
	"publicService/service"
], function (Header, Service) {
	return function(){
		// 头部
		Header.init();
		// 获取详情
		Service.getMerchantInfo({}, {}, function (data) {
			$("#version").html(localStorage.version);
			// $("#phone").html("<a href='tel:"+ data.result.addr.telephone +"'>"+ data.result.addr.telephone +"</a>");
			$("#address").html(data.result.addr.address);
		});
	}
});