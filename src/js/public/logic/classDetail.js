// 公共逻辑-课程详情页-班课
define([
	"publicService/service",
	"publicTool/method",
	"publicTool/artTempFun",
	"publicBusiness/nativeFun",
	"publicBusiness/layerFz"
], function (Service, Method, artTempFun, nativeFun, layer) {
	console.log(window.location.href)
	// arttemplate 助手
	artTempFun.calculateStar();
	// 对象写法（避免出现new改变this指向问题）
	var ClassDetail = {
		// 初始化
		// 参数一 配置对象
		init: function(opt){
			this.configer(opt);
			this.renderClassInfor();
			if(this.pageConfig.course_comment && this.pageConfig.course_comment.config.is_show_goods_details_comment == 1){
				this.renderClassPing();
				this.pingZone.removeClass("hide");
			}
			this.gotoEvent();
			this.bottomBtnEvent();
		},
		// 配置项
		// 参数一 配置对象
		configer: function(opt){
			var defaults = {
				headerTxt: "headerTxt",//头部文字id
				headerCart: "cartZone",//头部购物车包裹层id
				headerCartNum: "cartNum",//头部购物车数量id
				headerTel: "headerTel",//头部校区电话id

				classDetailBasic: "classDetailBasic",//课程详情基础区域id

				lookHuiPag: "lookHuiPag",//查看优惠详情id

				lookTeacher: "lookTeacher",//查看老师id
				lookClassPlan: "lookClassPlan",//查看课程安排id

				lookSchool: "lookSchool",//查看校区id

				lookClassZhang: "lookClassZhang",//查看招生简章id
				lookClassGang: "lookClassGang",//查看课程大纲id
				lookParentPing: "lookParentPing",//查看家长评价id

				lookTao: "lookTao",//查看课程套餐id

				pingZone: "pingZone",//家长评价区域id
				pingList: "pingList",//家长评价列表id

				tplPing: "tplPing",//家长评价列表模板id
				tplClassDetail: "tplClassDetail",//课程基础信息模板id
				tplClassDetailLesson: "tplClassDetailLesson",//课程安排模板id
				tplClassDetailHui: "tplClassDetailHui",//优惠详情模板id
				pingNum: "pingNum",//评论数量id

				yueTing: "yueTing",//按钮-预约试听id
				joinCart: "joinCart",//按钮-加入购物车id
				signClass: "signClass",//按钮-立即报名id
			};
			this.config = $.extend(true, defaults, opt);
			// 通过桥接传递过来的参数
			this.wbParam = JSON.parse( Method.getUrlParam("page_param") );
			this.pageConfig = Method.getUrlParam("tpl_config") ? JSON.parse( Method.getUrlParam("tpl_config") ) : {};//模板页面配置信息
			console.log(this.wbParam, this.pageConfig)
			this.dataInfor = {};//课程详情基础数据
			// 获取元素
			this.classDetailBasic = $("#" + this.config.classDetailBasic);//课程详情基本信息部分
			this.huiData = null;//班级优惠情况
			this.headerTxt = $("#" + this.config.headerTxt);
			this.headerCart = $("#" + this.config.headerCart);
			this.headerCartNum = $("#" + this.config.headerCartNum);
			this.headerTel = $("#" + this.config.headerTel);

			this.pingList = $("#" + this.config.pingList);
			this.pingZone = $("#" + this.config.pingZone);
			this.pingNum = $("#" + this.config.pingNum);//评论数量

			this.yueTing = $("#" + this.config.yueTing);
			this.joinCart = $("#" + this.config.joinCart);
			this.signClass = $("#" + this.config.signClass);
		},
		// 渲染课程信息
		renderClassInfor:function(){
			var _this = this;
			Service.getClassDetailClass(null, {goods_id: this.wbParam.goods_id}, function(data){
				// 遗留非法调用问题？？？暂时这么解决
				data.result.goods_name = data.result.name;
				artTempFun.artRender(_this.classDetailBasic, _this.config.tplClassDetail, data.result);
				// 记录基础信息
				_this.huiData = data.result.discount_info;
				_this.renderHeaderInfor(data);
				_this.lookDetailEvent(data);
				_this.dataInfor = data.result;
				console.log(_this.dataInfor);
				_this.setBottomStatus(data);
			});
		},
		// 渲染家长评价
		renderClassPing: function(){
			var _this = this;
			Service.getSchoolDetailPing({isShowLoading: false}, {
				conditions:{
					goods_id: _this.wbParam.goods_id,
				}
			}, function(data){
				console.log(data)
				if(data.result.data && data.result.data.length){
					artTempFun.artRender(_this.pingList, _this.config.tplPing, data.result);
					_this.pingNum.html(data.result.total);
				}
			});
		},
		// 元素点击事件绑定
		gotoEvent: function(){
			var _this = this;
			// 查看老师
			this.classDetailBasic.on("tap", "#" + this.config.lookTeacher, function(){
				nativeFun("toTeacherDetailIntroduce", {"teacher_id": $(this).data("id")});
			})
			// 查看招生简章
			this.classDetailBasic.on("tap", "#" + this.config.lookClassZhang, function(){
				nativeFun("toClassDetailZhang", {"admissions": _this.dataInfor.admissions});
			})
			// 查看课程大纲
			this.classDetailBasic.on("tap", "#" + this.config.lookClassGang, function(){
				nativeFun("toClassDetailGang", {"admissions": _this.dataInfor.admissions});
			})
			// 查看校区
			this.classDetailBasic.on("tap", "#" + this.config.lookSchool, function(){
				nativeFun("toSchoolDetailMain", {"campus_id": $(this).data("id")});
			})
			// 查看购物车
			$("header").on("tap", "#" + this.config.headerCart, function(){
				nativeFun("toCart");
			})
			// 查看家长评价
			$("body").on("tap", "#" + this.config.lookParentPing, function(){
				nativeFun("toSchoolDetailEvaluation", {campus_id: _this.wbParam.campus_id, goods_id: _this.wbParam.goods_id, teacher_id: _this.dataInfor.teacher_id});
			})
		},
		// 设置头部信息
		renderHeaderInfor: function(data){
			// 设置头部文字
			this.headerTxt.html(data.result.name + "详情");
			// 设置购物车数量
			if(localStorage.parent_id){
				this.headerCartNum.html(data.result.shiopping_cart_num).removeClass("hide");
			}
			// 设置校区电话
			if(data.result.telephone){
				this.headerTel.click(function(){
					nativeFun("callPhone", {"phone":data.result.telephone});
				})
			}else{
				this.headerTel.click(function(){
					layer.msg({
						content: "暂未开通校区电话!",
						shadeClose: true
					});
				});
			}
		},
		// 查看详情点击事件绑定
		lookDetailEvent: function(data){
			var _this = this;
			// 查看优惠
			if(data.result.discount_info && data.result.discount_info.length){
				this.classDetailBasic.on("tap", "#" + this.config.lookHuiPag, function(){
					layer.pageUp({
						style: "height:200px;",
						title: "优惠详情",
						shadeClose: true,
						content: artTempFun.getArtString( $("#" + _this.config.tplClassDetailHui).html(), data.result, true )
					});
					// 查看套餐
					$("#" + _this.config.lookTao).click(function(){
						nativeFun("toClassDetailTao", {goods_id: _this.dataInfor.goods_id});
					})
				})
			}
			// 查看课程安排
			if(data.result.lessons && data.result.lessons.length){
				this.classDetailBasic.on("tap", "#" + this.config.lookClassPlan, function(){
					layer.pageUp({
						style: "height:300px;",
						shadeClose: true,
						title: "课时安排<span class='font_12 font_gray'>("+ data.result.lessons_minutes.lessons_count +","+ data.result.lessons_minutes.minutes +")</span>",
						content: artTempFun.getArtString( $("#" + _this.config.tplClassDetailLesson).html(), data.result, true )
					});
				})
			}
			// 查看套餐--后动态生成的元素不能用事件代理！！！
			// $(document).on("tap", "#" + this.config.lookTao, function(){
			// 	console.log("tao")
			// 	nativeFun("toClassDetailTao", {goods_id: _this.dataInfor.goods_id});
			// })
		},
		// 底部操作按钮交互
		bottomBtnEvent: function(){
			var _this = this;
			// 预约试听
			this.yueTing.click(function(){
				var $this = $(this);
				if( $this.hasClass("disable") ){
					return;
				}
				nativeFun("toAudition", {goods_id: _this.dataInfor.goods_id, name: _this.dataInfor.name});
			})
			// 加入购物车
			this.joinCart.click(function(){
				var $this = $(this);
				if( $this.hasClass("disable_deep") ){
					return;
				}
				if(!localStorage.parent_id){//检测未登录状态
					nativeFun("login", {}, function(res){
						var oRes = JSON.parse(res);
						localStorage.parent_id = oRes.parent_id;
						localStorage.token_val = oRes.token_val;
						localStorage.token_key = oRes.token_key;
						_this.renderClassInfor();
					})
					return;
				}
				_this.joinCart.addClass("disable_deep");
				Service.addParentShoppingCart({}, {
					number: 1,
					goods_id: _this.dataInfor.goods_id
				}, function (data) {
					_this.headerCartNum.html( _this.headerCartNum.html() - 0 + 1 );
				}, function () {
					_this.joinCart.removeClass("disable_deep");
				})
			})
			// 立即报名
			this.signClass.click(function(){
				var $this = $(this);
				if( $this.hasClass("disable") ){
					return;
				}
				console.log(_this.dataInfor.goods_id)
				if(_this.dataInfor.status == 4){//插班
					nativeFun("lgSignClass", {goods_id: _this.dataInfor.goods_id});
				}else{
					nativeFun("lgSignClass", {goods_id: _this.dataInfor.goods_id});
				}
			})
		},
		// 设置底部按钮状态
		setBottomStatus:function(data){
			// 立即报名-文本
			if(data.result.status == "4" && data.result.is_transfer == "1"){
				this.signClass.html("插班");
			}
			// 未开班、已满班、已结课、已下架
			if(data.result.status == 7 || data.result.status == 3 || data.result.status == 2 || data.result.status == 1){
				this.yueTing.addClass("disable");
				this.joinCart.addClass("disable_deep");
				this.signClass.addClass("disable");
				return;
			}
			// 预约试听
			if(data.result.parent_is_audition == "1"){
				this.yueTing.removeClass("disable");
			}
			if(data.result.parent_is_audition == "2"){
				this.yueTing.addClass("disable");
			}
			// 加入购物车
			if(data.result.is_shiopping_cart == "2"){
				this.joinCart.removeClass("disable_deep");
			}
			if(data.result.is_shiopping_cart == "1"){
				this.joinCart.addClass("disable_deep");
			}
			// 立即报名-按钮状态
			if(data.result.status == "4" && data.result.is_transfer == "1"){
				this.signClass.removeClass("disable");
			}
			// 立即报名-按钮状态
			if(data.result.status == "5"){
				this.signClass.removeClass("disable");
			}
		}
	}
	

	return ClassDetail;
});