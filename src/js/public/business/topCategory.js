// 班课列表-顶部筛选条件
define([
  "public/tools/ajax",
  "public/tools/method",
  "publicBusiness/tabSwitch",
  "publicService/service",
  "publicBusiness/categoryLocation"
], function(ajax, Method, tabSwitchs, Service, categoryLocation) {
  // 顶部选项卡
  // =顶部一级和下面一级
  tabSwitchs.tabSwitch(".order_sort_u a.tab_swi_a", ".search_tab");

  // 课程分类
  tabSwitchs.secondSwitch("#classify .left_area .switch_a.area_d_a", "#classify .right_area_d");
  
  // 课程分类三级
  tabSwitchs.thirdSwitch("#classify .switch_a.area_r");

  var TopCategory = {
    // 初始化
    init: function(opt){
      this.configer();
      categoryLocation.init();
    },
    // 配置
    configer: function(){
      
    }
  };

  return TopCategory;
});