define(["publicLogic/messageList",
	"public/tools/method",
	"public/business/nativeFun",
	"publicLogic/header"
	], function(messageList, Method, nativeFun, Header) {
	return function() {
		
		var param = Method.getUrlParam('page_param');
		// 班级id
		//console.log(param);
		var goods_id = JSON.parse(param).goods_id;
		// 家长id 
		var parent_id
		if(param) {
			parent_id=JSON.parse(param).parent_id;
		}
		if(!parent_id) {
			if(localStorage.parent_id) {
				parent_id = localStorage.parent_id;
			}
		}
		var name = JSON.parse(param).name;
		$('#headerTxt').text(name+'-考勤');
		// 学员 id
		var student_id = JSON.parse(param).student_id;
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