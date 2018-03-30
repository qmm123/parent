/**
 * 文件变动监测及server
 */

import {
  gulp,
  path,
  root,
  revPath,
  srcFolder,
  distFolder,
  sourcemaps,
  options
} from "./options_module.js";
import sequence from "gulp-sequence";
import clean from 'gulp-clean';
import watch from 'gulp-watch';
import browser from 'browser-sync';

// 获取配置文件，并返回对象
import {title} from "./getProjectConfig";
// 获取代理
var mockApi = require('./toProxy');

let browserSync = browser.create();
let reload = browserSync.reload;

const pointfn = (ev) => {
  let s = "";
  switch (ev.type.trim()) {
    case "added":
      s = `新增文件，文件路径：${ev.path}`
      console.log(s);
      break;
    case "changed":
      s = `文件改变，文件路径：${ev.path}`
      console.log(s);
      break;
    case "deleted":
      s = `文件删除，文件路径：${ev.path}`
      console.log(s);
      break;
    default:
      s = `未知`
      console.log(s);
      break;
  }
}

const watchtask = () => {
  gulp.task("server", () => {
    let url = require("url");

    browserSync.init({
      port      : 8088, //定义端口
      // browser   : ["chrome"], //默认chrome打开文件
      logLevel  : "info", //链接服务器显示基本信息
      // server    : './dist', //监听当前文件夹
      server: {
        baseDir: "./dist",
        middleware: function(req, res, next) {
          var urlObj = url.parse(req.url, true),
            method = req.method,
            paramObj = urlObj.query;
          // mock数据
          mockApi(res, req, urlObj.pathname, next);
        }
      },
      directory : true,
      logPrefix : title, //更改修改日志主题部分
      open      : false,
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

  gulp.task("watch", () => {
    let _agent       = path.resolve(root.src, "agent/*");
    let _mock        = path.resolve(root.src, "mock/*");
    let _include     = path.resolve(root.src, "include/*");
    let _art         = path.resolve(srcFolder.html, "**");
    let _html        = path.resolve(root.src, "view/**");
    let _index       = path.resolve(root.src, "*.html");
    let _versionjson = path.resolve(root.src, "v.json");

    watch([_include, _mock, _art, _html, _index, _versionjson], function() {
      sequence("html")((err) => {
        if (err) console.log(err)
        reload();
      });
    });

    watch(path.resolve(srcFolder.js, "**"), function() {
      sequence("js")((err) => {
        if (err) console.log(err)
        reload();
      })
    });

    watch(path.resolve(srcFolder.lib, "**"), function() {
      sequence("lib")((err) => {
        if (err) console.log(err)
        reload();
      })
    });

    watch(path.resolve(srcFolder.css, "**"), function() {
      sequence("less")((err) => {
        if (err) console.log(err)
        reload();
      });
    });

    watch(path.resolve(srcFolder.image, "**"), function() {
      sequence("image")((err) => {
        if (err) console.log(err);
        reload();
      });
    });

    watch(_agent, function() {
      sequence("copyAgent")((err) => {
        if (err) console.log(err);
      });
    });
  });
}
module.exports = watchtask;