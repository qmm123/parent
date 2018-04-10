// 公共逻辑-课程列表页-班课
define([
	"publicService/service",
	"publicTool/method",
	"public/tools/scrollLoad",
], function (Service, Method, scrollLoad) {
	// 对象写法（避免出现new改变this指向问题）
	var ClassList = {
		// 初始化
		// 参数一 配置对象
		init: function(opt){
			var _this = this;
			this.configer(opt);
			// 首次渲染列表
			this.renderListInit(null, {}, function(data){
				// 滚动加载初始化
				_this.initScrollLoad();
			});
		},
		// 配置项
		// 参数一 配置对象
		configer: function(opt){
			var defaults = {
				listFolder: "classListFolder",//课程列表容器id
				classTpl: "TplClass",//课程模板
				emptyEle: "emptyContent"//数据为空元素id
			};
			this.config = $.extend(true, defaults, opt);
			// 获取元素
			this.ScrollLoad = null;//滚动加载对象
			this.listFolder = $("#" + this.config.listFolder);
			this.emptyEle = $("#" + this.config.emptyEle);
			// 每页条数
			this.pageSize = 10;//每页条数
			// 滚动加载插件的当前页码数及总页码数
			this.curPageScroll = 0;//默认是0页
			this.totalPageScroll = 0;//默认是0页
		},
		// 渲染列表-初始渲染
		// 参数一 接口配置项	参数二 接口参数	参数三 成功回调
		renderListInit: function(apiConfig, param, successCall){
			var _this = this;
			// 接口测试
			Service.getClassList(apiConfig, param, function(data){
				if(data.result.data && data.result.data.length){
					Method.artRender(_this.listFolder, _this.config.classTpl, data.result);
					_this.curPageScroll = 1;
					_this.totalPageScroll = data.result.total_page;
				}else{
					_this.renderEmpty(_this.listFolder, _this.emptyEle);
				}
				successCall && successCall(data);
			});
		},
		// 渲染列表-加载渲染
		// 参数一 接口参数	参数二 成功回调
		renderListLoad: function(param, successCall){
			var _this = this;
			_this.curPageScroll++;
			var defaults = {
				page_infos: {
					curr_page: _this.curPageScroll
				}
			};
			var param = $.extend(true, defaults, param);
			// 接口测试
			Service.getClassList(null, param, function(data){
				Method.artRender(_this.listFolder, _this.config.classTpl, data.result, true);
				successCall && successCall(data);
			}, function(){
				_this.curPageScroll--;
			});
		},
		// 初始化滚动加载对象
		initScrollLoad: function(){
			var _this = this;
			this.ScrollLoad = new scrollLoad({
				// 上拉加载
				pullUpFun: _this.pullUpAction,
				// 下拉刷新
				pullDownFun: _this.pullDownFun,
				curPage: _this.curPageScroll,
				totalPage: _this.totalPageScroll
			});
		},
		// 上拉加载函数
		// 参数一 滚动加载对象
		pullUpAction: function(IScroll){
			var _this = ClassList;
			console.log(_this)
			IScroll.refresh(1000, function(IScroll){
				_this.renderListLoad();
				IScroll.isPullUpLoad = true;
			})
		},
		// 下拉刷新
		pullDownFun: function(IScroll){
			var _this = this;
			IScroll.refresh(1000, function(IScroll){
				IScroll.isPullDownLoad = true;
			})
		},
		// 渲染数据为空
		// 参数一 列表元素(zq对象)
		// 参数二 为空元素(zq对象)
		renderEmpty: function(listEle, emptyEle){
			listEle.html("");
			emptyEle.removeClass("hide");
		}
	}
	

	return ClassList;
});