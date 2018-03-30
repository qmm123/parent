// 逻辑接口层统一封装
define([
	"public/tools/ajax"
], function (ajax) {
	var Service = {};

	// 获取课程列表（班课）
	// 参数一 请求参数	参数二 请求成功的回调	参数三 请求失败的回调
	Service.getClassList = function(param, successCall, failCall){
		var option = {
			project_id: localStorage.project_id,
			conditions: {
				merchant_id: localStorage.merchant_id
			},
			page_infos: {
				page_size: 10
			}
		};
		if(param){
			$.extend(true, option, param);
		}
		ajax({
			url: "/app/goods/Goods/getGoodsList",
			data: {
				api_name: "",
				data: option
			}
		}, function(data){
			successCall && successCall(data);
		}, function(jqXhr, statusTxt, data){
			failCall && failCall(statusTxt, data);
		});
	}

	return Service;
})