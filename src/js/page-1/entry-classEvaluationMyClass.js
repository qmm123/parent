define(["publicLogic/messageList",
	"public/tools/method",
	"publicLogic/header"
	], function(messageList, Method, Header) {
	return function() {

		var page_param = Method.getUrlParam("page_param");
		var _type = page_param ? JSON.parse(page_param)['type'] : "ClassPingMyClass";
		if(_type == "ClassPingMyClass") {
			messageList.init({
				name: 'getClassPingMyClass',
				type: 'ClassPingMyClass',
			});
		}else if(_type == 'ClassPingReceive') {
			messageList.init({
				name: 'getClassPingReceive',
				type: 'ClassPingReceive'
			});
			$('.tab a').removeClass('active');
			$('.tab a').eq(1).addClass('active');
		}
		// tab选项卡
		$('.tab a').on('tap', function() {
			var index = $(this).index();
			$(this).parent().find('a').removeClass('active');
			$(this).addClass('active');
			if(index == 0){
				messageList.init({
					name: 'getClassPingMyClass',
					type: 'ClassPingMyClass'
				})
			}else{
				messageList.init({
					name: 'getClassPingReceive',
					type: 'ClassPingReceive'
				});
			}
		})
		// 跳转到考勤页
		$('#wrapper').on('click', '.item .kao', function() {
			nativeFun("toClassEvaluationAttendance", {
				"goods_id": $(this).data("goods_id"),
				"student_id": $(this).data("student_id")
			});
		})
		// 跳转到我要评价页
		$('#wrapper').on('click', '.item .ping', function() {
			nativeFun("toClassEvaluationEvaluation", {
				"sub_order_id": $(this).data("sub_order_id")
			});
		})
	/*	// 跳转到我要评价页
		$('#wrapper').on('click', '.item .ping', function() {
			nativeFun("toClassEvaluationEvaluation", {
				"sub_order_id": $(this).data("sub_order_id")
			});
		})
*/
		//跳转到评价记录页
		$('header .rightText').on('click', function() {
			nativeFun("toClassEvaluationRecord", {
			});
		})

		// 返回上一页
		Header.init();
	}
})