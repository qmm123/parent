define(["publicTool/datepicker",
	"publicLogic/scheduleList",
	"public/business/nativeFun",
	"public/business/jsFun",
	"publicLogic/header"
	], function(datepicker, bScroll, nativeFun, jsFun, Header) {
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
			var student_id = $(this).data('student_id');
			if(student_id) {
				nativeFun('toMyChild', {
					"student_id": student_id
				})
			}else{
				nativeFun('toMyChild');
			}
		})

		// 原生调h5
		jsFun('webSchedule', function(param) {
			var _param = JSON.parse(param);
			var student_id = _param.student_id;
			var name = $('#wrapper .item[data-goods_id="'+student_id+'"]').find('.left p').text();
			$('.schedule .nav').data('student_id', student_id);
			$('.schedule .nav').html(name + '<span class="right-arrow"></span>');
		})

		// 返回上一页
		Header.init();
	}
})