// 侧边栏-划出及隐藏
define([
  
], function(){
	// 参数一 触发按钮 参数二 侧边栏 参数三 运动速度 参数四 方向-默认是从右到左
	return function(btn, side, speed, direction){
		var iSrolL = $(side).width();
		$(btn).on("tap", function(){
			$("<div class='sidebar_mask'></div>").appendTo($("body"));
			$(side).animate({
				"-webkit-transform": "translate(0px,0px)"
			}, speed);
			$(".sidebar_mask").on("tap", function(){
				if(direction){
					$(side).animate({
						"-webkit-transform": "translate(0px,"+ iSrolL +"px)"
					}, speed, function(){
						$(".sidebar_mask").remove();
					});
				}else{
					$(side).animate({
						"-webkit-transform": "translate("+ iSrolL +"px,0px)"
					}, speed, function(){
						$(".sidebar_mask").remove();
					});
				}
			})
		})
	}

})