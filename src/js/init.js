// 各个页面的初始化js
require(["../lib/js/zepto-1.2.0.min"], function () {
  requirejs([
    "public/business/headAndFoot",
    "public/business/pageRoute"
  ], function (headAndFoot, pageRoute) {
    loginIn();
    headAndFoot(function () {
      route(pageRoute);
    });
  });
});

// 登录时获取各个信息
function loginIn() {
  var _search = window.location.search.substring(1);
  if (!_search.length) return;
  _search = _search.split("&");

  $.each(_search, function (i, e) {
    var _e = e.split("=");

    if (_e[0] == "member_id") {
      localStorage.member_id = _e[1];
      return true;
    }

    if (_e[0] == "token") {
      localStorage.token = _e[1];
      return true;
    }

    if (_e[0] == "merchant_id") {
      localStorage.merchant_id = _e[1];
      return true;
    }
  });
}

// 页面入口文件路由配置
function route(pageRoute) {
  var pathname = window.location.pathname;

  // 测试页入口相关
  // =js原生桥接
  if (pathname.match("/DemoShow/webviewBridge.html")) {
    requirejs(["page-DemoShow/entry-webviewBridge"], function (init) {
      init();
    });
    return;
  }
  // =layer弹层
  if (pathname.match("/DemoShow/layer.html")) {
    requirejs(["page-DemoShow/entry-layer"], function (init) {
      init();
    });
    return;
  }
  // =zepto-animate动画
  if (pathname.match("/DemoShow/zeptoAnimate.html")) {
    requirejs(["page-DemoShow/entry-zeptoAnimate"], function (init) {
      init();
    });
    return;
  }

  // 首页入口
  // if (pathname.match("/index.html") || pathname == "/") {
  //   requirejs(["page-Index/entry-index"], function (init) {
  //     init();
  //   });
  //   return;
  // }

  // 模板1
  pageRoute(1);
  // 模板2
  pageRoute(2);
  // 模板3
  pageRoute(3);
}