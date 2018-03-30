// 图片预览类
define([
	"photoswipe",
	"photoswipeUi",
	"style!lib/js/photoswipe/photoswipe",
	"style!lib/js/photoswipe/default-skin/default-skin",
], function (PhotoSwipe, PhotoSwipeUI_Default) {
	
	// 图片预览插件二次封装
	// 参数一：图片预览插件的配置项，及自己定义的配置项
	// 参数二：预览图片对象
	var ClassPhotoSwipe = function(opt, imgItems){
		this.appendBasicTpl();
		this.pswpElement = document.querySelectorAll('.pswp')[0];
		
		var defaultOption = {
			history: false,
			focus: false,
			showAnimationDuration: 0,
			hideAnimationDuration: 0
		};
		this.options = $.extend( {}, defaultOption, opt );
		
		this.imgItems = imgItems;
		this.photoSwipe = null;//实例化后的图片预览插件对象

	}

	// 初始化图片预览插件
	// 参数一：当前发生事件元素的索引
	// 参数二：预览图片的对象
	ClassPhotoSwipe.prototype.init = function(idx, imgItems){
		this.options.index = idx;
		var aImgItems = imgItems ? imgItems : this.imgItems;
		this.photoSwipe = new PhotoSwipe( this.pswpElement, PhotoSwipeUI_Default, aImgItems, this.options);
		this.photoSwipe.init();
	}

	// 渲染基础的结构
	ClassPhotoSwipe.prototype.appendBasicTpl = function(){
		$("body").append( $( this.getBasicTpl() ) );
	}

	// 获取图片预览基本结构
	ClassPhotoSwipe.prototype.getBasicTpl = function(){
		var sTpl = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">' +
			        '<div class="pswp__bg"></div>' +
			        '<div class="pswp__scroll-wrap">' +
			            '<div class="pswp__container">' +
			                '<div class="pswp__item"></div>' +
			                '<div class="pswp__item"></div>' +
			                '<div class="pswp__item"></div>' +
			            '</div>' +
			            '<div class="pswp__ui pswp__ui--hidden">' +
			                '<div class="pswp__top-bar">' +
			                    '<div class="pswp__counter">' +

								'</div>' +
									'<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
									'<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
			                    '<div class="pswp__preloader">' +
			                        '<div class="pswp__preloader__icn">' +
										'<div class="pswp__preloader__cut">' +
											'<div class="pswp__preloader__donut"></div>' +
										'</div>' +
			                        '</div>' +
			                    '</div>' +
			                '</div>' +
			                '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
			                    '<div class="pswp__share-tooltip"></div>' +
			                '</div>' +
			                '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">' +
			                '</button>' +
			                '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">' +
			                '</button>' +
			                '<div class="pswp__caption">' +
			                    '<div class="pswp__caption__center"></div>' +
			                '</div>' +
			            '</div>' +
			        '</div>' +
			    '</div>';
		return sTpl;
	}

	return ClassPhotoSwipe;
});