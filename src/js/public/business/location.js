// 页面跳转地址
define([
  "publicBusiness/pageConfig"
], function(pageConfig){
  var _root = "/";  // 根目录

  var localtionPath = {};
  for(var i in pageConfig){
    localtionPath[i] = _root + "view/" + pageConfig[i] +"?v=" + version;
  }

  return localtionPath;
});