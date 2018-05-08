// 1-校区列表页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/messageList",
	"publicLogic/header",
	"publicBusiness/categoryLocation",
  "publicBusiness/categoryClass",
  "publicBusiness/tabSwitch",
  "public/tools/method",
  "public/business/jsFun",
  "public/business/nativeFun",
  "public/business/categoryAiSort"
], function (
	ajax, layer, messageList, Header, categoryLocation, 
	categoryClass, tabSwitchs, Method, jsFun, nativeFun, categoryAiSort
) {
	return function(){
		// 头部
		Header.init();
		Header.goSearchPage({"name": Header.searchEle.data("value") ? Header.searchEle.data("value") : ""});
		Header.clearSearchValue(function(){
			requeseDataList();
		});

		// 城市id
		var city_id = Method.getUrlParam('city_id');

		// 执行搜索的交互
		jsFun("wbSearchList", function(paramNative){
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
				lat: Method.getUrlParam("lat"),
				city_id: city_id
			};
			var oLocation = categoryLocation.getValue();
			var sClassLevel = categoryClass.getValue();
			var sAiSort = categoryAiSort.getValue();
			var sSearchVal = Header.searchEle.data("value");
			$.extend(true, oConditions, oLocation);
			oConditions.category = sClassLevel;
			oConditions.sort = sAiSort;
			if(sSearchVal){
				oConditions.campus_name = sSearchVal;
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
		// 智能排序
		categoryAiSort.init({
			callClick: requeseDataList
		})
		// 数据预处理
		function fn(result) {
			var data = result.data;
			var arr1 = [];
			var arr2 = [];
			for(var i = 0;i < data.length;i++) {
				var item = data[i];
				if(item.is_recommend == 1){
					arr1.push(item);
				}else if(item.is_recommend == 2) {
					arr2.push(item);
				}
			}
			arr1 = arr1.sort(function(a, b) {
				return b.recommend_sort - a.recommend_sort;
			})
			result.data = arr1.concat(arr2)
			return result;
		}

		// 列表渲染
		function requeseDataList(){
			messageList.init({
				name: 'getSchoolList', // 请求接口
				type: 'SchoolList',	// 用于tab选项卡切换
				fn: fn,
				conditions: getSearchConditons()
			})
		}
		requeseDataList();
		// 跳转校区详情
		var isTrue = true;
		$("#wrapper").on("click", ".item", function(){
			if(isTrue) {
				isTrue = false;
				nativeFun("toSchoolDetailMain", {"campus_id": $(this).data("id")});
			}
			setTimeout(function() {
				isTrue = true;
			})
		})
	}

});