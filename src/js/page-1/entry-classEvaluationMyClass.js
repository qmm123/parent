define(["publicLogic/messageList"], function(messageList) {
	return function() {
		messageList.init({
			name: 'getClassPingMyClass',
			type: 'ClassPingMyClass',
		});
		// tab选项卡
		$('.tab a').on('tap', function() {
			var index = $(this).index();
			$(this).parent().find('a').removeClass('active');
			$(this).addClass('active');
			if(index == 0){
				messageList.init({
					name: 'getClassPingMyClass',
					type: 'ClassPingMyClass'
				})
			}else{
				messageList.init({
					name: 'getClassPingReceive',
					type: 'ClassPingReceive'
				});
			}
		})
	}
})