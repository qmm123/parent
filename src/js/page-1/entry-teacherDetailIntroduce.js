define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
	return function() {
		//头像数据
		
		function avaFn(data){
			Method.artRender($('#top'), "avator", data, false, function() {
				setTimeout(function(){
					var topH = $('#top').css('height');
					var height = parseFloat(topH);
					console.log(topH)
					$('#wrapper').css("top",height+ 'px');
					data.fn && data.fn();
				}, 20)
			})
		}
		// 教师id
		var teacher_id = Method.getUrlParam('teachers_id') ? Method.getUrlParam('teachers_id') : "3943962a88474f0d9f34db9651466301";
		messageList.init({
			name: 'getTeacherIntroduce',
			type: 'TeacherIntroduce',
			data: {
				teacher_id: teacher_id
			},
			avaFn: avaFn
		});
		
	}
})