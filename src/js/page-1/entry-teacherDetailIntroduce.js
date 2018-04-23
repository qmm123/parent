define(["publicLogic/messageList",
	"public/tools/method",
	"public/business/nativeFun",
	"publicLogic/header"
	], function(messageList, Method, nativeFun, Header) {
	return function() {
		//头像数据
		
		function avaFn(data){
			Method.artRender($('#top'), "avator", data, false, function() {
				setTimeout(function(){
					var topH = $('#top').css('height');
					var height = parseFloat(topH);
					console.log(topH)
					$('#wrapper').css("top",height+ 'px');
					$('.tab').css("top",height+ 'px');
					data.fn && data.fn();
				}, 20)
			})
		}

		// 学生评分
		function setStar(result) {
			for(var i=0;i<result.data.length;i++) {
				var item = result.data[i];
				// 学生评分
				if(item.comment_score || item.comment_score == 0) {
					item.scoreNum = item.scoreNum || {star1: [],star2: [], star3: []}
					if(item.comment_score <= 5) {
						var num1 = Number(item.comment_score);
						for(var j=0;j<parseInt(num1);j++) {
							item.scoreNum.star1.push('star1');
						}
						for(var j=0;j<(Math.ceil(num1) - parseInt(num1));j++){
							item.scoreNum.star2.push('star2');
						}
						for(var j=0;j<(5-Math.ceil(num1));j++){
							item.scoreNum.star3.push('star3');
						}
					}
				}		
			}
			// 上课效果评分
			if(result.class_effect_score <= 5) {
				result.scoreNum1 = result.scoreNum1 || {star1: [],star2: [], star3: []}
				var num2 = Number(result.class_effect_score);
				for(var j=0;j<parseInt(num2);j++) {
					result.scoreNum1.star1.push('star1');
				}
				for(var j=0;j<(Math.ceil(num2) - parseInt(num2));j++){
					result.scoreNum1.star2.push('star2');
				}
				for(var j=0;j<(5-Math.ceil(num2));j++){
					result.scoreNum1.star3.push('star3');
				}
			}
			// 课后服务评分		
			if(result.service_attitude_score <= 5) {
				result.scoreNum2 = result.scoreNum2 || {star1: [],star2: [], star3: []}
				var num3 = Number(result.service_attitude_score);
				for(var j=0;j<parseInt(num3);j++) {
					result.scoreNum2.star1.push('star1');
				}
				for(var j=0;j<(Math.ceil(num3) - parseInt(num3));j++){
					result.scoreNum2.star2.push('star2');
				}
				for(var j=0;j<(5-Math.ceil(num3));j++){
					result.scoreNum2.star3.push('star3');
				}
			}
			// 教学态度评分		
			if(result.teaching_environment_score <= 5) {
				result.scoreNum3 = result.scoreNum3 || {star1: [],star2: [], star3: []}
				var num4 = Number(result.teaching_environment_score);
				for(var j=0;j<parseInt(num4);j++) {
					result.scoreNum3.star1.push('star1');
				}
				for(var j=0;j<(Math.ceil(num4) - parseInt(num4));j++){
					result.scoreNum3.star2.push('star2');
				}
				for(var j=0;j<(5-Math.ceil(num4));j++){
					result.scoreNum3.star3.push('star3');
				}
			}
			// 总分
			if(result.comment_score_sum <= 5) {
				result.scoreNum4 = result.scoreNum4 || {star1: [],star2: [], star3: []}
				var num5 = Number(result.comment_score_sum);
				for(var j=0;j<parseInt(num5);j++) {
					result.scoreNum4.star1.push('star1');
				}
				for(var j=0;j<(Math.ceil(num5) - parseInt(num5));j++){
					result.scoreNum4.star2.push('star2');
				}
				for(var j=0;j<(5-Math.ceil(num5));j++){
					result.scoreNum4.star3.push('star3');
				}
			}
			return result;
		}

		var param = Method.getUrlParam('page_param');
		param = JSON.parse(param)
		// 教师id
		var teacher_id = param ? param.teacher_id : "44a917708a964607a4bb50eb8acd2f16";
		messageList.init({
			name: 'getTeacherIntroduce',
			type: 'TeacherIntroduce',
			data: {
				teacher_id: teacher_id
			},
			avaFn: avaFn
		});
		/*messageList.init({
			name: 'getClassList',
			type: 'ClassList',
			data: {
				teacher_id: teacher_id
			}
		});*/
		/*messageList.init({
			name: 'getClassDetailPing',
			type: 'ClassDetailPing',
			conditions: {
				teacher_id: teacher_id
			},
			fn: setStar
		});*/
		//tab 切换
		var index = 0;
		$('.tab span').on('tap', function() {
			var _index = $(this).parent().index();
			if(index == _index){
				return
			}
			index = _index;
			$('.tab span').removeClass('active');
			$(this).addClass('active');
			if(index == 0){
				messageList.init({
					name: 'getTeacherIntroduce',
					type: 'TeacherIntroduce',
					data: {
						teacher_id: teacher_id
					},
					avaFn: avaFn
				});
			}else if(index == 1){
				messageList.init({
					name: 'getClassList',
					type: 'ClassList',
					data: {
						teacher_id: teacher_id
					}
				});
			}else{
				messageList.init({
					name: 'getClassDetailPing',
					type: 'ClassDetailPing',
					conditions: {
						teacher_id: teacher_id
					},
					fn: setStar
				});
			}
		})
		// 好中差
		var $index = 0;
		$('#wrapper').on('tap', '.item_tab a', function() {
			var _index = $(this).index();
			alert(_index);
			if($index == _index){
				return
			}
			$('#wrapper .item_tab a').removeClass('active');
			$(this).addClass('active');
			messageList.init({
				name: 'getClassDetailPing',
				type: 'ClassDetailPing',
				conditions: {
					teacher_id: teacher_id
				},
				fn: setStar
			});
		})
		// 课程跳转到 课程详情

		$("#wrapper").on("click", ".item2", function(){
			nativeFun("toClassDetail", {"goods_id": $(this).data("goods_id")});
		})
		// 返回上一页
		$('#top').on('click', '.back', function() {
			nativeFun('goBack');
		});
	}
})