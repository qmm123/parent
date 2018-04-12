// 1-消息列表-入口
define([
	"publicLogic/messageList"
], function (messageList) {
	return function() {
		messageList.init({});
	}
});