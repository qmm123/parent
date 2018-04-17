define(["publicLogic/messageList",
	"public/tools/method"
	], function(messageList, Method) {
	return function() {
		messageList.init({
			name: 'getOneToOneList',
			type: 'OneToOneList'
		});
	}
})