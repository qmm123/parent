// load样式相关
define([

], function () {
	var loading = {};

	/**
  * [loadingCreate 创建局部loading]
  * @param  {[string]} obj    [盛放loading层容器的 id 值]
  * @param  {[number]} disTop [loading层的高度居中配置]
  * @param  {[object]} config [loading层的配置项]
  * 配置1 loadBox loading层外层容器
  * 配置2 loadImg loading层背景图片元素
  * @return {[null]}        [null]
  */
	loading.loadingCreate = function(obj, disTop,config) {
	  var config = config || {};
    var oParBox = $("#" + obj);
    var sPosi = oParBox.css("position");
    var sLoadBox = config.loadBox || "loading_section";
    var sLoadImg = config.loadImg || "load_img";
    var iTop = disTop || 0;
    var sTpl = '<div class='+ sLoadBox +'>'
                    + '<div class='+ sLoadImg +'></div>'
                + '</div>';

    if(sPosi == "static"){
        oParBox.addClass('position_r');
        oParBox.append($(sTpl));
        if(iTop){
        	oParBox.find("." + sLoadImg).css("margin-top", -iTop);
        }
    }
	}

	/**
  * [loadingCreate 销毁局部loading]
  * @param  {[string]} obj    [盛放loading层容器的 id 值]
  * @param  {[number]} time [销毁层延时时间]
  * @param  {[object]} config [loading层的配置项]
  * 配置1 loadBox loading层外层容器
  * @return {[type]}        [description]
  */
	loading.loadingDestroy = function(obj,time,config) {
	  var config = config || {};
	  var oParBox = $("#" + obj);
	  var sLoadBox = config.loadBox || "loading_section";
	  var iTime = time || 500;

	  setTimeout(function(){
	      if(oParBox.hasClass("position_r")){
	          oParBox.removeClass("position_r");
	      }
	      oParBox.find("." + sLoadBox).remove();
	  }, iTime);
	}

	return loading;
})