// 顶部筛选条件-年部年级分类
define([
  "public/tools/method",
  "publicBusiness/tabSwitch",
  "publicService/service",
  "text!template/category/grade.html!strip"
], function(Method, tabSwitchs, Service, tpl) {

  var categoryGrade = {
    // 初始化
    init: function(opt){
      this.configer(opt);
      this.renderGrade();
      this.eleClick();
    },
    // 配置
    configer: function(opt){
      var defaults = {
        callClick: ""//点击回调
      };
      this.config = $.extend(true, defaults, opt);
      this.topTabEle = $("#gradeTab");//顶部课程分类元素
      this.tabEle = $("#gradeJi");//选项卡整体
    },
    // 渲染课程分类
    renderGrade: function(){
      var _this = this;
      Service.getGoodsGrade({
        isShowLoading: false
      }, null, function(data){
        Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
        // 切换
        tabSwitchs.secondSwitch("#gradeJi .left_area .switch_a.area_d_a", "#gradeJi .right_area_d");
      });
    },
    // 元素点击切换
    eleClick: function(){
      var _this = this;
      // 附近点击事件
      this.tabEle.on("tap", "a[data-role='grade']", function(){
        _this.topTabEle.html( $(this).data("name") );
        _this.topTabEle.attr("data-grade-id", $(this).data("grade-id") );
        _this.hideTab();
        _this.config.callClick && _this.config.callClick( $(this).data("grade-id") );
      })
    },
    // 获取顶部分类id
    getValue: function(){
      return this.topTabEle.data("grade-id") ? this.topTabEle.data("grade-id") : "";
    },
    // 隐藏tab
    hideTab: function(){
      this.topTabEle.removeClass("on");
      this.tabEle.removeClass("on");
      $(".marsk_opcity").remove();
    }
  };

  return categoryGrade;
});