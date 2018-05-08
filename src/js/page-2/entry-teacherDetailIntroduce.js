define(["publicLogic/messageList",
	"public/tools/method",
	"public/business/nativeFun",
	"publicLogic/header"
	], function(messageList, Method, nativeFun, Header) {
	return function() {

		//是否显示评论页面
		var tpl_config = Method.getUrlParam('tpl_config');
		var isShow;
		if(tpl_config){
			tpl_config = JSON.parse(tpl_config);
			if(!$.isEmptyObject(tpl_config)){
				isShow = tpl_config.course_comment.is_show_campus_comment;
				isShow = isShow == '1' ? true : false;
				var $data = {isShow: isShow}
				Method.artRender($('.tab'), 'tabClass', {"isShow": isShow}, false, function() {})
			}
		}


		var isLoad = true;
		//头像数据
		function avaFn(data){
			Method.artRender($('#top'), "avator", data, false, function() {
				$('#top>img')[0].onload = function() {
					isLoad = false;
					setTimeout(function(){
										
						var topH = $('#top').css('height');
						var height = parseFloat(topH);
						$('#wrapper').css("top",height+ 'px');
						$('.tab').css("top",height+ 'px');
						setTimeout(function() {
							Method.artRender($('.tab'), 'tabClass', {isShow: isShow}, false, function() {
								data.fn && data.fn();
							})
						}, 20)
					}, 20)
				}
				$('#top>img')[0].onerror = function() {
					alert(333)
				}
				if(isLoad) {
					setTimeout(function(){
						
						var topH = $('#top').css('height');
						var height = parseFloat(topH);
						$('#wrapper').css("top",height+ 'px');
						$('.tab').css("top",height+ 'px');
						setTimeout(function() {
							Method.artRender($('.tab'), 'tabClass', {isShow: isShow}, false, function() {
								data.fn && data.fn();
							})
						}, 20)
					}, 20)
				}
			})
		}
		

		// 学生评分
		function setStar(result) {
			if(result.data.length > 0) {
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
		var teacher_id = param.teacher_id;
		
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
		$('.tab').on('tap', 'span',function() {
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
			}else if(index == 2){
				messageList.init({
					name: 'getClassDetailPing',
					type: 'ClassDetailPing',
					conditions: {
						teacher_id: teacher_id
					},
					isPullDown: true,
					fn: setStar
				});
			}
		})
		// 好中差
		var $index = 0;
		$('#wrapper').on('tap', '.item_tab a', function() {
			var _index = $(this).index();
			if($index == _index){
				return
			}
			$index = _index;
			messageList.init({
				name: 'getClassDetailPing',
				type: 'ClassDetailPing',
				conditions: {
					teacher_id: teacher_id,
					type: _index
				},
				isPullDown: true,
				fn: setStar,
				FinialFn: function() {
					$('#wrapper .item_tab a').removeClass('active');
					$('#wrapper .item_tab a').eq(_index).addClass('active');
				}
			});
		})
		// 课程跳转到 课程详情
		var isNum = true;
		$("#wrapper").on("click", "._item2", function(e){
			if(!isNum) {
				return
			}
			isNum = false;
			setTimeout(function() {
				isNum = true;
			}, 20)
			nativeFun("toClassDetail", {"goods_id": $(this).data("goods_id")});
		})
		// 返回上一页
		$('#top').on('click', '.back', function() {
			nativeFun('goBack');
		});

		// 打电话
		$('#top').on('click', '.tel', function() {
			nativeFun('callPhone',{"phone": Method.getUrlParam("merchant_phone")});
		})
	}
})