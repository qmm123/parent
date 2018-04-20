// 顶部筛选条件-位置
define([
  "public/tools/method",
  "publicBusiness/tabSwitch",
  "publicService/service",
  "text!template/category/location.html!strip",
  "text!template/category/location-sub.html!strip"
], function(Method, tabSwitchs, Service, tpl, tplSub) {

  var categoryLocation = {
    // 初始化
    init: function(opt){
      this.configer(opt);
      this.renderLocation();
      this.eleClick();
    },
    // 配置
    configer: function(opt){
      var defaults = {
        callClick: ""//点击回调
      };
      this.config = $.extend(true, defaults, opt);
      this.cityId = Method.getUrlParam("city_id") ? Method.getUrlParam("city_id") : 35;
      this.topTabEle = $("#locationTab");//顶部位置元素
      this.tabEle = $("#location_fu");//选项卡整体
      this.tabLeft = $("#location_fu .left_area");//左侧区域
      this.tabRight = $("#location_fu .right_area");//右侧区域
    },
    // 渲染位置一级
    renderLocation: function(){
      var _this = this;
      Service.getZoneClassCampus({
        isShowLoading: false
      }, {
        city_id: _this.cityId
      }, function(data){
        Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
        // 切换
        _this.switchTab();
      });
    },
    // 渲染位置二级(校区)
    // 参数一 分校id 参数二 当前分校名称
    renderSchool: function(sId, sName){
      var _this = this;
      Service.getZoneCampus({
        isShowLoading: false
      }, {
        city_id: _this.cityId,
        district_id: sId
      }, function(data){
        data.result.campusName = sName;
        data.result.id = sId;
        Method.artRenderString(_this.schoolTabEle, $(tplSub).html(), data.result);
      });
    },
    // 切换
    switchTab: function(){
      var _this = this;
      this.nearTabEle = $("#location_fu .right_area_d[data-type='near']");//附近选项卡对应元素
      this.schoolTabEle = $("#location_fu .right_area_d[data-role='school']");//附近选项卡对应元素
      // 附近点击事件
      this.tabEle.on("click", ".switch_a[data-type='near']", function(){
        _this.schoolTabEle.hide();
        _this.nearTabEle.show();
        $(this).siblings("a").removeClass("on");
        $(this).addClass("on");
      })
      // 校区点击事件
      this.tabEle.on("click", "a[data-type='school']", function(){
        _this.nearTabEle.hide();
        _this.schoolTabEle.show();
        $(this).siblings("a").removeClass("on");
        $(this).addClass("on");
        _this.renderSchool( $(this).data("id"), $(this).html() );
      })
    },
    // 元素点击切换
    eleClick: function(){
      var _this = this;
      // 附近点击事件
      this.tabEle.on("click", ".right_area_d[data-type='near'] a", function(){
        _this.topTabEle.html( $(this).html() );
        _this.topTabEle.attr("data-nearby", $(this).data("id") );
        _this.topTabEle.removeAttr("data-campus-id");
        _this.topTabEle.removeAttr("data-district-id");
        _this.hideTab();
        _this.config.callClick && _this.config.callClick( $(this).data("id") );
      })
      // 校区点击事件
      this.tabEle.on("click", ".right_area_d[data-role='school'] a", function(){
        _this.topTabEle.html( $(this).data("name") );
        if( $(this).data("type") == "all" ){
          _this.topTabEle.attr("data-district-id", $(this).data("id") );
          _this.topTabEle.removeAttr("data-campus-id");
        }else{
          _this.topTabEle.attr("data-campus-id", $(this).data("id") );
          _this.topTabEle.attr("data-district-id", $(this).data("pid") );
        }
        _this.topTabEle.removeAttr("data-nearby");
        _this.hideTab();
        _this.config.callClick && _this.config.callClick( $(this).data("id") );
      })
    },
    // 获取位置id
    getValue: function(){
      var oObj = {};
      oObj.nearby = this.topTabEle.data("nearby") ? this.topTabEle.data("nearby") : "";
      oObj.district_id = this.topTabEle.data("district-id") ? this.topTabEle.data("district-id") : "";
      oObj.campus_id = this.topTabEle.data("campus-id") ? this.topTabEle.data("campus-id") : "";
      return oObj;
    },
    // 隐藏tab
    hideTab: function(){
      this.topTabEle.removeClass("on");
      this.tabEle.removeClass("on");
      $(".marsk_opcity").remove();
    }
  };

  return categoryLocation;
});