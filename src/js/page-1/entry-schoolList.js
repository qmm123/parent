// 1-校区列表页-入口
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
  "publicBusiness/categoryAiSort",
  // "publicBusiness/categoryTeachMode",
  // "publicBusiness/categorySelectSelect",
  "publicLogic/messageList"

], function (
	ajax, layer, ClassList, Header, categoryLocation, 
	categoryClass, categoryGrade, categoryAllTeacher, tabSwitchs, Method,
	categoryAiSort, 
	// categoryTeachMode, categorySelectSelect
	messageList
) {
	return function(){
		// 头部
		Header.init();
		Header.goSearchPage();

		// 顶部筛选tab
		// =顶部一级和下面一级
		tabSwitchs.tabSwitch(".order_sort_u a.tab_swi_a", ".search_tab");
		// =位置
		//categoryLocation.init({
		 // callClick: callLocation
		//});
		// =课程分类
		//categoryClass.init({
			//initCategoryName: Method.getUrlParam("category_class_name"),
			//initCategoryOneId: Method.getUrlParam("category_class_one_id"),
			//initCategoryTwoId: Method.getUrlParam("category_class_two_id"),
		  //callClick: callClass
		//});
		// =年部年级点击回调函数
		/*categoryGrade.init({
		  callClick: callGrade
		});*/
		// =全部老师点击回调函数
		/*categoryAllTeacher.init({
		  callClick: callAllTeacher
		});*/
		// =智能排序
		//categoryAiSort.init({
			//callClick: callAiSort
		//});
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

		// 数据预处理
		function fn(data) {
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
			return arr1.concat(arr2)
		}
		// 城市id
		var city_id = Method.getUrlParam('city_id') ? Method.getUrlParam('city_id') : '35';
		messageList.init({
			name: 'getSchoolList', // 请求接口
			type: 'SchoolList',	// 用于tab选项卡切换
			conditions: {
				city_id: city_id
			},
			fn: fn
		})
	}
});