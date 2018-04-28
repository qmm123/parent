define([
	'BScroll',
	"style!lib/js/bscroll/bscroll"
	], function(BScroll){
	var bScroll = function (config) {
		var _this = this;
		setTimeout(function() {
			_this.initScroll(config);
		}, 20)
	}
	var bounceTime = 800; // 回弹动画的动画时长;
	bScroll.prototype.initScroll = function (config) {
		var options = { // 初始化参数
			click: config.click || true,
			probeType: config.probeType || 0,
			scrollX: config.scrollX || false, // 横向滚动
			scrollY: config.scrollY || true,  // 竖向滚动 (默认)
			pullDownRefresh: config.pullDownRefresh || null, // 下拉刷新
			pullUpLoad: config.pullUpLoad || null, // 上拉加载
			momentumLimitDistance: config.momentumLimitDistance || 20
		}
		this.config = config;
		this.obj = { // 下拉刷新和上拉刷新一系列过程
			pullDownInitTop: 50, // 下拉元素初始位置
			beforePullDown: true,
			isPullingDown: false,
			isRebounding: false,
			isPullUpload: false,
			isData: true,
			isPullDowning: false
		}
		this.scroll = null;
		this.scroll = new BScroll(this.config.el, options);
		if(this.config.pullDownRefresh) { // 下拉刷新
			this._initPullDownRefresh();
		}else{
			
		}
		if(this.config.pullUpLoad) {
			this._initPullUpLoad();
		}
	}

	bScroll.prototype.forceUpdate = function(dirty) { // 数据请求成功后调用
		var _this = this;
		if(this.config.pullDownRefresh && this.obj.isPullingDown) {
			this.obj.isPullingDown = false;
			this._reboundPullDown().then(function() {
				_this._afterPullDown(dirty);
			})
		} else if (this.config.pullUpLoad && this.obj.isPullUpload) {
			this.obj.isPullUpload = false;
			if(dirty.success){
				if(!dirty.data){
					$('.pullUp').removeClass('loading').addClass('no_bgc').find('.pullUpLabel').text("没有数据了");
					_this.obj.isData = false;
				}else{
					this.scroll.finishPullUp();
					$('.pullUp').removeClass('loading').find('.pullUpLabel').text("上拉刷新");
				}
			}else{
				$('.pullUp').removeClass('loading').addClass('no_bgc').find('.pullUpLabel').text("加载失败")
			}
			this.refresh();
		}
	}

	bScroll.prototype._initPullDownRefresh = function() { 
		$('.pullDown').remove();
		if(!$('.pullDown').length) {
			var str = '<div class="pullDown"><div><span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新</span></div></div>';
			$(this.config.el).find('>div').prepend(str)
		}
		$('.pullDown').css("visibility" , 'visible');
		var _this = this;
		this.scroll.on('pullingDown', function() { // 松手

			_this.obj.beforePullDown = false;
			_this.obj.isPullingDown = true;
			_this.obj.isPullDowning = true;
			$(_this.config.el).trigger('pullingDown'); // 派发事件 请求数据
			$('.pullDown').addClass('loading');
			$('.pullDown .pullDownLabel').html('刷新中,请稍后');
		})

		this.scroll.on('scroll', function(pos) { // 监听滚动事件
			if(!_this.config.pullDownRefresh) {
				return
			}
			var isDown = true;
			if(_this.obj.beforePullDown) { // 下拉前
				var top = Math.max(Math.min(pos.y - _this.obj.pullDownInitTop , 10), -50);
				//$(".pullDown").css({top: top + "px"});
				// console.log('下拉', + top);
				
			}
			if(pos.y > 50 && isDown && !_this.obj.isPullDowning){ // 下拉加载
				isDown = false;
				$('.pullDown').addClass('flip');
				$('.pullDown .pullDownLabel').html('释放刷新');
			}else if(pos.y <= 5){
				$('.pullDown').removeClass('flip');
				$('.pullDown .pullDownLabel').html('下拉刷新');
			}
			if(_this.obj.isRebounding) {
				var top = 10 - (_this.config.pullDownRefresh.stop - pos.y);
				// $(".pullDown").css({top: top + "px"});
			}
		})
	}

	bScroll.prototype._reboundPullDown = function (dirty) { // 
		var stopTime = 600;
		var _this = this;
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				_this.obj.isRebounding = true;
				_this.scroll.finishPullDown();
				resolve()
			}, stopTime)
		})
	}

	bScroll.prototype._afterPullDown = function (dirty) { // 下拉刷新结束
		var _this = this;
		setTimeout(function() {
			 var top = - _this.obj.pullDownInitTop;
			// $(".pullDown").css({top: top + "px"})
			 $(".pullDown").removeClass('flip loading');
			 $('.pullDown .pullDownLabel').html('下拉刷新');
			 _this.obj.beforePullDown = true;
			 _this.obj.isRebounding = false;
			 _this.obj.isPullDowning = false;
			 _this.refresh()
			 if(_this.config.pullUpLoad && dirty.success && !_this.obj.isData) {
			 	_this.obj.isData = true;
			 	_this.scroll.finishPullUp();
			 	$('.pullUp').removeClass('no_bgc loading').find('.pullUpLabel').text('上拉加载')
			 }
		}, bounceTime + 50)
	}

	bScroll.prototype.refresh = function () { // dom改变时重新计算滚动
		var _this = this;
		setTimeout(function() {
			_this.scroll && _this.scroll.refresh();
		}, 20)
	}
	bScroll.prototype.scrollTo = function () {
		var _this = this;
		setTimeout(function() {
			_this.scroll && _this.scroll.scrollTo(0,0,0);
			_this.refresh();
		}, 20)
	}
	bScroll.prototype._initPullUpLoad = function (){
		var _this = this;
		$('.pullUp').remove();
		if(!_this.config._isEmpty && !$('.pullUp').length && (Number($(this.config.el).height()) < Number($(this.config.el).find('>div').height())) ) {
			var str = '<div class="pullUp e"><div><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载</span></div></div>';
			$(this.config.el).find(">div").append(str);
			_this.refresh();
		}
		this.scroll.on('pullingUp', function() {
			if(!_this.obj.isData){
			}else {
				$('.pullUp').removeClass('no_bgc').addClass('loading').find('.pullUpLabel').text('正在加载');
				_this.obj.isPullUpload = true;
				$(_this.config.el).trigger('pullingUp');
				console.log('到底了');
			}
			
		})
		this.scroll.on('scroll', function(pos) {
			if(!_this.obj.isData) {
				return
			}
			if(Number(pos.y) > (Number(this.maxScrollY) + 50)) {
				$('.pullUp').addClass('filp')
			}
		})
	}	
	bScroll.prototype.destroy = function() {
		this.scroll && this.scroll.destroy();
	}
	bScroll.prototype._scroll = function(cb) {
		this.scroll.on('scroll', function(pos) {
			cb && cb();
		})
	}
	return bScroll
})