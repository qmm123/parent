define([
	"public/tools/method",
	"public/business/nativeFun"
	], function(Method, nativeFun) {
	return function() {
		
		// 跳转到我的课程页
		$('.sub_btn .submit').on('tap',function() {
			nativeFun("toClassEvaluationRecord", {
			});
		})
		// 完成
		$('.success_ok').on('click', function() {
			nativeFun("destroyPage");
			return false;
		})
	}
})