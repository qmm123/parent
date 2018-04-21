define(["publicLogic/messageList",
	"public/business/nativeFun"
	], function(messageList, nativeFun) {
	return function() {
		messageList.init({
			name: 'getClassPingRecord',
			type: 'ClassPingRecord'
		});

		// 跳转到写评论页面

		$('#wrapper').on('click', '.item .btn', function() {
			var student_id = $(this).data('student_id');
			var goods_id = $(this).data('goods_id');
			var campus_id = $(this).data('campus_id');
			var class_effect_score = $(this).data('class_effect_score');
			var curriculum_evaluation = $(this).data('curriculum_evaluation');
			var order_id = $(this).data('order_id');
			var service_attitude_score = $(this).data('service_attitude_score');
			var teacher_id = $(this).data('teacher_id');
			var teaching_environment_score = $(this).data('teaching_environment_score');
			var is_anonymous = $(this).data('is_anonymous');
			var result = {
				student_id: student_id,
				goods_id: goods_id,
				campus_id: campus_id,
				class_effect_score: class_effect_score,
				curriculum_evaluation: curriculum_evaluation,
				order_id: order_id,
				service_attitude_score: service_attitude_score,
				teacher_id: teacher_id,
				teaching_environment_score: teaching_environment_score,
				is_anonymous: is_anonymous
			}
			nativeFun("toClassEvaluationWriteEvaluation", result);
		})
	}
})