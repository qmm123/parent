// 业务主入口(进入页面后的必要验证及信息记录)
define([
  "public/tools/ajax",
], function(ajax) {
  // app授权接口需求-这个是（apiparent.xiaohe.com）对应的平台id
  localStorage.platform_id = "d2eef03584d44ae0b6344d4c54731211"; // 写死不去获取，获取的ID有问题
  // app授权接口需求-这个是（api.baonahao.com）对应的平台id
  // localStorage.platform_id = "f7a3d19f52d6c5ab7841c7b82f03805a"; // 写死不去获取，获取的ID有问题

  // 消息推送-类型（1为家长端）
  localStorage.app_type = 1;

  // 用于gulp构建工具开发页面用（默认本地开发开启反向代理时才会生效）
  if(window.IsProxy == "true"){
    localStorage.merchant_id = "096da6a9253f46ddae05c12b7271ca13";
    localStorage.parent_id = "3c1b0646ce520407a0fedfd17f3a56b6";
    localStorage.project_id = "485a030e2c4c43fe97a2554ffe9a738f";
    localStorage.version = "1.6.0";
    // 验证token
    localStorage.token_key = "3c1b0646ce520407a0fedfd17f3a56b6";
    localStorage.token_val = "3dd4101d10814c3baa780ad5790384c5";
    // 消息推送-值
    localStorage.app_key = "0bdfd821e3432cc04d262152";
  }

  return function(cb) {
    cb();
  }
});