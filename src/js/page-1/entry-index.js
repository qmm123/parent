// 1-课程列表页-入口
define([
	"publicBusiness/layerFz",
	"TouchSlide",
], function (layer) {
	layer.msg({
		content: "首页"
	});
	// 轮播图
	TouchSlide({ 
		slideCell:"#slideBox",
		titCell:".hd ul li",
		mainCell:".bd ul",
		effect:"leftLoop",
		autoPlay:true
	});
	return function(){
		
	}
});