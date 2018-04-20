// 公共逻辑-课程列表页-右侧筛选按钮
define([
	"publicTool/method",
	"publicTool/sidebar",
	"text!template/classList/sidebar.html!strip",
], function (Method, sidebar, tplSidebar) {
	// 对象写法（避免出现new改变this指向问题）
	var ClassListSidebar = {
		// 初始化
		// 参数一 配置对象
		init: function(opt){
			var _this = this;
			this.configer(opt);
		},
		// 配置项
		// 参数一 配置对象
		configer: function(opt){
			var defaults = {
				
			};
			this.config = $.extend(true, defaults, opt);
		},
	}
	

	return ClassListSidebar;
});