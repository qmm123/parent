define(["publicLogic/messageList",
	"public/tools/method",
	"publicService/service",
	"publicLogic/header",
	"public/business/nativeFun",
	"public/business/layerFz",
	"public/business/jsFun"
	], function(messageList, Method, Server, Header, nativeFun, layer, jsFun) {
	return function() {
		// 数据预处理
		function fn(result) {
			console.log(result);
			var data = result.data;
			for(var i=0;i<data.length;i++){
				var item = data[i];
				if(item.status == 5){
					var audition_date = item.audition_date;
					var audition_time = item.audition_time;
					var time = audition_date +" " + audition_time.split('-')[0];
					time = new Date(time).getTime();
					var current_time = new Date().getTime();
					if(time < current_time) {
						item.isStatus = false;
					}else{
						item.isStatus = true;
					}
				}
			}
			return result;
		}
		var parent_id = localStorage.parent_id ? localStorage.parent_id : "3c1b0646ce520407a0fedfd17f3a56b6";
		messageList.init({
			name: 'getMyListenAll',
			type: 'MyListenAll',
			conditions: {
				parent_id: parent_id
			},
			fn: fn
		});
		// 执行刷新的交互
		jsFun("wbReload", function(){
			window.location.reload();
		});
		// tab
		var index = 0;
		$('.tab a').on('tap', function() {
			var _index = $(this).index();
			if(index == _index) {
				return
			}
			index = _index;
			if(index == 0) {
				messageList.init({
					name: 'getMyListenAll',
					type: 'MyListenAll',
					conditions: {
						parent_id: parent_id
					},
					fn: fn
				});
			}else{
				messageList.init({
					name: 'getMyListenAll',
					type: 'MyListenAll',
					conditions: {
						parent_id: parent_id,
						status: 5
					},
					data: {

					},
					fn: fn
				});
			}
			$('.tab a').removeClass('active');
			$(this).addClass('active');
		})
		
		// 取消试听
		$('#wrapper').on('click', '.btn[data-tab="1"] span', function() {
			var _this = this;
			console.log(11111111111)
			var audition_date = $(this).data('audition_date');
			var audition_time = $(this).data('audition_time');
			var time = audition_date +" " + audition_time.split('-')[0];
			time = new Date(time).getTime();
			var current_time = new Date().getTime();
			if(time < current_time){
				layer.msg({
					content: "预约以过期",
					time: 1
				})	
			}else{
				if((current_time + 2*60*60*1000) > time){
					layer.msg({
						content: "马上就要开课啦，无法取消",
						time: 1
					})
				}else{
					layer.confirm({
						yes: function(index1){
							var id = $(_this).data('goods_id');
							var modifier_id = localStorage.parent_id;
							Server.cancelAudition(null, {id: id, modifier_id: modifier_id}, function(data) {
								console.log(data);
								if(index == 1){
									$(_this).parent().parent().remove();
								}else{
									console.log('成功');
									setTimeout(function() {
										/*messageList.init({
											name: 'getMyListenAll',
											type: 'MyListenAll',
											conditions: {
												parent_id: parent_id
											},
											fn: fn
										});*/
										$('#wrapper .btn[data-tab="1"] span').html('重新预约').parent().data('tab', '2');
										$('#wrapper .item .not').html('已取消');
									}, 20)
								}
							}, function(err) {
								console.log(err);
							})
							//console.log(modifier_id)
							layer.close(index1);
						},
						no: function(){
							
						},
						btn: ["确定", "取消"],
						content: "确认取消试听么?"
					});
				}
			}
		})
		// 重新预约
		$('#wrapper').on('click', '.btn[data-tab="2"] span', function() {
			nativeFun("toRescheduling", {
				"goods_id": $(this).data('goods_id'),
				"name": $(this).data('goods_name')
			})
			console.log(333)
		})
		// 返回上一页
		Header.init();
	}
})