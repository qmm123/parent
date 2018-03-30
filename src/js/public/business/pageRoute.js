// 页面入口文件配置
define([
	"publicBusiness/pageConfig"
], function (pageConfig) {
	var pathname = window.location.pathname;
	// 页面入口文件配置
	// 参数一 模板编号
	function pageRoute(num){
	  for(var i in pageConfig){
	  	if (pathname.match("/"+ num +"/"+ i +".html")) {
	  	  requirejs(["page-"+ num +"/entry-"+ i +""], function (init) {
	  	    init();
	  	  });
	  	  return;
	  	}	
	  }
	}

	return pageRoute;
});