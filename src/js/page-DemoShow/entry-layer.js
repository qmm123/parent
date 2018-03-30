// layer测试
define([
	"publicBusiness/layerFz"
], function (layer) {

	return function(){
		$("#msg").click(function(){
			layer.msg();
		})
		$("#alert").click(function(){
			layer.alert();
		})
		$("#load").click(function(){
			layer.load();
		})
	}
});