// 接口调用测试
define([
	"publicService/service",
], function (Service) {
	// 点击事件
	// 参数一 元素id	参数二 点击事件回调
	function btnEvent(eleId, call){
		$("#" + eleId).click(function(){
			call && call();
		})
	}

	btnEvent("messageList", function(){
		Service.getMessageList({
			isShowLoading: false
		}, {a: 123}, 
		function(data){
			console.log(data);
		}, 
		function(txt, data){
			console.log("失败", data);
		});
	});

	btnEvent("grade", function(){
		Service.getGoodsGrade({
			isShowLoading: false
		}, {conditions:{a:123}}, 
		function(data){
			console.log(data);
		}, 
		function(txt, data){
			console.log("失败", data);
		});
	});

	btnEvent("schoolList", function(){
		Service.getSchoolList({
			isShowLoading: false
		}, {
			conditions:{
				city_id:35
			}
		},
		function(data){
			console.log(data);
		}, 
		function(txt, data){
			console.log("失败", data);
		});
	});

	return function(){
		
	}
});