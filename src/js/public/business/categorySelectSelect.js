// 顶部筛选条件-筛选(老师)
define([
  "public/tools/method",
  "public/tools/radioCheck",
  "text!template/category/selectSelect.html!strip"
], function(Method, radioCheck, tpl) {

  var categorySelectSelect = {
    // 初始化
    init: function(opt){
      this.configer(opt);
      this.renderSelect();
      this.eleClick();
    },
    // 配置
    configer: function(opt){
      var defaults = {
        callClick: ""//点击回调
      };
      this.config = $.extend(true, defaults, opt);
      this.topTabEle = $("#selectSelectTab");//顶部智能排序元素
      this.tabEle = $("#selectSelect");//选项卡整体
    },
    // 渲染课程分类
    renderSelect: function(){
      var _this = this;
      // Method.artRenderString(_this.tabEle, $(tpl).html(), data.result);
      _this.tabEle.html(  $(tpl).html() );
    },
    // 元素点击切换
    eleClick: function(){
      var _this = this;
      // 点击标签添加样式
      radioCheck.radio({
        eleFolder: "[data-role='staus_sele']",
        eleEvent: ".staus span"
      });
      // 重置按钮
      $('[data-role="reset"]').on('tap',function(){
        // $('.search_tabs .search_tab .sidebar .main .qujian_zone ul li span').removeClass('on');
        radioCheck.radioReset({
          eleFolder: "[data-role='staus_sele']",
          eleEvent: ".staus span"
        });
      });
      // 确定按钮
      $('.bottom_ctrl .ok').on('tap',function(){
        _this.hideTab();
        var sStr = radioCheck.getRadioValue({
          eleFolder: "[data-role='staus_sele']",
          eleEvent: ".staus span"
        });
        _this.config.callClick && _this.config.callClick( sStr );
      });
    },
    // 获取筛选(老师)id
    getValue: function(){
      var sStr = radioCheck.getRadioValue({
        eleFolder: "[data-role='staus_sele']",
        eleEvent: ".staus span"
      });
      return sStr;
    },
    // 隐藏tab
    hideTab: function(){
      this.topTabEle.removeClass("on");
      this.tabEle.removeClass("on");
    }
  };

  return categorySelectSelect;
});