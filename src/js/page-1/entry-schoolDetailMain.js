// 1-校区详情主页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/header",
  "public/tools/method",
], function (
	ajax, layer, Header, Method,
) {
	return function(){
		// 头部
		Header.init();
		Header.goSearchPage();

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
			initCategoryOneId: Method.getUrlParam("category_class_one_id"),
			initCategoryTwoId: Method.getUrlParam("category_class_two_id"),
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
		// new ClassList();
		// ClassList.init();
	}

});