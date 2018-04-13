
define([
	"publicService/service",
	"publicTool/method",
	"public/tools/scrollLoad"
], function (Server, Method, BScroll) {
	var ClassList = {

		// 配置参数
		setOptions: function(opt) {
			var defaults = {
				listFolder: "wrapper", // 滚动容器id
				listWrapper: "listContainer", // 列表id
				classTpl: "TplClass", // 模板id
				emptyEle: "empty", // 空元素id
			}
			this.options = $.extend(true, defaults, opt);
			this.scroll = null; // 滚动对象
			this.listFolder = $("#" + this.options.listFolder);
			this.listWrapper = $('#' + this.options.listWrapper);
			this.emptyEle = $("." + this.options.emptyEle);
			this.pageSize = 10; // 每条页数
			this.currentPage = 0; // 当前页
			this.totalPage = 0; // 总页数
		},

		//初始化
		init: function(opt) {
			var _this = this;
			this.setOptions(opt);
			this.renderList(null, {}, function() {
				_this.initScroll();
			}, function() {
			})
		},

		// 渲染列表 
		// 参数一 接口配置项 参数二 接口参数 参数三 成功回调
		renderList: function(apiConfid, param, successCallback, errorCallback) {
			var _this = this;
			// 请求数据
			Server.getMessageList(apiConfid, param, function(data) {
				if(data.result.data && data.result.data.length > 0) {
					Method.artRender(_this.listWrapper, _this.options.classTpl, data.result, false, function() {
						console.log(data.result.data);
						_this.totalPage = data.result.total_page;
						$('.pullDown').show();
						$('.pullUp').show();
						successCallback && successCallback(data);
					});
				}else {
					_this.renderEmpty(_this.listFolder, _this.emptyEle);
				}
			}, function() {
				errorCallback && errorCallback();
			})
		},
		// 加载跟多 
		// 参数一 接口参数 参数二 成功回调
		getListMore: function(param, successCallback, errorCallback) {
			var _this = this;
			_this.currentPage++;
			var options = {
				page_infos: {
					curr_page: _this.currentPage
				}
			}
			var param = $.extend(true, options, param);

			// 请求数据
			Server.getMessageList(null, param, function(data) {
				Method.artRender(_this.listWrapper, _this.options.classTpl, data.result, true, function() {
					successCallback && successCallback(data);
				})
			}, function() {
				_this.currentPage--;
				errorCallback && errorCallback();
			})
		},

		// 初始化滚动加载对象
		initScroll: function() {
			var _this = this;
			var wrapper = this.listFolder[0];
			this.scroll = new BScroll({
				el: wrapper,
				pullDownRefresh: {
				  	threshold: 50,
				  	stop: 50
				},
				momentumLimitDistance: 30,
				pullUpLoad: {
					threshold: 50
				}
			})

			// 下拉刷新
			this.listFolder.on('pullingDown', function() {
				_this.renderList(null, {}, function(data) {
					if(data.status){
						_this.scroll.forceUpdate({success: true});
						_this.currentPage = 0;
						console.log('下拉刷新')
					}else {
						_this.scroll.forceUpdate({success: false});
					}
				}, function() {
					_this.scroll.forceUpdate({success: false});
				})
			})
			// 上拉加载
			this.listFolder.on('pullingUp', function() {
				console.log(_this.currentPage+ '====='+ _this.totalPage)
				if(_this.currentPage >= Number(_this.totalPage) - 1) {
					_this.scroll.forceUpdate({success: true, data: false})
					console.log('无数据')
				}else {
					_this.getListMore(null, function(data) {
						if(data.status) {
							if(data.result.data && data.result.data.length > 0){
								console.log('请求成功，有数据'+_this.currentPage)
								_this.scroll.forceUpdate({success: true, data: true});
							}else{
								_this.scroll.forceUpdate({success: true, data: false});
								console.log('请求成功，无数据')
							}
						}else{
							_this.scroll.forceUpdate({success: false});
							console.log('请求失败1')
						}
					}, function() {
						_this.scroll.forceUpdate({success: false});
						console.log('请求失败2')
					})
				}
				
			})
		},
		// 暂无数据
		renderEmpty: function(listEle, emptyEle){
			listEle.html("");
			emptyEle.removeClass("hide");
		}
	}
	return {
		init: function(opt) {
			ClassList.init(opt)
		}
	};
});