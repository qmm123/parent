define(["publicTool/datepicker",
	"publicLogic/scheduleList",
	"public/business/nativeFun",
	"public/business/jsFun",
	"publicLogic/header",
	"publicTool/requestSchedule"
	], function(datepicker, bScroll, nativeFun, jsFun, Header, RequestSchedule) {
	//console.log(scroll)
	return function (){
		var isShow = false;
		$('#listContainer').on('click', '.right-arrow', function(e) {
			if(!isShow) {
				$(this).parent().find('.roo').addClass("active");
				$(this).parent().find('.address').addClass("active");
			}else {
				$(this).parent().find('.roo').removeClass("active");
				$(this).parent().find('.address').removeClass("active");
			}
			isShow = !isShow;
			bScroll.refresh(550)
			return false;
		})
		// 跳转到课程详情页
		$('#listContainer').on('click', '.item', function(e) {
			if($(e.target).hasClass('right-arrow')){
				return
			}
			nativeFun("toClassDetail", {"goods_id": $(this).data("goods_id")})
		})
		// 跳转到孩子页面

		$('.schedule .nav').on('click', function() {
			/*var student_id = $(this).data('student_id');
			if(student_id) {
				nativeFun('toMyChild', {
					"student_id": student_id
				})
			}else{*/
				nativeFun('toMyChild');
			/*}*/
		})


		// 原生调h5
		jsFun('wbSchedule', function(param) { 
			/*var _param = JSON.parse(param);
			var student_id = _param.student_id;
			var name = $('#wrapper .item[data-goods_id="'+student_id+'"]').find('.left p').text();
			$('.schedule .nav').data('student_id', student_id);
			$('.schedule .nav').html(name + '<span class="right-arrow"></span>');*/
			var param = JSON.parse(param);
			//console.log(RequestSchedule)
			$('.schedule .nav').html(param.student_name + '<span class="right-arrow"></span>');
			$('.schedule .nav').data('id',param.student_id);
			$('.schedule .date_list li').removeClass('active');
			var time = new Date();
			var years = time.getFullYear();
			var month = time.getMonth() + 1;
			if(parseInt(month) < 10) {
				month = "0"+month
			}
			var day = time.getDate();
			var date_time = years + '-' + month + '-' + day;
			
			RequestSchedule.getList({
				date_time: date_time,
				student_id: param.student_id
			}, function() {
				console.log('成')
				bScroll.refresh();
			});
		})

		// 返回上一页
		Header.init();
	}
})