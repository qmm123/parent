// 1-课程列表页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/classList",
	"publicLogic/header",
	"publicBusiness/categoryLocation",
  "publicBusiness/categoryClass",
  "publicBusiness/categoryGrade",
  "publicBusiness/categoryAllTeacher",
  "publicBusiness/tabSwitch",
  "public/tools/method",
  // "publicBusiness/categoryAiSort",
  // "publicBusiness/categoryTeachMode",
  // "publicBusiness/categorySelectSelect",
], function (
	ajax, layer, ClassList, Header, categoryLocation, 
	categoryClass, categoryGrade, categoryAllTeacher, tabSwitchs, Method,
	// categoryAiSort, categoryTeachMode, categorySelectSelect
) {
	return function(){
		// 头部
		Header.init();
		Header.goSearchPage({a: 123}, function(){
			console.log(123);
		});

		// 顶部筛选tab
		// =顶部一级和下面一级
		tabSwitchs.tabSwitch(".order_sort_u a.tab_swi_a", ".search_tab");
		// =位置
		categoryLocation.init({
		  callClick: callLocation
		});
		// =课程分类
		categoryClass.init({
			initCategoryName: Method.getUrlParam("category_class_name"),
			initCategoryLevel: Method.getUrlParam("category_class_level"),
		  callClick: callClass
		});
		// =年部年级点击回调函数
		categoryGrade.init({
		  callClick: callGrade
		});
		// =全部老师点击回调函数
		categoryAllTeacher.init({
		  callClick: callAllTeacher
		});
		// =智能排序
		// categoryAiSort.init({
		// 	callClick: callAiSort
		// });
		// =授课模式
		// categoryTeachMode.init({
		// 	callClick: callTeachMode
		// });
		// =筛选(老师)
		// categorySelectSelect.init({
		// 	callClick: callSelectSelect
		// });
		function callLocation(id){
			console.log(id)
		}
		function callClass(level){
			console.log(level)
		}
		function callGrade(gradeId){
			console.log(gradeId)
		}
		function callAiSort(id){
			console.log(id)
		}
		function callTeachMode(id){
			console.log(id)
		}
		function callSelectSelect(val){
			console.log(val)
		}
		function callAllTeacher(id){
			console.log(id)
		}

		// 列表渲染
		ClassList.init();
	}

});