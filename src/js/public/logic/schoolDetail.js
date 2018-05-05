 // 公共逻辑-校区详情页
define([
	"publicService/service",
	"publicTool/method",
	"public/tools/scrollLoad",
	"publicTool/artTempFun",
	"public/business/nativeFun",
	"publicLogic/messageList",
	"text!template/school/slide.html!strip",
	"TouchSlide",
	"publicTool/PhotoSwipe",
], function (
	Service, Method, scrollLoad, artTempFun, nativeFun, 
	messageList, tplSlide, TouchSlide, PhotoSwipe
) {
	// arttemplate 助手
	artTempFun.calculateStar();

	// 对象写法（避免出现new改变this指向问题）
	var SchoolDetail = {
		init: function(opt){
			this.configer(opt);
			// tab切换
			this.slideSwitch();
			this.renderMain();
			if(this.pageConfig.course_comment && this.pageConfig.course_comment.is_show_campus_comment == 1){
				this.renderPing();
				this.pingClassZone.removeClass(this.config.hide_class);
			}
			this.switchPage();
		},
		configer: function(opt){
			var defaults = {
				headerTxtEle: "",//头部标题jq对象
				merchantPhoneEle: "header .icon.phone",//机构电话
				schoolEnv: "schoolEnv",//校区环境id
				campusPhoneEle: "[data-role='school_phone']",//校区电话
				distanceEle: "[data-role='distance']",//离我距离
				addressEle: "[data-role='address']",//校区地址
				picNum: "[data-role='pic_num']",//校区相册数
				videoNum: "[data-role='video_num']",//校区视频数
				picVideoList: "photoVideo",//校区相册视频列表id
				picVideoMore: "photoVideoMore",//校区相册视频列表id
				pingNum: "[data-role='ping_num']",//课程评价数量
				pingClassZone: "pingClassZone",//课程评价列表区域id
				pingList: "pingList",//课程评价列表id
				tplPicVideo: "tplPicVideo",//相册/视频模板id
				tplPing: "tplPing",//课程评价模板id
				tplTeacher: "tplTeacher",//老师模板id
				teacherList: "teacherList",//老师列表id
				TplClass: "TplClass",//课程模板id
				classList: "classList",//课程列表id
				visClass: "vis_hide",//空白占位class
				hide_class: "hide",//隐藏class

				slideCell: "#tabZone",//选项卡最外层元素
				titCell: "#tabZone .tab_lik a",//选项卡标题
				mainCell: "#tabZone .tab_content >li",//选项卡内容包裹层
			}
			this.config = $.extend(true, defaults, opt);
			// 通过桥接传递过来的参数
			this.wbParam = JSON.parse( Method.getUrlParam("page_param") );
			this.pageConfig = Method.getUrlParam("tpl_config") ? JSON.parse( Method.getUrlParam("tpl_config") ) : {};//模板页面配置信息
			console.log(this.wbParam, this.pageConfig)
			this.dataInfor = null;//基本信息
			this.campus_id = this.wbParam.campus_id;//校区id
			this.lng = Method.getUrlParam("lng") ? Method.getUrlParam("lng") : "";//经度
			this.lat = Method.getUrlParam("lat") ? Method.getUrlParam("lat") : "";//纬度
			this.winHei = Method.getViewPortSize().height;
			this.isLoadClass = true;
			this.isLoadTeacher = true;
			this.PhotoSwiper = new PhotoSwipe({loop: false});
			// 获取元素
			this.merchantPhoneEle = $(this.config.merchantPhoneEle);
			this.campusPhoneEle = $(this.config.campusPhoneEle);
			this.distanceEle = $(this.config.distanceEle);
			this.addressEle = $(this.config.addressEle);
			this.picNum = $(this.config.picNum);
			this.videoNum = $(this.config.videoNum);
			this.picVideoList = $("#" + this.config.picVideoList);
			this.picVideoMore = $("#" + this.config.picVideoMore);
			this.pingNum = $(this.config.pingNum);
			this.pingList = $("#" + this.config.pingList);
			this.pingClassZone = $("#" + this.config.pingClassZone);
			this.teacherList = $("#" + this.config.teacherList);
			this.schoolEnv = $("#" + this.config.schoolEnv);
			// 设置属性值
			if( Method.getUrlParam("merchant_phone") ){
				this.merchantPhoneEle.click(function(){
					nativeFun("callPhone", {"phone":Method.getUrlParam("merchant_phone")});
				})
			}
		},
		// tab切换
		slideSwitch: function(callEnd){
			var _this = this;
			Method.tabChange(this.config.titCell, this.config.mainCell, function(iIdx){
				_this.initRender(iIdx);
				messageList.refresh();
			});
		},
		// 渲染主页
		renderMain: function(){
			var _this = this;
			Service.getSchoolDetailMain({isShowLoading: true}, {
				campus_id: _this.campus_id,
				lng: _this.lng,
				lat: _this.lat
			}, function(data){
				_this.dataInfor = data.result;
				console.log(_this.dataInfor);
				_this.config.headerTxtEle.html(data.result.name + "主页");
				// 设置校区环境图片
				if(data.result.campus_imgs.length){
					artTempFun.artRenderString(_this.schoolEnv, $(tplSlide).html(), data.result, false, function(){
						TouchSlide({ 
							slideCell:"#slideBox",
							mainCell:".bd ul",
							effect:"leftLoop",
							autoPlay:true
						});
						_this.setContentHeight();
					});
				}
				_this.setContentHeight();
				if(data.result.candial == 1){
					_this.campusPhoneEle.html(data.result.telephone);
					_this.campusPhoneEle.click(function(){
						nativeFun("callPhone", {"phone":data.result.telephone});
					})
				}
				_this.campusPhoneEle.removeClass(_this.config.visClass);
				_this.addressEle.html(data.result.campus_address);
				_this.distanceEle.html(data.result.distance);
				_this.picNum.html(data.result.img_count ? data.result.img_count : 0);
				_this.videoNum.html(data.result.video_count ? data.result.video_count : 0);
				// 渲染相册
				if(data.result.goods_img_videos && data.result.goods_img_videos.length){
					artTempFun.artRender($("#" + _this.config.picVideoList), _this.config.tplPicVideo, data.result);
					_this.picVideoMore.removeClass(_this.config.hide_class);
					// 视频播放
					_this.playVideo();
					// 相册播放
					_this.playPhoto();
				}
			});
		},
		// 渲染课程评价
		renderPing: function(){
			var _this = this;
			Service.getSchoolDetailPing({isShowLoading: false}, {
				conditions:{
					campus_id: _this.campus_id,
				}
			}, function(data){
				console.log(data, 123);
				if(data.result.data && data.result.data.length){
					artTempFun.artRender($("#" + _this.config.pingList), _this.config.tplPing, data.result);
				}
				_this.pingNum.html(data.result.total);
			});
		},
		// 渲染校区课程
		renderClass: function(){
			var _this = this;
			messageList.init({
				listFolder: "wrapperClass",
				listWrapper: _this.config.classList,
				classTpl: "TplClass",
				emptyEle: "#emptyContentClass",
				name: 'getSchoolDetailClass',
				conditions:{
					campus_id: _this.campus_id
				}
			});
		},
		// 渲染校区老师
		renderTeacher: function(){
			var _this = this;
			messageList.init({
				listWrapper: _this.config.teacherList,
				classTpl: "tplTeacher",
				emptyEle: "#emptyContent",
				name: 'getSchoolDetailTeacher',
				conditions:{
					campus_id: _this.campus_id
				}
			});
		},		
		// 页面跳转
		switchPage: function(){
			var _this = this;
			// 去相册/视频页
			$(this.config.slideCell).on("tap", ".pic_vedio", function(){
				nativeFun("toSchoolPhotoVideo", {campus_id: _this.campus_id});
			})
			// 去课程评价页面
			$(this.config.slideCell).on("tap", "ul[data-role='goToPing']", function(){
				nativeFun("toSchoolDetailEvaluation", {campus_id: _this.campus_id});
			})
			// 去课程详情页
			$(this.config.slideCell).on("tap", "#classList >li", function(){
				nativeFun("toClassDetail", {"campus_id": _this.campus_id, "goods_id": $(this).data("goodsid")});
			})
			// 去老师详情页
			$(this.config.slideCell).on("tap", "#teacherList >li", function(){
				nativeFun("toTeacherDetailIntroduce", {"campus_id": _this.campus_id, "teacher_id": $(this).data("id")});
			})
		},
		// 设置课程和老师列表的高度
		setContentHeight: function(){
			var oTab = $("#tabZone .tab_lik");
			var iHei = this.winHei - $(".school_env").height() - parseInt( oTab.css("margin-top") ) - parseInt( oTab.css("margin-bottom") );
			$("#wrapper").parent().height(iHei);
			$("#wrapperClass").parent().height(iHei);
		},
		// 初始化渲染函数
		initRender: function(idx){
			if(idx == 1 && this.isLoadClass){
				this.renderClass();
				this.isLoadClass = false;
			}
			if(idx == 2 && this.isLoadTeacher){
				this.renderTeacher();
				this.isLoadTeacher = false;
			}
		},
		// 视频播放
		playVideo: function(){
			this.picVideoList.on("tap", "li[data-role='video']", function(){
				var oVideo = $(this).find("video").get(0);
				//播放当前
		    oVideo.play();
		    //全屏当前
		    oVideo.webkitEnterFullScreen();
		    //退出监听
		    oVideo.addEventListener("webkitfullscreenchange", function (e) {
	        if (!document.webkitIsFullScreen) {
           //退出全屏关闭视频
           oVideo.pause();
	        };
		    });
			})
		},
		// 相册播放
		playPhoto: function(){
			var _this = this;
			this.picVideoList.on("tap", "li[data-role='pic']", function(){
				var aImg = $(this).parent().find("img.pic");
				var aCurImg = $(this).find("img");
				var iIdx = aImg.index( aCurImg );
				var items = [];
				aImg.each(function(){
					var obj = {};
					obj.src = $(this).attr("src");
					obj.w = Method.getImgNaturalSize( $(this).get(0) ).width;
					obj.h = Method.getImgNaturalSize( $(this).get(0) ).height;
					items.push(obj);
				})
				_this.PhotoSwiper.init(iIdx, items);
			})
		}
	}
	
	return SchoolDetail;
});