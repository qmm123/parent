define(["publicLogic/messageList",
	"public/tools/method",
	"public/business/nativeFun",
	"publicLogic/header"
	], function(messageList, Method, nativeFun, Header) {
	return function() {
		
		var param = Method.getUrlParam('page_param');
		// 班级id
		var goods_id = param ? JSON.parse(param).goods_id : 'ca9f26580dfb4656a2ebbca8456d5d4c';
		// 家长id 
		var parent_id
		if(param) {
			parent_id=JSON.parse(param).parent_id;
		}
		if(!parent_id) {
			if(localStorage.parent_id) {
				parent_id = localStorage.parent_id;
			}else{
				parent_id = '3c1b0646ce520407a0fedfd17f3a56b6';
			}
		}
		// 学员 id
		var student_id = param ? JSON.parse(param).student_id : '884621151aed45e98dbafb93588e7bbf';
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
		// 返回上一页
		Header.init();
	}
})