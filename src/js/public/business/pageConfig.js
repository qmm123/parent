// 页面url配置
define([
], function () {
	// 页面路径拼装规则 域名+/view/+模板编号+/+页面名称(下面对象的对应页面的键对应的值)
	// 域名(都是http协议)
	// 研发：apptpl.dev.xiaohe.com 仿真:apptpl.fangzhen.xiaohe.com 线上:apptpl.xiaohe.com
	var pageConfig = {
		// 首页
		"index": "index.html",
		// 消息列表页
		"messageList": "messageList.html",
		// 搜索内容页
		"searchPage": "searchPage.html",
		// 课表页
		"schedule": "schedule.html",
		// 课程&评价-我的课程页
		"classEvaluationMyClass": "classEvaluationMyClass.html",
		// 课程&评价-收到评价页
		"classEvaluationReceive": "classEvaluationReceive.html",
		// 课程&评价-评价记录页
		"classEvaluationRecord": "classEvaluationRecord.html",
		// 课程&评价-我要评价页
		"classEvaluationEvaluation": "classEvaluationEvaluation.html",
		// 课程&评价-写评价页
		"classEvaluationWriteEvaluation": "classEvaluationWriteEvaluation.html",
		// 课程&评价-考勤情况页
		"classEvaluationAttendance": "classEvaluationAttendance.html",

		
		// 课程(班课)列表页
		"classList": "classList.html",
		// 课程(班课)详情页
		"classDetail": "classDetail.html",
	};

	return pageConfig;
});