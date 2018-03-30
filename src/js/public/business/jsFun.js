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
	// 参数二（param）原生传给js 的数据
	// 参数三（call）js 的回调（回调参数可传给原生）
	function jsFun(flag, param, call){
		Bridge(function(bridge) {
      bridge.registerHandler(jsFunConfig[flag], param, function(res){
      	if(res && call){
      		call(res);
      	}
      });
      bridge.registerHandler(jsFunConfig[flag], function(param, responseCallback) {
        alert(data);
        // document.getElementById("box").style.backgroundColor = "red";
        // log("Get user information from ObjC: ", data);
        responseCallback({'userId': '1234567890', 'blog': '标哥的技术博客'})
        // responseCallback(data);
      })
    })
	}

	return jsFun;
});