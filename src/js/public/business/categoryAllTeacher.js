// 顶部筛选条件-全部老师
define([
  "public/tools/method",
  "publicService/service",
  "text!template/category/allTeacher.html!strip"
], function(Method, Service, tpl) {

  var categoryAiSort = {
    // 初始化
    init: function(opt){
      this.configer(opt);
      this.renderAllTeacher();
      this.eleClick();
    },
    // 配置
    configer: function(opt){
      var defaults = {
        callClick: ""//点击回调
      };
      this.config = $.extend(true, defaults, opt);
      this.topTabEle = $("#allTeacherTab");//顶部智能排序元素
      this.tabEle = $("#allTeacher");//选项卡整体
      this.cityId = Method.getUrlParam("city_id") ? Method.getUrlParam("city_id") : 35;
    },
    // 渲染全部老师
    renderAllTeacher: function(){
      var _this = this;
      Service.getGoodsTeacherList({
        isShowLoading: false,
      },{
        city_id: _this.cityId
      }, function(data){
        Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
      });
    },
    // 元素点击切换
    eleClick: function(){
      var _this = this;
      // 附近点击事件
      this.tabEle.on("click", ".all_teacher_list [data-role='selectTeacher']", function(){
        _this.topTabEle.html( $(this).html() );
        _this.topTabEle.attr("data-teacher-id", $(this).data("teacher-id") );
        _this.hideTab();
        _this.config.callClick && _this.config.callClick( $(this).data("teacher-id") );
      })
    },
    // 获取智能排序id
    getValue: function(){
      return this.topTabEle.data("teacher-id") ? this.topTabEle.data("teacher-id") : "";
    },
    // 隐藏tab
    hideTab: function(){
      this.topTabEle.removeClass("on");
      this.tabEle.removeClass("on");
    }
  };

  return categoryAiSort;
});