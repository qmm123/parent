// 公共逻辑-关于我们
define([
	"publicLogic/header",
	"publicService/service",
	"public/business/nativeFun",
	"public/tools/method",
], function (Header, Service, nativeFun, Method) {
	// 头部
	Header.init();
	// 对象写法（避免出现new改变this指向问题）
	var AboutUs = {
		// 初始化
		// 参数一 配置对象
		init: function(opt){
			var _this = this;
			// 配置
			this.configer(opt);
			// 渲染基础内容
			this.renderBasicContent();
		},
		// 配置项
		// 参数一 配置对象
		configer: function(opt){
			var defaults = {
				version: "version",//版本号id
				phone: "phone",//客服电话id
				phoneEmptyTxt: "暂无开通客服电话~",//客服电话id
				address: "address",//总部地址id
			};
			this.config = $.extend(true, defaults, opt);
			this.version = $("#" + this.config.version);
			this.phone = $("#" + this.config.phone);
			this.address = $("#" + this.config.address);
			this.phoneNumber = Method.getUrlParam("merchant_phone");
		},
		// 渲染基础内容
		renderBasicContent: function(){
			var _this = this;
			Service.getMerchantInfo({}, {}, function (data) {
				_this.version.html(localStorage.version);
				if(_this.phoneNumber){
					_this.phone.html(_this.phoneNumber);
					_this.phone.click(function(){
						nativeFun("callPhone", {"phone":_this.phoneNumber});
					})
				}else{
					_this.phone.html(_this.config.phoneEmptyTxt);
				}
				_this.address.html(data.result.addr.address);
			});
		}
	}
	

	return AboutUs;
});