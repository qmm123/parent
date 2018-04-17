// layer测试
define([
	"publicBusiness/layerFz"
], function (layer) {

	return function(){
		$("#msg").click(function(){
			layer.msg();
		})

		$("#load").click(function(){
			layer.load();
		})


		$("#alert").click(function(){
			layer.alert({
				yes: function(index){
					alert("回调");
					layer.close(index);
				}
			});
		})
		$("#confirm").click(function(){
			layer.confirm({
				yes: function(index){
					alert("要-按钮的回调");
					layer.close(index);
				},
				no: function(){
					alert("不要-按钮的回调");
				}
			});
		})
	}
});