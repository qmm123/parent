define([
	"publicBusiness/layerFz",
	"public/business/nativeFun",
	"public/tools/method",
	"publicService/service"
	], function(layerFz, nativeFun, Method, Server) {
	return function() {
		
		var allNum = 200; //总字数
		var isLock = false;//是否锁定当前的输入状态  
		//是否匿名评论
		$('.evaluation').on('tap', '.submit .left', function() {
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				result.is_anonymous = 1;
			}else{
				result.is_anonymous = 2;
			}
		})

		// 返回上一页

		$('header .back').on('tap', function() {
			layerFz.confirm({
				yes: function(index){
					nativeFun("goBack");
					layer.close(index);
				},
				no: function(){
					
				},
				btn: ["退出", "取消"],
				content: "确认放弃此次评论吗?"
			});
		})
		// 获取参数
		var page_param = Method.getUrlParam('page_param')
		var  goods_id = JSON.parse(page_param)["goods_id"];
		var  order_id = JSON.parse(page_param)["order_id"];
		var  student_id = JSON.parse(page_param)["student_id"];
		var  campus_id = JSON.parse(page_param)["campus_id"];
		var  teacher_id = JSON.parse(page_param)["teacher_id"];
		var  lessons_id = JSON.parse(page_param)["lessons_id"];
		console.log(page_param)
		var  class_effect_score = '5.0';
		var  teaching_environment_score = '5.0';
		var  service_attitude_score = '5.0';
		var  curriculum_evaluation = '';
		var  is_anonymous = '2';
		var id;
		if(page_param) {
			id = JSON.parse(page_param)["id"];
			class_effect_score = JSON.parse(page_param)["class_effect_score"] || "5.0"; //上课效果评分
			teaching_environment_score = JSON.parse(page_param)["teaching_environment_score"] || "5.0"; //教学环境评分
			service_attitude_score = JSON.parse(page_param)["service_attitude_score"] || "5.0"; // 服务态度评分
			curriculum_evaluation = JSON.parse(page_param)["curriculum_evaluation"] || ""; // 课程评价
			is_anonymous = JSON.parse(page_param)["is_anonymous"] || "2"; //是否匿名
		}
		var  parent_id = localStorage.parent_id;
		var num = allNum - parseInt(curriculum_evaluation.length);
		var result = {
			class_effect_score: class_effect_score,
			teaching_environment_score: teaching_environment_score,
			service_attitude_score: service_attitude_score,
			curriculum_evaluation: curriculum_evaluation,
			is_anonymous: is_anonymous,
			num: num
		}
		// 学生评分
		function setStar(result) {
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
			return result;
		}
		setStar(result);
		console.log(result)
		Method.artRender($('.evaluation'), 'TplClass', result, false, function() {
			// 评星效果
			$('.star').on('tap', function() {
				var parent = $(this).parent();
				var index = $(this).index();
				parent.find('.star').removeClass('active');
				parent.find('.star').slice(0, index + 1).addClass('active');
				result.class_effect_score = $('.starWrapper .first').find('.active').length;
				result.service_attitude_score = $('.starWrapper .second').find('.active').length;
				result.teaching_environment_score = $('.starWrapper .last').find('.active').length;
			})
			//输入即可触发【不区分中文和英文】  
			document.querySelector('textarea').addEventListener('input',function(){  
			    //只有在非中文输入状态的时候，才能更改数字  
			    if(!isLock){  
			        var num = this.value.length;  
			        var detal = allNum - parseInt(num);
			        $('.textareaT').text('还可输入'+detal+'个字');
			        result.curriculum_evaluation = this.value;
			    }  
			})  
			//中文输入开始的时候，会触发此函数  
			document.querySelector('textarea').addEventListener('compositionstart',function(){  
			    isLock = true;//此时在输入中，加锁  
			})  
			//中文输入结束的时候，会触发此方法  
			document.querySelector('textarea').addEventListener('compositionend',function(){  
			    var num = this.value.length;  
			    var detal = allNum - parseInt(num);
			    $('.textareaT').text('还可输入'+detal+'个字'); 
			    result.curriculum_evaluation = this.value;
			    isLock = false;  
			}) 
		})
		// 发表评论
		$('.submit .right').on('tap', function() {
			if(id){
				Server.editComment(null,{
					id: id,
					student_id: student_id,
					goods_id: goods_id,
					order_id: order_id,
					campus_id: campus_id,
					teacher_id: teacher_id,
					class_effect_score: result.class_effect_score,
					teaching_environment_score: result.teaching_environment_score,
					service_attitude_score: result.service_attitude_score,
					is_anonymous: result.is_anonymous,
					creator_id: parent_id,
					parent_id: parent_id,
					modifier_id: parent_id,
					curriculum_evaluation: result.curriculum_evaluation
				} , function(data) {
					if(data.result == true && data.status == true){
						nativeFun("toClassEvaluationSuccess");
					}
				}, function() {
					console.log('错误');
				})
			}else{
				Server.getClassPingWritePing(null,{
					student_id: student_id,
					goods_id: goods_id,
					order_id: order_id,
					campus_id: campus_id,
					lessons_id: lessons_id,
					teacher_id: teacher_id,
					class_effect_score: result.class_effect_score,
					teaching_environment_score: result.teaching_environment_score,
					service_attitude_score: result.service_attitude_score,
					is_anonymous: result.is_anonymous,
					creator_id: parent_id,
					parent_id: parent_id,
					curriculum_evaluation: result.curriculum_evaluation
				} , function(data) {
					if(data.result == true && data.status == true){
						nativeFun("toClassEvaluationSuccess");
					}
				}, function() {
					console.log('错误');
				})
			}
		})
	}
})