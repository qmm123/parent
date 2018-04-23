// js原生交互-原生注册方法供h5调用(方法名取键名)
define([
], function () {
	var nativeFunConfig = {
		// 功能性部分
		logout: "logout",//登出
		goBack: "goBack",//返回上一页
		// H5部分(页面由H5做)
		toSchedule: "toSchedule",//去课表页

		toClassEvaluationMyClass: "toClassEvaluationMyClass",//去课程&评价-我的课程页
		toClassEvaluationReceive: "toClassEvaluationReceive",//去课程&评价-收到评价页
		toClassEvaluationRecord: "toClassEvaluationRecord",//去课程&评价-评价记录页
		toClassEvaluationEvaluation: "toClassEvaluationEvaluation",//去课程&评价-我要评价页
		toClassEvaluationWriteEvaluation: "toClassEvaluationWriteEvaluation",//去课程&评价-写评价页
		toClassEvaluationAttendance: "toClassEvaluationAttendance",//去课程&评价-考勤情况页
		toClassEvaluationSuccess: "toClassEvaluationSuccess",//去课程&评价-评价成功页

		toSchoolDetailMain: "toSchoolDetailMain",//去校区-详情-主页
		toSchoolDetailEvaluation: "toSchoolDetailEvaluation",//去校区-详情-评价页

		toClassDetail: "toClassDetail",//去课程(班课)详情页

		toOneToOneDetail: "toOneToOneDetail",//去一对一-详情页

		toTeacherDetailIntroduce: "toTeacherDetailIntroduce",//去老师详情-简介页

		toScrollClassDetail: "toScrollClassDetail",//去滚动班-详情页

		toSystemQuestion: "toSystemQuestion",//去系统设置-常见问题页
		toSystemAboutUs: "toSystemAboutUs",//去系统设置-关于我们页

		// 原生部分(页面由原生做)
		toSchoolPhotoVideo: "toSchoolPhotoVideo",//去校区相册视频页
		toSearchPage: "toSearchPage",//去搜索页
		toHomework: "toHomework",//去孩子作业页
		toRetire: "toRetire", //去退班页
		toMyChild: "toMyChild", // 去我的孩子页 
		toOneToOneEnroll: "toOneToOneEnroll", // 去一对一报名页

		// 逻辑代码部分(调用原生的逻辑代码)
		lgChaBan: "lgChaBan"//插班
	};

	// 参数一（flag）方法标识
	// 参数二（param）传给原生的参数
	// 参数三（call）原生给js的回调（参数是原生给js传递的参数）
	function nativeFun(flag, param, call){
		try{
			WebViewJavascriptBridge.callHandler(nativeFunConfig[flag], param, function(res){
				call && call(res);
			});
		}catch(e){
			console.log("WebViewJavascriptBridge对象没有被加载进来，这个交互只有到原生App里面调用才会执行！");
		}
    
	}

	return nativeFun;
});