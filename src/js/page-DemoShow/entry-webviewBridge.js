// js桥接页入口文件
define([
	"publicTool/bridgeScript"
], function (Bridge) {
	// 注册事件-用于原生调用js
	Bridge(function(bridge) {
	  //注册原生调起方法
	  //参数1： test2 注册flag 供原生使用，要和原生统一
	  //参数2： data  是原生传给js 的数据
	  //参数3： responseCallback 是js 的回调，可以通过该方法给原生传数据
	  bridge.registerHandler('test2', function(data, responseCallback) {
	    alert(data);
	    // document.getElementById("box").style.backgroundColor = "red";
	    // log("Get user information from ObjC: ", data);
	    responseCallback({'userId': '1234567890', 'blog': '标哥的技术博客'})
	    // responseCallback(data);
	  })
	})

	// js 调用 原生方法
	function test() {
		alert("js调原生");
	  //参数1： scanClick 注册flag 供原生使用，要和原生统一
	  //参数2： 是调起原生时向原生传递的参数
	  //参数3： 原生调用回调返回的数据
	  Bridge(function(bridge) {
		  bridge.callHandler('scanClick', {'number': 'len'}, function(response) {
		    document.getElementById("returnValuweiboe").innerHTML = response;
		    document.getElementById("box").style.backgroundColor = "blue";
		    // alert 需要原生配置才会弹出
		    alert('交互成功');
		  });
		})
	}

	// 测试js调取原生方法
	$("#returnValuweiboe").click(function(){
		test();
	});

	return function(){
		
	}
});