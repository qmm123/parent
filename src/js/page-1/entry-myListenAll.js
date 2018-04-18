define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
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
	}
})