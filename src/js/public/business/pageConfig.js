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
		// 课程&评价-评价成功页
		"classEvaluationSuccess": "classEvaluationSuccess",

		// 校区-列表页
		"schoolList": "schoolList.html",
		// 校区-详情-主页
		"schoolDetailMain": "schoolDetailMain.html",
		// 校区-详情-课程页
		"schoolDetailClass": "schoolDetailClass.html",
		// 校区-详情-老师页
		"schoolDetailTeacher": "schoolDetailTeacher.html",
		// 校区-详情-评价页
		"schoolDetailEvaluation": "schoolDetailEvaluation.html",

		// 课程(班课)列表页
		"classList": "classList.html",
		// 课程(班课)详情页
		"classDetail": "classDetail.html",

		// 一对一-列表页
		"oneToOneList": "oneToOneList.html",
		// 一对一-详情页
		"oneToOneDetail": "oneToOneDetail.html",

		// 我的试听-全部页
		"myListenAll": "myListenAll.html",
		// 我的试听-待试听页
		"myListenWait": "myListenWait.html",

		// 老师-列表页
		"teacherList": "teacherList.html",
		// 老师详情-简介页
		"teacherDetailIntroduce": "teacherDetailIntroduce.html",
		// 老师详情-课程页
		"teacherDetailClass": "teacherDetailClass.html",
		// 老师详情-评论页
		"teacherDetailEvaluation": "teacherDetailEvaluation.html",

		// 滚动班-列表页
		"scrollClassList": "scrollClassList.html",
		// 滚动班-详情页
		"scrollClassDetail": "scrollClassDetail.html",

		// 系统设置-常见问题页
		"systemQuestion": "systemQuestion.html",
		// 系统设置-关于我们页
		"systemAboutUs": "systemAboutUs.html"
	};

	return pageConfig;
});