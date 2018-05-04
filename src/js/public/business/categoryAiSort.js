// 顶部筛选条件-智能排序
define([
  "public/tools/method",
  "text!template/category/aiSort.html!strip"
], function(Method, tpl) {

  var categoryAiSort = {
    // 初始化
    init: function(opt){
      this.configer(opt);
      this.renderAi();
      this.eleClick();
    },
    // 配置
    configer: function(opt){
      var defaults = {
        callClick: ""//点击回调
      };
      this.config = $.extend(true, defaults, opt);
      this.topTabEle = $("#aiSortTab");//顶部智能排序元素
      this.tabEle = $("#aiSort");//选项卡整体
    },
    // 渲染课程分类
    renderAi: function(){
      var _this = this;
      // Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
      _this.tabEle.html(  $(tpl).html() );
    },
    // 元素点击切换
    eleClick: function(){
      var _this = this;
      // 附近点击事件
      this.tabEle.on("tap", ".localtion_list.sort_list li", function(){
        _this.topTabEle.html( $(this).find("a").html() );
        _this.topTabEle.attr("data-sort", $(this).data("sort") );
        _this.hideTab();
        _this.config.callClick && _this.config.callClick( $(this).data("sort") );
      })
    },
    // 获取智能排序id
    getValue: function(){
      return this.topTabEle.data("sort") ? this.topTabEle.data("sort") : "";
    },
    // 隐藏tab
    hideTab: function(){
      this.topTabEle.removeClass("on");
      this.tabEle.removeClass("on");
      $(".marsk_opcity").remove();
    }
  };

  return categoryAiSort;
});