define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
	return function() {
		
		// 班级id
		var goods_id = Method.getUrlParam('goods_id') ? Method.getUrlParam('goods_id') : 'ca9f26580dfb4656a2ebbca8456d5d4c';
		// 家长id 
		var parent_id = Method.getUrlParam('parent_id') ? Method.getUrlParam('parent_id') : '3c1b0646ce520407a0fedfd17f3a56b6';
		// 学员 id
		var student_id = Method.getUrlParam('student_id') ? Method.getUrlParam('student_id') : '884621151aed45e98dbafb93588e7bbf';

		messageList.init({
			name: 'getClassPingQin',
			type: 'ClassPingQin',
			data: {
				goods_id: goods_id,
				parent_id: parent_id,
				student_id: student_id
			}
		});
		/*messageList.init({
			name: 'getClassPingReceive'
		});*/
	}
})