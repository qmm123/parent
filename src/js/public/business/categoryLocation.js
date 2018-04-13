// 顶部筛选条件-位置
define([
  "public/tools/ajax",
  "public/tools/method",
  "publicBusiness/tabSwitch",
  "publicService/service",
  "publicTool/artTempFun",
  "text!template/category/location.html!strip"
], function(ajax, Method, tabSwitchs, Service, ArtFun, tpl) {

  ArtFun.parseTxtToTxt();
  var categoryLocation = {
    // 初始化
    init: function(opt){
      this.configer();
      this.renderLocation();
    },
    // 配置
    configer: function(){
      this.cityId = Method.getUrlParam("city_id") ? Method.getUrlParam("city_id") : 35;
      this.tabEle = $("#location_fu");
      this.tabLeft = $("#location_fu .left_area");
      this.tabRight = $("#location_fu .right_area");
    },
    // 渲染位置
    renderLocation: function(){
      var _this = this;
      Service.getZoneClassCampus({
        isShowLoading: false
      }, {
        city_id: _this.cityId
      }, function(data){
        console.log(data)
        Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
        tabSwitchs.secondSwitch("#location_fu .left_area .switch_a.area_d_a", "#location_fu .right_area_d");
      });
    }
  };

  return categoryLocation;
});