// 1-课程列表页-入口
define([
	"public/tools/ajax",
	"publicBusiness/layerFz",
	"publicLogic/classList",
	"publicLogic/header",
	"publicBusiness/topCategory"
], function (ajax, layer, ClassList, Header, TopCategory) {
	return function(){
		// 头部
		Header.init();
		Header.goSearchPage();

		// 顶部筛选tab
		TopCategory.init();
		
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

		// 列表渲染
		// new ClassList();
		// ClassList.init();
	}

});