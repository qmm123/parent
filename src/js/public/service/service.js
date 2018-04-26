// 逻辑接口层统一封装
define([
	"public/tools/ajax",
	"publicBusiness/backEndStatusCode"
], function (ajax, backEndStatusCode) {
	var Service = {};

	// 公共方法
	// 参数1 接口配置项	参数2 接口基础参数	参数3 请求参数	参数4 请求成功的回调	参数5 请求失败的回调
	Service.commonLogic = function(apiConfig, basicOption, param, successCall, failCall){
		var option = basicOption ? basicOption : {};
		if(param){
			$.extend(true, option, param);
		}
		ajax({
			url: apiConfig.url,
			isShowLoading: !apiConfig.isShowLoading ? apiConfig.isShowLoading : true,
			data: {
				api_name: apiConfig.apiName,
				data: option
			}
		}, function(data){
			console.log(data);
			successCall && successCall(data);
		}, function(jqXhr, statusTxt, data){
			console.log(data)
			failCall && failCall(statusTxt, data);
		});
	}

	// 接口封装统一说明
	// 参数1 接口配置项 参数2 接口参数 参数3 成功回调 参数4 失败回调

	// 获取课程列表（班课）
	Service.getClassList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getGoodsList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			conditions: {
				merchant_id: localStorage.merchant_id
			},
			page_infos: {
				page_size: 10
			}
		}, param, successCall, failCall);
	}

	// 获取年部年级
	Service.getGoodsGrade = function(apiConfig, param, successCall, failCall){
		var option = {
			url: "/GoodsBasicdata/getGoodsGrade"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			merchant_id: localStorage.merchant_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 首页消息显示
	Service.getMessageList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/message/MessageManagement/getMessageList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			conditions: {
				user_id: localStorage.parent_id,
				merchant_id: localStorage.merchant_id,
				app_type: localStorage.app_type,
				app_key: localStorage.app_key
			}
		}, param, successCall, failCall);
	}

	// 课表-获取课表全部日期
	Service.getScheduleCourseListOpenDate = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getCourseListOpenDate"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			version: localStorage.version,
			conditions: {
				parent_id: localStorage.parent_id
			}
		}, param, successCall, failCall);
	}

	// 课表-获取课表
	Service.getScheduleCourseList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getCourseList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			conditions: {
				parent_id: localStorage.parent_id
			}
		}, param, successCall, failCall);
	}

	// 课表-学员列表
	Service.getScheduleStudentList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getStudentList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id
		}, param, successCall, failCall);
	}



	// 公共部分
	// 家长端_获取所在区域课程和校区数
	Service.getZoneClassCampus = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Campus/getRegionCampusGoodsNumber"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			version: localStorage.version,
			project_id: localStorage.project_id,
			type: 1//1->校区 2->课程 3->教师
		}, param, successCall, failCall);
	}

	// 家长端_获取分校校区
	Service.getZoneCampus = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Campus/getCampusListEasy"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			version: localStorage.version,
			project_id: localStorage.project_id,
			type: 1//1->校区 2->课程 3->教师
		}, param, successCall, failCall);
	}

	// 家长端_获取课程分类
	Service.getCategoriesList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Categories/getCategoriesList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			version: localStorage.version,
			project_id: localStorage.project_id,
			platform_id: backEndStatusCode.platform_id // 老接口 有的需要传
		}, param, successCall, failCall);
	}

	// 家长端_获取排课老师列表
	Service.getGoodsTeacherList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Campus/getGoodsTeacherList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			version: localStorage.version,
			project_id: localStorage.project_id,
			platform_id: backEndStatusCode.platform_id
		}, param, successCall, failCall);
	}

	// 课程&评价-我的课程
	Service.getClassPingMyClass = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getStudentCourse"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			version: localStorage.version,
			project_id: localStorage.project_id,
			conditions:{
				merchant_id: localStorage.merchant_id,
				parent_id: localStorage.parent_id,
			}
		}, param, successCall, failCall);
	}

	// 课程&评价-收到评价 (有)
	Service.getClassPingReceive = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/communion/UcComment/getComment"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			conditions:{
				merchant_id: localStorage.merchant_id,
				platform_id: backEndStatusCode.platform_id
			}
		}, param, successCall, failCall);
	}

	// 课程&评价-评价记录页 (you)
	Service.getClassPingRecord = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/communion/GcComment/getComment"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			version: localStorage.version,
			conditions:{
				merchant_id: localStorage.merchant_id,
				parent_id: backEndStatusCode.parent_id
			}
		}, param, successCall, failCall);
	}

	// 课程&评价-我要评价页
	Service.getClassPingWantPing = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/communion/GcComment/getParentGoodsCommunionShowContent"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 课程&评价-写评价页
	Service.getClassPingWritePing = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/communion/GcComment/addComment"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 课程&评价-考勤情况页
	Service.getClassPingQin = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/teaching/Attendance/getAttendanceStatusList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			platform_id: backEndStatusCode.platform_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 校区-列表页
	Service.getSchoolList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Campus/getCampusList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			version: localStorage.version,
			project_id: localStorage.project_id,
			conditions:{
				merchant_id: localStorage.merchant_id
			}
		}, param, successCall, failCall);
	}

	// 校区详情-主页?
	Service.getSchoolDetailMain = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Campus/getCampusDetails"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			version: localStorage.version,
			project_id: localStorage.project_id
		}, param, successCall, failCall);
	}


	// 校区详情-课程
	Service.getSchoolDetailClass = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getGoodsList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			conditions: {
				merchant_id: localStorage.merchant_id
			},
			page_infos: {
				page_size: 10
			}
		}, param, successCall, failCall);
	}

	// 校区详情-老师
	Service.getSchoolDetailTeacher = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Campus/getCampusTeacherList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			project_id: localStorage.project_id,
			version: localStorage.version,
		}, param, successCall, failCall);
	}

	// 校区详情-评价
	Service.getSchoolDetailPing = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Comment/getGoodsCommentList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			version: localStorage.version,
		}, param, successCall, failCall);
	}

	// 班课详情-课程信息
	Service.getClassDetailClass = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/getGoodsDetailInformation"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			version: localStorage.version,
			parent_id: localStorage.parent_id,
		}, param, successCall, failCall);
	}

	// 班课详情-评论信息
	Service.getClassDetailPing = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Comment/getGoodsCommentList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			version: localStorage.version,
		}, param, successCall, failCall);
	}

	// 班课详情-加入购物车
	Service.addParentShoppingCart = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/Goods/addParentShoppingCart"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			parent_id: localStorage.parent_id,
			platform_id: backEndStatusCode.platform_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 一对一-课程列表
	Service.getOneToOneList = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/GoodsOto/getOtoGoodsList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			conditions: {
				merchant_id: localStorage.merchant_id,
			},
			version: localStorage.version,
		}, param, successCall, failCall);
	}

	// 一对一-课程详情-基础信息
	Service.getOneToOneDetailBasic = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/GoodsOto/getBaseData"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id
		}, param, successCall, failCall);
	}

	// 一对一-课程详情
	Service.getOneToOneDetail = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/goods/GoodsOto/getOtoGoodsDetails"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			parent_id: localStorage.parent_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 我的试听-全部&待试听(通过type区分)
	Service.getMyListenAll = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/clue/ClueParentAudition/getParentAudition"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 老师-简介
	Service.getTeacherIntroduce = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/member/Employee/getTeacherDetail"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 滚动班-列表
	Service.getScrollList = function(apiConfig, param, successCall, failCall){
		var option = {
			url: "/CourseRoll/getCourseRollList"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			conditions: {
				merchant_id: localStorage.merchant_id
			},
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 滚动班-详情
	Service.getScrollDetail = function(apiConfig, param, successCall, failCall){
		var option = {
			url: "/CourseRoll/getCourseRollDetails"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 取消预约
	Service.cancelAudition = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/clue/ClueParentAudition/cancelAudition"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	// 系统设置-关于我们
	Service.getMerchantInfo = function(apiConfig, param, successCall, failCall){
		var option = {
			apiName: "",
			url: "/app/merchant/Merchant/getMerchantInfo"
		};
		if(apiConfig){
			$.extend(true, option, apiConfig);
		}
		Service.commonLogic(option, {
			merchant_id: localStorage.merchant_id,
			project_id: localStorage.project_id,
			version: localStorage.version
		}, param, successCall, failCall);
	}

	return Service;
})