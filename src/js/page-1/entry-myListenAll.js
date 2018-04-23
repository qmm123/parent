define(["publicLogic/messageList",
	"public/tools/method",
	"publicService/service",
	"publicLogic/header"
	], function(messageList, Method, Server, Header) {
	return function() {

		var parent_id = Method.getUrlParam('parent_id') ? Method.getUrlParam('parent_id') : "3c1b0646ce520407a0fedfd17f3a56b6";
		messageList.init({
			name: 'getMyListenAll',
			type: 'MyListenAll',
			conditions: {
				parent_id: parent_id,
				name: 'world'
			},
			data: {
				name: 'hello'
			}
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
					}
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

					}
				});
			}
			$('.tab a').removeClass('active');
			$(this).addClass('active');
		})

		// 取消试听
		$('#wrapper').on('click', '.btn span', function() {
			var id = $(this).data('goods_id');
			var modifier_id = localStorage.parent_id;
			Server.cancelAudition(null, {id: id, modifier_id: modifier_id}, function(data) {
				console.log(data)
			}, function(err) {
				console.log(err);
			})
		})
		// 返回上一页
		Header.init();
	}
})