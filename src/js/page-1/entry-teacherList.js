define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
	return function() {

		// 教师id
		var teacher_id = Method.getUrlParam('teachers_id') ? Method.getUrlParam('teachers_id') : "3943962a88474f0d9f34db9651466301";
		messageList.init({
			name: 'getSchoolDetailTeacher',
			type: 'SchoolDetailTeacher',
			data: {
				
			}
		});
		
	}
})