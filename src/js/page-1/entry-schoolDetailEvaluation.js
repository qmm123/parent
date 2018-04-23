define(["publicLogic/messageList",
	"public/tools/method",
	"publicLogic/header"
	], function(messageList, Method, Header) {
	return function() {

		// 校区id
		var campus_id = Method.getUrlParam('campus_id') ? Method.getUrlParam('campus_id') : '9709f332e4a148439ab29d1a2618c9fd';
		// 班级id
		var goods_id = Method.getUrlParam('goods_id') ? Method.getUrlParam('goods_id') : '';
		// 教师id
		var teachers_id = Method.getUrlParam('teachers_id') ? Method.getUrlParam('teachers_id') : '';

		// 计算star个数
		function setStar(data) {
			for(var i=0;i<data.length;i++) {
				var item = data[i];
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
			console.log(data)
			return data;
		}

		messageList.init({
			name: 'getSchoolDetailPing',
			type: 'SchoolDetailPing',
			conditions: {
				campus_id: campus_id,
				goods_id: goods_id,
				teachers_id: teachers_id
			},
			fn: setStar,
			templateFn: templateFn
		})
		// tab模板
		function templateFn(data){
			Method.artRender($('.tab'), "TabTpl", data, false, function() {
				
			});
		}
		// tab切换

		$('.tab').on('tap','a', function() {
			var index = Number($(this).index());
			$('.tab a').removeClass('active');
			$(this).addClass('active');
			console.log(index)
			if(index == 0) {
				messageList.init({
					name: 'getSchoolDetailPing',
					type: 'SchoolDetailPing',
					conditions: {
						campus_id: campus_id,
						goods_id: goods_id,
						teachers_id: teachers_id
					},
					fn: setStar
				})
			}else{
				console.log(this)
				messageList.init({
					name: 'getSchoolDetailPing',
					type: 'SchoolDetailPing',
					conditions: {
						campus_id: campus_id,
						goods_id: goods_id,
						teachers_id: teachers_id,
						type: index
					},
					fn: setStar
				})
			}
		})

		// 返回上一页
		Header.init();
	}
})