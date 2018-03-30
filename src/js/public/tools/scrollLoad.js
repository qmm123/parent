// 滚动加载类
define([
	"public/tools/method",
	"iScroll",
	"style!lib/js/iscroll/iscroll",
], function (Method, iScroll) {
	var IScroll = function(opt){
		this.config(opt);
		this.renderPullHandle();
		if(this.config.isPullDownFun){
			this.pullDownEle = $("#" + this.config.pullDownEle);//上拉元素
		}
		if(this.config.isPullUpFun){
			this.pullUpEle = $("#" + this.config.pullUpEle);//下拉元素
		}
		if(this.config.isPullUpFun){
			this.pullUpOffset = this.pullUpEle.get(0).offsetHeight;
		}
		this.init();
		this.ShowHidePullUpStatus();
	}

	// 配置参数
	IScroll.prototype.config = function(opt){
		var defaults = {
			ele: "wrapper",//滚动加载绑定的大容器
			pullContain: "ScrollContent",//滚动加载追加元素大容器
			pullDownEle: "pullDown",//上拉展示元素
			pullUpEle: "pullUp",//下拉展示元素
			pullDownFun: "",//下拉刷新
			pullUpFun: "",//上拉加载
			isPullDownFun: true,//是否下拉刷新
			isPullUpFun: true,//是否上拉加载
			refreshTimeDelay: 1000,//刷新延时时长
			loadEndTxt: "已经到底了",//刷新延时时长
			curPage: 1,//上拉加载当前页
			totalPage: 2,//上拉加载总页
			scrollMoveFun: "",//滑动回调函数
			scrollEndFun: "",//滑动结束回调函数
		}
		this.iScroll = null;//滚动加载对象
		this.controlerVar = true;
		this.client_top_refresh = 180;
		this.client_height = Method.getViewPortSize().height;
		this.isPullDownLoad = true;//上拉刷新布尔值
		this.isPullUpLoad = true;//下拉加载布尔值-防止多次请求
		this.isLoadEnd = true;//数据是否加载完毕

		this.config = $.extend({}, defaults, opt);//类配置
		this.pullDownOffset = this.config.isPullDownFun ? 40 : 0;

		this.pullContain = $("#" + this.config.pullContain);//追加元素大容器
		if(this.config.isPullDownFun){
			this.pullDownEle = $("#" + this.config.pullDownEle);//上拉元素
		}
		if(this.config.isPullUpFun){
			this.pullUpEle = $("#" + this.config.pullUpEle);//下拉元素
		}

	}

	// 初始化方法
	IScroll.prototype.init = function(){
		var _this = this;
		this.iScroll = new iScroll(this.config.ele, {
			topOffset: _this.pullDownOffset,
			HWCompositing:false,  
			fixedScrollbar:false,              　
			// 监听刷新结果
			onRefresh: function () {
				if (_this.config.isPullDownFun && _this.pullDownEle.get(0).className.match('loading')) {
					// 下拉刷新
					_this.pullDownEle.get(0).className = 'pullDown';
					_this.pullDownEle.find('.pullDownLabel').get(0).innerHTML = '下拉刷新';
				} else if (_this.config.isPullUpFun && _this.pullUpEle.get(0).className.match('loading')) {
					// 上拉加载
					if(_this.config.totalPage != _this.config.curPage){
						_this.pullUpEle.get(0).className = 'pullUp';
						_this.pullUpEle.find('.pullUpLabel').get(0).innerHTML = '上拉加载';
					}
				}
			},
			onTouchEnd:function(){},
			onBeforeScrollEnd:function(){},
			onScrollMove: function () {
				// 滑动回调函数
				_this.config.scrollMoveFun && _this.config.scrollMoveFun(this.y);

				// 解决: 已经是暂无更多数据  再次拉的时候上下箭头恢复
				if (_this.config.isPullUpFun && _this.pullUpEle.find('.pullUpLabel').text().indexOf('暂无') === -1) {
					_this.pullUpEle.find('.pullUpIcon').css('display', 'block');
				}
				// if(isQQIn()){
					// 下拉加载更多上移一定距离后强制刷新
					if((_this.client_height - _this.pullUpEle.offset().top) > _this.client_top_refresh){
						_this.iScroll.refresh();
					}
				// }
				// 解决卡顿
				if(_this.controlerVar){
					_this.iScroll.refresh();
					_this.controlerVar = false;
				}
				if (_this.config.isPullDownFun && this.y > 5 && !_this.pullDownEle.get(0).className.match('flip')) {
					_this.pullDownEle.get(0).className += ' flip';
					_this.pullDownEle.find('.pullDownLabel').get(0).innerHTML = '释放刷新';
					this.minScrollY = 0;
				} else if (_this.config.isPullDownFun && this.y < 5 && _this.pullDownEle.get(0).className.match('flip')) {
					_this.pullDownEle.get(0).className = 'pullDown';
					_this.pullDownEle.find('.pullDownLabel').get(0).innerHTML = '下拉刷新';
					this.minScrollY = -_this.pullDownOffset;
				} else if ( _this.isLoadEnd && _this.config.isPullUpFun && this.y < (this.maxScrollY - 5) && !_this.pullUpEle.get(0).className.match('flip')) {
					_this.pullUpEle.get(0).className += ' flip';
					_this.pullUpEle.find('.pullUpLabel').get(0).innerHTML = '加载更多';
					this.maxScrollY = this.maxScrollY;
				} else if ( _this.isLoadEnd && _this.config.isPullUpFun && this.y > (this.maxScrollY + 5) && _this.pullUpEle.get(0).className.match('flip')) {
					_this.pullUpEle.get(0).className = 'pullUp';
					_this.pullUpEle.find('.pullUpLabel').get(0).innerHTML = '上拉加载';
					this.maxScrollY = _this.pullUpOffset;
				}
			},
			onScrollEnd: function () {
				// 滑动结束回调函数
				_this.config.scrollEndFun && _this.config.scrollEndFun(this.y);

				if (_this.isPullDownLoad && _this.config.isPullDownFun && _this.pullDownEle.get(0).className.match('flip')) {
					_this.pullDownEle.get(0).className += ' loading';
					_this.pullDownEle.find('.pullDownLabel').get(0).innerHTML = '刷新中，请稍后';				
					_this.isPullDownLoad = false;
					// 执行回调函数
					_this.config.isPullDownFun && _this.config.pullDownFun && _this.config.pullDownFun(_this, _this.iScroll);
				} else if (_this.isPullUpLoad && _this.config.isPullUpFun && _this.isLoadEnd && _this.pullUpEle.get(0).className.match('flip')) {
					_this.pullUpEle.get(0).className += ' loading';
					_this.pullUpEle.find('.pullUpLabel').get(0).innerHTML = '正在加载';
					_this.isPullUpLoad = false;
					// 执行回调函数
					_this.config.isPullUpFun && _this.config.pullUpFun && _this.config.pullUpFun(_this, _this.iScroll, _this.config.curPage);
				}
			}
		});
	}

	// 显示隐藏上拉加载元素
	IScroll.prototype.ShowHidePullUpStatus = function(){
		// 到底
		if( this.config.isPullUpFun && (this.config.totalPage > 1) && (this.config.curPage == this.config.totalPage) ){
			this.ChangePullUpStatus(true);
			this.pullUpEle.show();
			this.refresh(300);
			this.isLoadEnd = false;
			return;
		}
		// 隐藏
		if( this.config.isPullUpFun && (this.config.curPage == this.config.totalPage) ){
			this.pullUpEle.hide();
			this.refresh(300);
			this.isLoadEnd = false;
			return;
		}
		// 显示
		if( this.config.isPullUpFun && (this.config.curPage < this.config.totalPage) ){
			this.ChangePullUpStatus();
			this.pullUpEle.show();
			this.refresh(300);
			this.isLoadEnd = true;
		}
	}
	// 显示上拉元素

	// 上拉加载数据加载状态改变
	// 参数 是否加载完毕 true -> 加载完毕
	IScroll.prototype.ChangePullUpStatus = function(isEnd){
		if(isEnd){
			this.pullUpEle.get(0).className = 'pullUp no_bgc';
			this.pullUpEle.find('.pullUpLabel').get(0).innerHTML = this.config.loadEndTxt;
		}else{
			this.pullUpEle.get(0).className = 'pullUp';
			this.pullUpEle.find('.pullUpLabel').get(0).innerHTML = "上拉加载";
		}
	}

	// 渲染上下拉元素
	IScroll.prototype.renderPullHandle = function(){
		if(this.config.isPullDownFun && !this.pullDownEle.length){
			$( this.getPullUpTpl() ).insertBefore(this.pullContain);
		}
		if(this.config.isPullUpFun && !this.pullUpEle.length){
			$( this.getPullDownTpl() ).insertAfter(this.pullContain);
		}
	}

	// 上拉加载模板
	IScroll.prototype.getPullUpTpl = function(){
		var sTpl = '<div id="'+ this.config.pullDownEle +'" class="'+ this.config.pullDownEle +'">' +
									'<div>' +
										'<span class="pullDownIcon"></span>' +
										'<span class="pullDownLabel">下拉刷新</span>' +
									'</div>' +
								'</div>';
		return sTpl;
	}
	// 下拉加载模板
	IScroll.prototype.getPullDownTpl = function(){
		var sTpl = '<div id="'+ this.config.pullUpEle +'" class="'+ this.config.pullUpEle +'">' +
									'<div>' +
										'<span class="pullUpIcon"></span>' +
										'<span class="pullUpLabel">上拉加载</span>' +
									'</div>' +
								'</div>';
		return sTpl;
	}

	// 滚动区域更新
	// 参数一 延时时长
	// 参数二 滚动组件refresh之前的回调
	// 参数三 滚动组件refresh之后的回调
	IScroll.prototype.refresh = function(time, callBefore, callAfter){
		var _this = this;
		setTimeout(function () {	
			callBefore && callBefore(_this);
			// 请再此请求出数据刷新
			_this.iScroll.refresh();
			callAfter && callAfter(_this);
			return;
		}, time ? time : _this.config.refreshTimeDelay);
	}

	return IScroll;
	
})