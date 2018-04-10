// 页面url配置
define([
], function () {
	// 域名拼装规则 域名+/view/+模板编号+/+页面名称(下面对象的对应页面的键值)
	var pageConfig = {
		// 首页
		"index": "index.html",
		// 消息列表页
		"messageList": "messageList.html",
		// 搜索内容页
		"searchPage": "searchPage.html",
		// 课表页
		"schedule": "schedule.html",
		// 课程列表页
		"classList": "classList.html",
	};

	return pageConfig;
});