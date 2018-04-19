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
		Header.goSearchPage({a: 123}, function(paramNative, $this){
			console.log(paramNative, $this.html());
		});
		// 执行搜索的交互
		jsFun("wbClassList", function(paramNative){
			console.log(paramNative);
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
		function callLocation(id){
			console.log(id)
		}
		function callClass(level){
			console.log(level)
		}
		function callGrade(gradeId){
			console.log(gradeId)
		}
		function callAllTeacher(id){
			console.log(id)
		}

		// 列表渲染
		messageList.init({
			name: "getClassList"
		});
		// 跳转课程详情
		$(document).on("click", ".class_list_folder li", function(){
			nativeFun("toClassDetail", {"goods_id": $(this).data("goodsid")});
		})
	}

});