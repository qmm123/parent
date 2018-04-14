define(["publicLogic/messageList"], function(messageList) {
	return function() {
		messageList.init({
			name: 'getClassPingWantPing',
			type: 'ClassPingWantPing'
		});
	}
})