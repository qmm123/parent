// requirejs 配置文件
requirejs.config({  
  urlArgs: "bust=" + version,
  waitSeconds: 0,
  paths: {
    // 项目文件夹
    "template" : "../template",
    "mock"     : "../mock",
    "css"      : "../css",
    "lib"      : "../lib",
    "publicBusiness": "./public/business",
    "publicLayout": "./public/layout",
    "publicService": "./public/service",
    "publicTool": "./public/tools",
    "publicLogic": "./public/logic",

    // 常用模块
    "ajax"     : "./public/tools/ajax",

    // CSS库
    "animate"        : "../lib/css/animate.min",
    
    // JS库
    "zepto"          : "../lib/js/zepto-1.2.0.min",//zepto库 包含核心模块，touch模块，selector模块，show,hide方法模块, detect模块, animate模块
    "layer"          : "../lib/js/layer-mobile/layer-mobile",                       // layer-mobile弹出层
    "mocklib"        : "../lib/js/mock-min",                    // mock库
    "artlib"         : "../lib/js/template-web",                // artTemplate，web端Js库
    "decimal"        : "../lib/js/decimal",                     // 浮点数运算,github地址：https://github.com/shinuza/decimal-js
    "TouchSlide"        : "../lib/js/TouchSlide.1.1",                     // touchslide轮播图等插件
    "WheelPicker"        : "../lib/js/wheelpicker.min",                     // 选择器插件
    "echarts"        : "../lib/js/echarts.min", //echarts 图标插件
    "photoswipe"        : "../lib/js/photoswipe/photoswipe.min", //图片预览插件
    "photoswipeUi"        : "../lib/js/photoswipe/photoswipe-ui-default.min", //图片预览插件
    "iScroll"        : "../lib/js/iscroll/iscroll", //iscroll4.2版本

    // 第三方服务
    "wexinSdk"        : "http://res.wx.qq.com/open/js/jweixin-1.2.0", //微信sdk

    // requireJs 第三方插件
    "text"  : '../lib/js/text',//requirejs 请求外部文本
    "style" : '../lib/js/css.min'//requirejs 插入样式表方法
  },
  map: {},
  shim: {
    "decimal":{
      exports: 'Decimal'
    },
    "layer":{
      exports: 'layer'
    },
    "TouchSlide":{
      exports: 'TouchSlide'
    },
    "WheelPicker":{
      exports: 'WheelPicker'
    },
    "iScroll":{
      exports: 'iScroll'
    }
  }
});