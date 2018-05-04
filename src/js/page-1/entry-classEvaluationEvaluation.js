define(["publicLogic/messageList",
	"public/tools/method",
	"public/business/nativeFun",
	"publicLogic/header",
	"public/business/jsFun"
	], function(messageList, Method, nativeFun, Header, jsFun) {
	return function() {
		// 子订单id
		var sub_order_id = JSON.parse(Method.getUrlParam('page_param'))["sub_order_id"];
		messageList.init({
			name: 'getClassPingWantPing',
			type: 'ClassPingWantPing',
			data: {
				sub_order_id: sub_order_id
			},
			isPullUp: true
		});
		// 执行刷新的交互
		/*jsFun("wbReload", function(){
			console.log('jjjjjj')
			messageList.init({
				name: 'getClassPingWantPing',
				type: 'ClassPingWantPing',
				data: {
					sub_order_id: sub_order_id
				},
				isPullUp: true
			});
		});*/
		

		// 跳转到写评价页
		var isLine = true;
		$('#wrapper').on('tap', '.item .line',function() {
			if(isLine) {
				isLine = false;
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
			}
			setTimeout(function(){
				isLine = true;
			})
		})

		// 返回上一页
		Header.init();
	}
})