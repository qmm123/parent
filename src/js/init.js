// 各个页面的初始化js
require(["../lib/js/zepto-1.2.0.min"], function () {
  requirejs([
    "public/business/headAndFoot",
    "public/business/pageRoute"
  ], function (headAndFoot, pageRoute) {
    getBasciParams();
    headAndFoot(function () {
      route(pageRoute);
    });
  });
});

// 获取接口用的基本信息
function getBasciParams() {
  var _search = window.location.search.substring(1);
  if (!_search.length) return;
  // if (localStorage.member_id && localStorage.token)return;
  _search = _search.split("&");

  $.each(_search, function (i, e) {
    var _e = e.split("=");

    // 商家id
    if (_e[0] == "merchant_id") {
      localStorage.merchant_id = _e[1];
      return true;
    }

    // 家长id
    if (_e[0] == "parent_id") {
      localStorage.parent_id = _e[1];
      return true;
    }

    // 工程id
    if (_e[0] == "project_id") {
      localStorage.project_id = _e[1];
      return true;
    }

    // 版本
    if (_e[0] == "version") {
      localStorage.version = _e[1];
      return true;
    }

    // token 键
    if (_e[0] == "token_key") {
      localStorage.token_key = _e[1];
      return true;
    }

    // token 值
    if (_e[0] == "token_val") {
      localStorage.token_val = _e[1];
      return true;
    }

    // 消息推送-key
    if (_e[0] == "app_key") {
      localStorage.app_key = _e[1];
      return true;
    }

    // 模板配置-值要求为对象
    if (_e[0] == "tpl_config") {
      localStorage.tpl_config = _e[1];
      return true;
    }

  });
}

// 页面入口文件路由配置
function route(pageRoute) {
  var pathname = window.location.pathname;

  // 测试页入口相关
  // =js原生桥接
  if (pathname.match("/DemoShow/demo-webview.html")) {
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
  // =接口调用测试
  if (pathname.match("/DemoShow/apiService.html")) {
    requirejs(["page-DemoShow/entry-apiService"], function (init) {
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