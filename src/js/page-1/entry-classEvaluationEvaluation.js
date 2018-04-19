define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
	return function() {
		// 子订单id
		var sub_order_id = Method.getUrlParam('sub_order_id') ? Method.getUrlParam('sub_order_id') : "cec4c90ae145442ab9c3b2853613331e";
		messageList.init({
			name: 'getClassPingWantPing',
			type: 'ClassPingWantPing',
			data: {
				sub_order_id: sub_order_id
			},
			isPullUp: true
		});
	}
})