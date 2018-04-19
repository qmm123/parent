// 公共逻辑-头部
define([
	"public/business/nativeFun",
], function (nativeFun) {
	// 对象写法（避免出现new改变this指向问题）
	var Header = {
		// 初始化
		// 参数一 配置对象
		init: function(opt){
			var _this = this;
			// 配置
			this.configer(opt);
			// 返回事件
			this.goBack();
		},
		// 配置项
		// 参数一 配置对象
		configer: function(opt){
			var defaults = {
				backEle: "headerBack",//返回按钮id
				searchEle: "headerSearch",//搜索框id
				headerTxt: "headerTxt",//头部标题元素id
			};
			this.config = $.extend(true, defaults, opt);
			this.backEle = $("#" + this.config.backEle);// 返回元素
			this.searchEle = $("#" + this.config.searchEle);// 搜索框元素
			this.headerTxt = $("#" + this.config.headerTxt);// 头部标题元素
		},
		// 返回方法
		goBack: function(){
			this.backEle.click(function(){
				nativeFun("goBack");
			});
		},
		// 去搜索页
		goSearchPage: function(opt, call){
			this.searchEle.click(function(){
				var $this = $(this);
				nativeFun("toSearchPage", opt, function(paramNative){
					call && call(paramNative, $this);
				});
			});
		}
	}
	

	return Header;
});