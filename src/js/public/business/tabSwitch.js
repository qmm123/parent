// 列表-顶部筛选条件-选项卡切换
define([
], function() {
  var tabSwitchs = {};

  /**
 * [tabSwitch 普通选项卡]
 * @param  {[string]} obj [选项卡标题]
 * @param  {[string]} tab [选项卡内容]
 * @return {[type]}     [description]
 */
  tabSwitchs.tabSwitch = function(obj, tab){
    $(obj).on("tap", function(){
      var iInd = $(obj).index(this);
      if($(this).parent().attr("data-role") == "drap" && !$(this).hasClass('on')){
        $("#select_menu").show();
        $(obj).removeClass('on');
        $(this).addClass('on');
        $(tab).removeClass('on');
        if(!$(".marsk_opcity").length){
          $("<div class='marsk_opcity'></div>").appendTo($("body"));
        }
      }else if($(this).parent().attr("data-role") == "drap" && $(this).hasClass('on')){
        $("#select_menu").hide();
        $(this).removeClass('on');
        $(".marsk_opcity").remove();
      }
      if(!$(this).hasClass('on') && $(this).parent().attr("data-role") != "drap"){
        $(obj).removeClass('on');
        $(this).addClass('on');
        $(tab).removeClass('on');
        $(tab).eq(iInd).addClass('on');
        $("#select_menu").hide();
        if(!$(".marsk_opcity").length){
          $("<div class='marsk_opcity'></div>").appendTo($("body"));
        }
      }else if($(this).hasClass('on') && $(this).parent().attr("data-role") != "drap"){
        $(obj).removeClass('on');
        $(tab).removeClass('on');
        $("#select_menu").hide();
        $(".marsk_opcity").remove();
      }
      $(".marsk_opcity").on("tap", function(){
        $(".search_tab").removeClass('on');
        $(".order_sort_u a").removeClass('on');
        $("#select_menu").hide();
        $(this).remove();
        // 取消事件穿透
        $(".agent_list_con").css("pointer-events", "none");
        setTimeout(function(){
          $(".agent_list_con").css("pointer-events", "auto");
        }, 400);
      });
    });
  }

  // 二级选项卡函数
  tabSwitchs.secondSwitch = function(obj, tab){
    $(obj).on("tap", function(){
      var iInd = $(this).parent().find(obj).index(this);
      $(this).addClass('on').siblings().removeClass('on');
      $(this).parent().siblings().find(tab).removeClass('on');
      $(this).parent().siblings().find(tab).eq(iInd).addClass('on');
    });
  }

  // 三级选项卡函数
  tabSwitchs.thirdSwitch = function(obj){
    $(obj).on("tap", function(){
      $(this).toggleClass('on');
      $(this).siblings().toggleClass('current');
    });
  }

  return tabSwitchs;
});