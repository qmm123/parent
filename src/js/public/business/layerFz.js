// layer弹窗二次封装
define([
  "layer"
], function(layer) {
  var layerCopy = {};

  var defaultOps = {
    iconPath: "lib/skin/jigou/",    // 自定义icon路径
    time: 2000                      // 若提示自动关闭时间
  };

  layerCopy.open = function(ops){
    var ags = [].slice.call(arguments);
    return layer.open.apply(this, ags);
  };

  layerCopy.close = function(){
    var ags = [].slice.call(arguments);

    return layer.close.apply(this, ags);
  };

  layerCopy.closeAll = function(){
    var ags = [].slice.call(arguments);
    
    return layer.closeAll.apply(this, ags);
  };

  layerCopy.load = function(ops){
    var defaults = {
      type: 2,
      content: "加载中",
      shadeClose: false
    }
    var opt = $.extend({}, defaults, ops);
    return layer.open(opt);
  }

  layerCopy.alert = function(ops){
    var defaults = {
      content: "操作失败",
      shadeClose: false,
      btn: "知道了"
    }
    var opt = $.extend({}, defaults, ops);
    return layer.open(opt);
  }

  layerCopy.msg = function(ops){
    var defaults = {
      content: "操作失败",
      skin: "msg",
      time: 3
    }
    var opt = $.extend({}, defaults, ops);
    return layer.open(opt);
  }

  return layerCopy;
});