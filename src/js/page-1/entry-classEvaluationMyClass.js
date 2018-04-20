define(["publicLogic/messageList"], function(messageList) {
	return function() {
		messageList.init({
			name: 'getClassPingMyClass',
			type: 'ClassPingMyClass',
		});
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
				"parent_id": $(this).data("parent_id"),
				"student_id": $(this).data("student_id")
			});
		})
		// 跳转到我要评价页
		$('#wrapper').on('click', '.item .ping', function() {
			nativeFun("toClassEvaluationEvaluation", {
				"sub_order_id": $(this).data("sub_order_id")
			});
		})
		// 跳转到我要评价页
		$('#wrapper').on('click', '.item .ping', function() {
			nativeFun("toClassEvaluationEvaluation", {
				"sub_order_id": $(this).data("sub_order_id")
			});
		})

		//跳转到评价记录页
		$('header .rightText').on('click', function() {
			nativeFun("toClassEvaluationRecord", {
			});
		})
	}
})