define(["publicLogic/messageList",
	"public/tools/method",
	"public/business/nativeFun",
	"publicLogic/header"
	], function(messageList, Method, nativeFun, Header) {
	return function() {
		// 子订单id
		var sub_order_id = Method.getUrlParam('page_param') ? JSON.parse(Method.getUrlParam('page_param'))["sub_order_id"] : "cec4c90ae145442ab9c3b2853613331e";
		messageList.init({
			name: 'getClassPingWantPing',
			type: 'ClassPingWantPing',
			data: {
				sub_order_id: sub_order_id
			},
			isPullUp: true
		});


		// 跳转到写评价页

		$('.item .line').on('click', function() {
			var student_id = $(this).data('student_id');
			var goods_id = $(this).data('goods_id');
			var order_id = $(this).data('order_id');
			var campus_id = $(this).data('campus_id');
			var teacher_id = $(this).data('teacher_id');
			nativeFun("toClassEvaluationWriteEvaluation", 
				{"goods_id": goods_id,
				"student_id": student_id,
				"order_id": order_id,
				"campus_id": campus_id,
				"teacher_id": teacher_id
			});
		})

		// 返回上一页
		Header.init();
	}
})