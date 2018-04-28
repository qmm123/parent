import {
  gulp,
  path,
  root,
  distFolder,
  options
} from "./options_module.js";

import browser from 'browser-sync';
let browserSync = browser.create();

const servertask = () => {
  gulp.task("server", () => {
    browserSync.init({
      host: "0.0.0.0",
      port: 8088, //定义端口
      browser: ["chrome"], //默认chrome打开文件
      logLevel: "info", //链接服务器显示基本信息
      server: './dist', //监听当前文件夹
      directory: true,
      logPrefix: "机构专属家长App", //更改修改日志主题部分
      open: true,
      // startPath: "wv_tengy_login_sign.html",//默认打开文件
      /*定义远程调试的端口*/
      ui: {
        port: 8089,
        weinre: {
          port: 8089
        }
      }
    });
  });
}

module.exports = servertask;