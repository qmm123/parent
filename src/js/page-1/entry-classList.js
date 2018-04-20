// 1-课程列表页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/messageList",
	"publicLogic/header",
	"publicBusiness/categoryLocation",
  "publicBusiness/categoryClass",
  "publicBusiness/categoryGrade",
  "publicBusiness/categoryAllTeacher",
  "publicBusiness/tabSwitch",
  "public/tools/method",
  "public/business/jsFun",
  "public/business/nativeFun",
], function (
	ajax, layer, messageList, Header, categoryLocation, 
	categoryClass, categoryGrade, categoryAllTeacher, tabSwitchs, Method, jsFun, nativeFun
) {
	return function(){
		// 头部
		Header.init();
		Header.goSearchPage({"name": Header.searchEle.data("value") ? Header.searchEle.data("value") : ""});
		Header.clearSearchValue(function(){
			requeseDataList();
		});
		// 执行搜索的交互
		jsFun("wbClassList", function(paramNative){
			var oParam = JSON.parse(paramNative);
			Header.searchEle.html(oParam.name).data("value", oParam.name);
			Header.searchShutEle.show();
			requeseDataList();
		});
		
		// 获取搜索条件
		function getSearchConditons(){
			// 搜索条件
			var oConditions = {
				lng: Method.getUrlParam("lng"),
				lat: Method.getUrlParam("lat")
			};
			var oLocation = categoryLocation.getValue();
			var sClassLevel = categoryClass.getValue();
			var sGradeLevel = categoryGrade.getValue();
			var sTeacherVal = categoryAllTeacher.getValue();
			var sSearchVal = Header.searchEle.data("value");
			$.extend(true, oConditions, oLocation);
			oConditions.category = sClassLevel;
			oConditions.grade_id = sGradeLevel;
			oConditions.teacher_id = sTeacherVal;
			if(sSearchVal){
				oConditions.goods_name = sSearchVal;
			}
			return oConditions;
		}

		// 顶部筛选tab
		// =顶部一级和下面一级
		tabSwitchs.tabSwitch(".order_sort_u a.tab_swi_a", ".search_tab");
		// =位置
		categoryLocation.init({
		  callClick: requeseDataList
		});
		// =课程分类
		console.log(window.location.href);
		categoryClass.init({
			initCategoryName: Method.getUrlParam("name"),
			initCategoryLevel: Method.getUrlParam("category_class_level"),
		  callClick: requeseDataList
		});
		// =年部年级点击回调函数
		categoryGrade.init({
		  callClick: requeseDataList
		});
		// =全部老师点击回调函数
		categoryAllTeacher.init({
		  callClick: requeseDataList
		});

		// 列表渲染
		function requeseDataList(){
			messageList.init({
				name: "getClassList",
				emptyEle: "emptyContent",
				conditions: getSearchConditons()
			});
		}
		requeseDataList();
		// 跳转课程详情
		$(document).on("click", ".class_list_folder li", function(){
			nativeFun("toClassDetail", {"goods_id": $(this).data("goodsid")});
		})
	}

});