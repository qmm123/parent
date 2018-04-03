// 1-课程列表页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicBusiness/tabSwitch",
	"publicBusiness/nativeFun",
	"publicLogic/classList"
], function (ajax, layer, tabSwitchs, nativeFun, ClassList) {
	/*layer.msg({
		content: "课程列表页"
	});*/
	return function(){
			// 顶部选项卡
			tabSwitchs.tabSwitch(".order_sort_u a.tab_swi_a", ".search_tab");

			tabSwitchs.secondSwitch("#location_fu .left_area .switch_a.area_d_a", "#location_fu .right_area_d");

			tabSwitchs.secondSwitch("#classify .left_area .switch_a.area_d_a", "#classify .right_area_d");
			
			tabSwitchs.thirdSwitch("#classify .switch_a.area_r");

			// 顶部筛选tab
			// 点击标签添加样式
			$('.search_tabs .search_tab .sidebar .main .qujian_zone:not(.unit_price) ul li span').on('tap',function(){
				$(this).hasClass('on')?$(this).removeClass('on'):$(this).addClass('on');
			});
			$('.search_tabs .search_tab .sidebar .main .unit_price ul li span').on('tap',function(){
				$(this).hasClass('on')?$(this).removeClass('on'):$(this).addClass('on').parent('li').siblings().children('span').removeClass('on');
			});
			// 重置按钮
			$('[data-role="reset"]').on('tap',function(){
				$('.search_tabs .search_tab .sidebar .main .qujian_zone ul li span').removeClass('on');
			});
			// 确定按钮
			$('.bottom_ctrl .ok').on('tap',function(){
				$('.search_tab').removeClass('on');
				$('.order_sort_u li a').removeClass('on');
				$('.marsk_opcity').remove();
			});

			// 顶部-搜索条件跳转
			$("header .search input").click(function(ev){
				
			})
			// 顶部-返回按钮
			$("header .back").click(function(ev){
				nativeFun("toIndex");
			})

			// 列表渲染
			// new ClassList();
			// ClassList.init();
			
		}
});