define(["publicLogic/messageList",
	"public/tools/method",
	"publicLogic/header",
	"public/business/nativeFun",
	"public/business/jsFun"
	], function(messageList, Method, Header, nativeFun, jsFun) {
	return function() {
		// 执行刷新的交互
		jsFun("wbReload", function(){
			getClass();
			//console.log(11)
		});

		function getClass() {
			messageList.init({
				name: 'getClassPingMyClass',
				type: 'ClassPingMyClass',
			});
		}
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
		var isKao = true;
		$('#wrapper').on('tap', '.item .kao', function() {
			if(isKao) {
				isKao = false; 
				nativeFun("toClassEvaluationAttendance", {
					"goods_id": $(this).data("goods_id"),
					"student_id": $(this).data("student_id"),
					"name": $(this).data('name')
				});
			}
			setTimeout(function(){
				isKao = true;
			})
		})
		// 跳转到我要评价页
		var isPing = true;
		$('#wrapper').on('tap', '.item .ping', function() {			
				nativeFun("toClassEvaluationEvaluation", {
					"sub_order_id": $(this).data("sub_order_id")
				});
		})
	/*	// 跳转到我要评价页
		$('#wrapper').on('tap', '.item .ping', function() {
			nativeFun("toClassEvaluationEvaluation", {
				"sub_order_id": $(this).data("sub_order_id")
			});
		})
*/
		//跳转到评价记录页
		$('header .rightText').on('tap', function() {
			nativeFun("toClassEvaluationRecord", {
			});
		})

		// 返回上一页
		Header.init();
	}
})