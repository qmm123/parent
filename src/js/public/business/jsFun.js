// js原生交互-h5注册方法供原生调用
define([
	"publicTool/bridgeScript"
], function (Bridge) {
	var jsFunConfig = {
		toIndex: "toIndex",//去首页
		toSearchClass: "toSearchClass",//去搜索页（课程）
		toClassDetail: "toClassDetail",//去课程详情页
	};

	// 参数一（flag）方法标识
	// 参数二（paramNative）原生传给js 的数据
	// 参数三（paramH5）js传给原生的数据
	// 参数四（call）js 的回调（参数是原生传给js的数据）
	function jsFun(flag, paramNative, paramH5, call){
		Bridge(function(bridge) {
      bridge.registerHandler(jsFunConfig[flag], function(paramNative, responseCallback) {
        responseCallback(paramH5);
        call && call(paramNative);
      })
    })
	}

	return jsFun;
});