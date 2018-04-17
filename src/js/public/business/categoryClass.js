// 顶部筛选条件-课程分类
define([
  "public/tools/method",
  "publicBusiness/tabSwitch",
  "publicService/service",
  "text!template/category/class.html!strip"
], function(Method, tabSwitchs, Service, tpl) {

  var categoryClass = {
    // 初始化
    init: function(opt){
      this.configer(opt);
      this.renderClass();
      this.eleClick();
    },
    // 配置
    configer: function(opt){
      var defaults = {
        initCategoryName: "",//初始化分类名称(顶部显示)
        initCategoryOneId: "",//初始化一级分类id【fef84b6e75a949cb9a71d1af1b2be3af】语文
        initCategoryTwoId: "",//初始化二级分类id【d7a3c95affc741e593236293904f8d3b】二级语文
        callClick: ""//点击回调
      };
      this.config = $.extend(true, defaults, opt);
      this.topTabEle = $("#classTab");//顶部课程分类元素
      this.tabEle = $("#classify");//选项卡整体
    },
    // 初始化状态
    // 参数一 分类名称 参数二 1级分类id 参数3 2级分类id
    setStatus: function(name, oneId, twoId){
      if(name){
        // 设置名称及分类
        this.topTabEle.html(name);
        this.topTabEle.attr("data-level", oneId + "-" + twoId);
        // 设置一级分类状态
        this.tabEle.find(".left_area .switch_a.area_d_a").removeClass("on");
        this.tabEle.find(".left_area .switch_a.area_d_a[data-id="+ oneId +"]").addClass("on");
        // 设置二级分类显示
        this.tabEle.find(".right_area .right_area_d").removeClass("on");
        this.tabEle.find(".right_area .right_area_d[data-id="+ oneId +"]").addClass("on");
        // 设置二级分类状态
        if(twoId){
          this.tabEle.find(".right_area .right_area_d .third_menu_con[data-id="+ twoId +"]").addClass("current");
        }
      }
    },
    // 渲染课程分类
    renderClass: function(){
      var _this = this;
      Service.getCategoriesList({
        isShowLoading: false
      }, null, function(data){
        Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
        // 切换
        // 一级选项卡
        tabSwitchs.secondSwitch("#classify .left_area .switch_a.area_d_a", "#classify .right_area_d");
        // 二级选项卡
        tabSwitchs.thirdSwitch("#classify .switch_a.area_r.third_menu");
        // 初始化选项卡状态
        _this.setStatus(_this.config.initCategoryName, _this.config.initCategoryOneId, _this.config.initCategoryTwoId);
      });
    },
    // 元素点击切换
    eleClick: function(){
      var _this = this;
      // 附近点击事件
      this.tabEle.on("click", "a[data-role='category']", function(){
        _this.topTabEle.html( $(this).data("name") );
        _this.topTabEle.attr("data-level", $(this).data("level") );
        _this.hideTab();
        _this.config.callClick && _this.config.callClick( $(this).data("level") );
      })
    },
    // 获取顶部分类id
    getValue: function(){
      return this.topTabEle.data("level") ? this.topTabEle.data("level") : "";
    },
    // 隐藏tab
    hideTab: function(){
      this.topTabEle.removeClass("on");
      this.tabEle.removeClass("on");
    }
  };

  return categoryClass;
});