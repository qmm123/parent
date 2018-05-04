
define([
	"publicService/service",
	"publicTool/method",
	"public/tools/scrollLoad"
], function (Server, Method, BScroll) {
	// 计算star个数
	function setStar(data) {
		for(var i=0;i<data.length;i++) {
			var item = data[i];
			if((item.score || item.score == 0) || (item.class_effect_score || item.class_effect_score == 0)) {
				item.scoreNum = item.scoreNum || {star1: [],star2: [], star3: []}
				if(item.score <= 5 || item.class_effect_score <= 5) {
					var num1 = Number(item.score) || Number(item.class_effect_score);
					item.scoreCount = num1 * 20 + '.0';
					for(var j=0;j<parseInt(num1);j++) {
						item.scoreNum.star1.push('star1');
					}
					for(var j=0;j<(Math.ceil(num1) - parseInt(num1));j++){
						item.scoreNum.star2.push('star2');
					}
					for(var j=0;j<(5-Math.ceil(num1));j++){
						item.scoreNum.star3.push('star3');
					}
				}
			}
		}
		return data;
	}
	// 优点
	function setAdvantage(data) {
		var arr = ["遵守纪律","积极思考","举手问答","团结友爱","注意力集中"];
		for(var i=0;i<data.length;i++) {
			var item = data[i];
			if(item.advantage) {
				//item.advantageArr = item.advantageArr || [];
				var str = "";
				var advantage = item.advantage.split(',');
				for(var j=0; j<advantage.length;j++) {
					var index = advantage[j] - 1;
					str+=arr[index] + ';';
				}
				item.advantage = str.slice(0,-1);
			}
		}
	}
	var ClassList = function() {
		return {

			// 配置参数
			setOptions: function(opt) {
				var defaults = {
					listFolder: "wrapper", // 滚动容器id
					listWrapper: "listContainer", // 列表id
					classTpl: "TplClass", // 模板id
					emptyEle: "#emptyContentClass", // 空元素id
					type: ""
				}
				this.options = $.extend(true, defaults, opt);
				this.scroll = null; // 滚动对象
				this.listFolder = $("#" + this.options.listFolder);
				this.listWrapper = $('#' + this.options.listWrapper);
				this.emptyEle = $(this.options.emptyEle);
				this.pageSize = 10; // 每条页数
				this.currentPage = 1; // 当前页
				this.totalPage = 0; // 总页数
				this.$data = {};
				this._opt = null;
				this.isPullUpMoreRequest = false;
				this._isEmpty = false;
			},

			//初始化
			init: function(opt, conf) {
				//this.scroll && this.scroll.destroy();
				$('.pullDown').css("visibility" , 'hidden');
				var _this = this;
				this.setOptions(opt);
				var _opt = {}
				if("conditions" in opt) {
					_opt.conditions = opt.conditions;
				}
				if("page_infos" in opt) {
					_opt.page_infos = opt.page_infos;
				}
				if("data" in opt) {
					for(var item in opt.data) {
						_opt[item] = opt.data[item];
					}
				}
				_this._opt = _opt;
				this.renderList(null, _opt, function() {
					_this.initScroll({isPullUp: opt.isPullUp, isPullDown: opt.isPullDown, _isEmpty: _this._isEmpty});
					opt.FinialFn && opt.FinialFn();
				}, function() {
				})
			},

			// 渲染列表 
			// 参数一 接口配置项 参数二 接口参数 参数三 成功回调
			renderList: function(apiConfid, param, successCallback, errorCallback) {
				var _this = this;
				// 请求数据
				Server[this.options.name](apiConfid, param, function(data) {
					console.log(data);
					if(data.result && data.result.data && data.result.data.length > 0) {
						_this.emptyEle.addClass('hide');
						data.result.data[0].type = _this.options.type;
						setStar(data.result.data);
						setAdvantage(data.result.data);
						
						if(_this.options.fn){
							_this.$data = _this.options.fn(data.result);
						}else{
							_this.$data = data.result;
						}
						if(_this.options.templateFn){ //进行切换
							var count = Number(data.result.good_comment) + Number(data.result.middle_comment) + Number(data.result.bad)
							_this.options.templateFn({
								count: count,
								good_comment: data.result.good_comment,
								middle_comment: data.result.middle_comment,
								bad: data.result.bad
							})
						}
						Method.artRender(_this.listWrapper, _this.options.classTpl, _this.$data, false, function() {
							_this.totalPage = data.result.total_page || data.result.page_size;
							successCallback && successCallback(data);
						});
					}else if (data.result && data.result.data == null){
						if(_this.options.type) {
							data.result.type = _this.options.type;
						}
						Method.artRender(_this.listWrapper, _this.options.classTpl, data.result, false, function() {
							successCallback && successCallback(data);
						});
						if(_this.options.avaFn) {
							_this.options.avaFn({
								realname: data.result.realname,
								sex: data.result.sex,
								number: data.result.seniority,
								photo: data.result.photo,
								fn: _this.scroll ? _this.scroll.refresh : null
							})
						}
					}else if(_this.options.type =='ClassDetailPing' &&data.result && data.result.data && data.result.data.length == 0){
						if(_this.options.type) {
							data.result.type = _this.options.type;
							data.result.data[0] = {}
							data.result.data[0].type = 'ClassDetailPing'
						}
						if(_this.options.fn){
							_this.$data = _this.options.fn(data.result);
						}else{
							_this.$data = data.result;
						}
						Method.artRender(_this.listWrapper, _this.options.classTpl, data.result, false, function() {
							_this._isEmpty = true;
							successCallback && successCallback(data);
							$('.pullUp').remove();
							$('#empty').removeClass('hide');
						});
						if(_this.options.avaFn) {
							_this.options.avaFn({
								realname: data.result.realname,
								sex: data.result.sex,
								number: data.result.seniority,
								fn: _this.scroll ? _this.scroll.refresh : null
							})
						}
					}else{
						console.log('数据为空')
						_this.renderEmpty(_this.listFolder, _this.emptyEle);
					}
				}, function() {
					console.log('错误')
					errorCallback && errorCallback();
				})
			},
			// 加载跟多 
			// 参数一 接口参数 参数二 成功回调
			getListMore: function(param, successCallback, errorCallback) {
				if(this.isPullUpMoreRequest) {
					return
				}
				var _this = this;
				_this.currentPage++;
				_this.isPullUpMoreRequest = true;
				console.log(_this.currentPage)
				var options = {
					page_infos: {
						curr_page: _this.currentPage
					}
				}
				var param = $.extend(true, options, param);

				// 请求数据
				Server[this.options.name](null, param, function(data) {
					console.log(data);
					_this.isPullUpMoreRequest = false;
					data.result.data[0].type = _this.options.type;
					if(_this.options.fn){
						_this.$data.data = _this.options.fn(data.result);
					}else{
						_this.$data = data.result;
					}
					Method.artRender(_this.listWrapper, _this.options.classTpl, _this.$data, true, function() {
						successCallback && successCallback(data);
					})
				}, function() {
					_this.currentPage--;
					console.log(_this.currentPage+'------------------')
					_this.isPullUpMoreRequest = false;
					errorCallback && errorCallback();
				})
			},

			// 初始化滚动加载对象
			initScroll: function(opt) {
				var _this = this;
				var wrapper = this.listFolder[0];
				var pullUpLoad = null;
				var pullDownRefresh = null;
				if(opt.isPullUp) { // 禁止上拉刷新
					pullUpLoad = null
				}else{
					pullUpLoad = {
						threshold: 50
					}
				}
				if(opt.isPullDown) {
					pullDownRefresh = null;
					this.listFolder.off('pullingDown');
				}else{
					pullDownRefresh= {
					  	threshold: 50,
					  	stop: 50
					}
				}
				this.scroll = new BScroll({
					el: wrapper,
					pullDownRefresh: pullDownRefresh,
					momentumLimitDistance: 30,
					pullUpLoad: pullUpLoad,
					_isEmpty: opt._isEmpty
				})
				setTimeout(function() {
					_this.scroll.scrollTo(0,0,0);
				}, 20)
				// 滑动
				

				// 下拉刷新
				this.listFolder.on('pullingDown', function() {
					//$('.pullDown').css("visibility" , 'visible');
					if(!pullDownRefresh) {
					
					}else{
						_this.renderList(null, _this._opt, function(data) {
							if(data.status){
								_this.scroll.forceUpdate({success: true});
								_this.currentPage = 1;
								console.log('下拉刷新')
							}else {
								_this.scroll.forceUpdate({success: false});
							}
						}, function() {
							_this.scroll.forceUpdate({success: false});
						})
					}
				})
				// 上拉加载
				this.listFolder.on('pullingUp', function() {
					//$('.pullUp').css("visibility" , 'visible');
					if((_this.currentPage >= Number(_this.totalPage)) && !_this.isPullUpMoreRequest) {
						_this.scroll.forceUpdate({success: true, data: false})
						console.log(_this.currentPage+'!!!!!!!!!!!')
					}else {
						_this.getListMore(_this._opt, function(data) {
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
				listEle.find('.pullDown').remove();
				listEle.find('.pullUp').remove();
				listEle.find('#listContainer').html('');
				emptyEle.removeClass("hide");
			},
			refresh: function() {
				this.scroll.refresh();
			} 
		}
	}
	var mess = ClassList();
	return {
		init: function(opt) {
			mess.init(opt);
		},
		refresh: function() {
			mess.refresh();
		}
	};
});