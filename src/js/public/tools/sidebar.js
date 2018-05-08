// 侧边栏-划出及隐藏
define([
  
], function(){
	var SideBar = {
		init: function(opt){
			this.configer(opt);
			this.bindEvent();
			return this;
		},
		configer: function(opt){
			var defaults ={
				sideBarLanch: "#classSidebar",//触发按钮
				sideBar: ".class_list_sidebar",//侧边栏
				direction: "right",//运动方向(right->靠右边 left->靠左边)
				speed: 300,//运动时间
				sidebarMask: "sidebar_mask",//底部阴影遮罩层类名
			}
			this.config = $.extend(true, defaults, opt);
			// 获取元素
			this.sideBarLanch = $(this.config.sideBarLanch);
			this.sideBar = $(this.config.sideBar);
			this.sideBarWidth = this.sideBar.width();
		},
		bindEvent: function(){
			var _this = this;
			this.sideBarLanch.click(function(){
				$("<div class='"+ _this.config.sidebarMask +"'></div>").appendTo($("body"));
				_this.moveIn();
			})
			$("body").on("tap", "." + this.config.sidebarMask, function(){
				_this.moveOut();
			})
		},
		moveIn: function(){
			this.sideBar.animate({
				"-webkit-transform": "translate(0px,0px)"
			}, this.config.speed);
		},
		moveOut: function(){
			var _this = this;
			switch(this.config.direction){
				case "left":
					this.sideBar.animate({
						"-webkit-transform": "translate(-"+ this.sideBarWidth +"px,0px)"
					}, this.config.speed, function(){
						$("." + _this.config.sidebarMask).remove();
					});
				break;
				default:
					this.sideBar.animate({
						"-webkit-transform": "translate("+ this.sideBarWidth +"px,0px)"
					}, this.config.speed, function(){
						$("." + _this.config.sidebarMask).remove();
					});
			}
		}
	};
	
	return SideBar;

})