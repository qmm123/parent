// js原生交互-原生注册方法供h5调用
define([
	"publicTool/bridgeScript"
], function (Bridge) {
	var nativeFunConfig = {
		toIndex: "toIndex",//去首页
		toSearchClass: "toSearchClass",//去搜索页（课程）
		toClassDetail: "toClassDetail",//去课程详情页
	};

	// 参数一（flag）方法标识
	// 参数二（param）传给原生的参数
	// 参数三（call）原生给js的回调（参数是原生给js传递的参数）
	function nativeFun(flag, param, call){
		Bridge(function(bridge) {
      bridge.callHandler(nativeFunConfig[flag], param, function(res){
      	call && call(res);
      });
    })
	}

	return nativeFun;
});