// 列表-顶部筛选条件
define([
  "public/tools/ajax",
  "publicBusiness/tabSwitch",
  "publicService/service",
], function(ajax, tabSwitchs, Service) {
  // 顶部选项卡
  tabSwitchs.tabSwitch(".order_sort_u a.tab_swi_a", ".search_tab");

  tabSwitchs.secondSwitch("#location_fu .left_area .switch_a.area_d_a", "#location_fu .right_area_d");

  tabSwitchs.secondSwitch("#classify .left_area .switch_a.area_d_a", "#classify .right_area_d");
  
  tabSwitchs.thirdSwitch("#classify .switch_a.area_r");

  var TopCategory = {
    // 初始化
    init: function(opt){
      this.configer();
    },
    // 配置
    configer: function(){

    },
    // 渲染年部年级
    renderGrade: function(){
      
    }
  };

  return TopCategory;
});