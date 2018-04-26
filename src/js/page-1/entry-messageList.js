// 1-消息列表-入口
define([
	"publicLogic/messageList",
	"public/business/nativeFun",
	"publicLogic/header"
], function (messageList, nativeFun, Header) {
	return function() {
		messageList.init({
			name: 'getMessageList',
			
		});

		$('#wrapper').on('click', '.item', function() {
			var push_type = $(this).data('pushtype');
			if(push_type == 1){ // 去课表页面
				nativeFun("toSchedule");
			}else if(push_type == 2) { // 去考勤页面
				nativeFun("toClassEvaluationAttendance", {
					"goods_id": $(this).data("goods_id"),
					"parent_id": $(this).data("parent_id") || localStorage.parent_id,
					"student_id": $(this).data("student_id")
				});
			}else if(push_type == 3) { // 去课程&评价-评价页面
				nativeFun("toClassEvaluationMyClass", {
					"type": "ClassPingReceive" 
				})
			}else if(push_type == 4) {// 去退班页
				nativeFun("toRetire", {
					"service_number": $(this).data("service_number")
				})
			}else if(push_type == 6) { // 去孩子作业页
				nativeFun("toHomework", {
					"push_type_status": $(this).data("push_type_status")
				})
			}
		})

		// 返回上一页
		Header.init();
		$('.back').on('click', function() {
			nativeFun('goBack');
		})
	}
});
