define(["publicLogic/messageList"], function(messageList) {
	return function() {
		messageList.init({
			name: 'getClassPingQin',
			type: 'ClassPingQin'
		});
		/*messageList.init({
			name: 'getClassPingReceive'
		});*/
	}
})