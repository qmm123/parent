define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
	return function() {

		// 教师id
		var city_id = Method.getUrlParam('city_id') ? Method.getUrlParam('city_id') : "35";
		messageList.init({
			name: 'getSchoolDetailTeacher',
			type: 'SchoolDetailTeacher',
			conditions: {
				city_id: city_id,
				merchant_id: localStorage.merchant_id
			}
		});
		
	}
})