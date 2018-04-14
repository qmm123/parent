define(["publicLogic/messageList"], function(messageList) {
	return function() {
		messageList.init({
			name: 'getClassPingRecord',
			type: 'ClassPingRecord'
		});
	}
})