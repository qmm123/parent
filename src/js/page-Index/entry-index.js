// 首页入口文件
define([
	"public/business/layerFz",
	"public/tools/ajax",
	"TouchSlide",
], function (layer, ajax, TouchSlide) {

	// 顶部轮播图
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