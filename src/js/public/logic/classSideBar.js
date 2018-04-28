// 公共逻辑-课程列表页-右侧筛选按钮
define([
	"publicTool/method",
	"publicTool/artTempFun",
	"publicTool/sidebar",
	"text!template/classList/sidebar.html!strip",
	"public/tools/radioCheck",
], function (Method, artTempFun, Sidebar, tplSidebar, radioCheck) {
	// 对象写法（避免出现new改变this指向问题）
	var ClassListSidebar = {
		// 初始化
		// 参数一 配置对象
		init: function(opt){
			var _this = this;
			this.configer(opt);
			this.getConfigData();
			this.renderSidebar();
			this.sidebarEvent();
			this.sidebarBottomEvent();
		},
		// 配置项
		// 参数一 配置对象
		configer: function(opt){
			var defaults = {
				sideEle: "#classSidebar",//侧边栏触发元素
				sideBarEle: ".class_list_sidebar",//侧边栏
				speed: 300,//侧边栏运动时间
				paramKey: "tpl_config",//侧边栏配置参数（从url获取）
				callConfirm: ""//确定按钮的回调
			};
			this.config = $.extend(true, defaults, opt);
			this.sideBar = null;//侧边栏对象
			this.getConfigData();//模块配置
		},
		// 获取配置参数
		getConfigData: function(){
			this.sideData = JSON.parse( Method.getUrlParam(this.config.paramKey) );
		},
		// 渲染侧边栏
		renderSidebar: function(){
			artTempFun.artRenderString( $("body"), $(tplSidebar).html(), this.sideData, true );
			this.sideBar = Sidebar.init();
		},
		// 侧边栏元素单选及多选绑定事件
		sidebarEvent: function(){
			// 设置多选
			radioCheck.checkbox({
				eleFolder: "[data-role='checkbox']",
				eleEvent: ">li"
			});
		},
		// 侧边栏按钮底部事件
		sidebarBottomEvent: function(){
			var _this = this;
			// 重置按钮
			$("body").on("click", ".bottom_btn .btn.reset", function(){
				radioCheck.checkboxReset({
					eleFolder: "[data-role='checkbox']",
					eleEvent: ">li"
				});
			})
			// 确定按钮
			$("body").on("click", ".bottom_btn .btn.ok", function(){
				_this.sideBar.moveOut();
				_this.config.callConfirm && _this.config.callConfirm();
			})
		},
		// 获取侧边栏搜索条件
		getValue: function(){
			var oObj = radioCheck.getCheckboxValue({
				eleFolder: "[data-role='checkbox']",
				eleEvent: ">li"
			});
			return oObj;
		}
	}
	

	return ClassListSidebar;
});