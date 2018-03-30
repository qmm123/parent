// 业务主入口(进入页面后的必要验证及信息记录)
define([
  "public/tools/ajax",
], function(ajax) {
  // app授权接口需求-这个是（apiparent.xiaohe.com）对应的平台id
  localStorage.platform_id = "d2eef03584d44ae0b6344d4c54731211"; // 写死不去获取，获取的ID有问题

  // 用于gulp构建工具开发页面用（默认本地开发开启反向代理时才会生效）
  if(window.IsProxy == "true"){
    localStorage.merchant_id = "a7e431fbeb2b805b38180cd2ca8d1d27";
    localStorage.parent_id = "8fa233ea54af49179b44ce28e01266b4";
    localStorage.token = "ff8df5e70c22401c99744a0ee89d2477";
    localStorage.project_id = "387c84e4e765db6e43651888abfb9c7a";
  }

  return function(cb) {
    cb();
  }
});