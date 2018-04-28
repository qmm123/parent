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
		$('.evaluation').on('click', '.submit .left', function() {
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				result.is_anonymous = 1;
			}else{
				result.is_anonymous = 2;
			}
		})

		// 返回上一页

		$('header .back').on('click', function() {
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
		var  goods_id = page_param ? JSON.parse(page_param)["goods_id"] : "d012786c35874fddb89ddb318a59e2c1";
		var  order_id = page_param ? JSON.parse(page_param)["order_id"] : "59d55531b2d64559adb65bb06b43df14";
		var  student_id = page_param ? JSON.parse(page_param)["student_id"] : "2d53c54bbd994aa4a45b08949858e55a";
		var  campus_id = page_param ? JSON.parse(page_param)["campus_id"] : "441a0ebd14324d3b8f8fd3d8b1f45787";
		var  teacher_id = page_param ? JSON.parse(page_param)["teacher_id"] : "02afda9e75344b5c967af5506b605546";
		var  class_effect_score = '5.0';
		var  teaching_environment_score = '5.0';
		var  service_attitude_score = '5.0';
		var  curriculum_evaluation = '';
		var  is_anonymous = '2';
		if(page_param) {
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
		$('.submit .right').on('click', function() {
			Server.getClassPingWritePing(null,{
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
					curriculum_evaluation: result.curriculum_evaluation
				} , function(data) {
				if(data.result == true && data.status == true){
					nativeFun("toClassEvaluationSuccess");
				}
			}, function() {
				console.log('错误');
			})
		})
	}
})