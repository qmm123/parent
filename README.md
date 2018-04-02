# 机构专属家长App展示层

+ JS使用**require**模块化组织JS代码
+ CSS采用**LESS**做预编译
+ HTML采用**artTemplate**模板引擎

**注意：如要使用ES6/ES7/ES8，babel-preset-env可以转为ES5，IE8以下版本无法支持。**

## 命令

```
npm install     // 安装gulp及插件
+ 建议安装cnpm，下载node包速度会快一些，下面是安装指令   // mac安装需要sudo权限
+ npm install -g cnpm --registry=https://registry.npm.taobao.org
npm run dev     // 启动开发版本，不压缩，启用css map
npm run pro     // 启动生产版本，压缩图片和js，不启用css map
npm run build     // 启动生产版本，压缩图片和js，不启用css map，不启动本地sever
npm run clean   // 删除dist文件夹(需在gulp do之前执行)
npm run sftp    // 将 dist/** 上传至sftp（上传至本地研发服务器）

```

## 基于gulp架构，详见package.json

+ babel-core             : babel内核，用于支持babel-preset-env。
+ babel-preset-env       : babel-preset-es2015已经停用，唯一的babel插件。
+ browser-sync           : http环境。
+ gulp-babel             : babel基于gulp的插件，需要和babel-preset-env一同使用。
+ gulp-changed           : 只编译改变的文件。
+ gulp-clean             : 删除文件及文件夹。
+ gulp-file-include      : 使html有Include的功能。
+ gulp-htmlmin           : html代码压缩。
+ gulp-if                : 条件语句。
+ gulp-imagemin          : 图片压缩。
+ gulp-less              : less编译。
+ less-plugin-autoprefix : css3补全前缀。
+ gulp-plumber           : 防止产生错误终止gulp。
+ gulp-sequence          : task同步队列。
+ gulp-sftp              : sftp上传。
+ gulp-sourcemaps        : css map。
+ gulp-uglify            : js压缩。
+ gulp-strip-debug       : 移除js压缩信息。
+ gulp-watch             : 检测。
+ minimist               : 处理node参数。

## 基于Node.js

### 项目版本相关配置: 

配置文件位置：**/src/projectConfig.json**

- **version**包括前端版本控制（用于清除缓存便于测试）
- **svnVersion**版本控制（生产环境真实版本-与version保持一致即可）
- **title**项目名称（用于页面title和gulp提示）
- **sftpProjectConfig**sftp相关配置

```
{
  "version"           : "1.0.0",
  "svnVersion"        : "1.0.0",
  "title"             : "机构专属家长App",
  "sftpProjectConfig" : {
    "host"       : "192.168.1.10",
    "port"       : "22",
    "user"       : "xiaohe",
    "pass"       : "Wfzf6&uoxGwzcpvA4+eRgiuMbH6oZv^P^C",
    "remotePath" : "/home/xiaohe/www/app/business.xiaohe.com.cn/bin/webroot/dist/"
  }
}
```

### 接口反向代理:

配置文件位置：**/src/mockRouteConfig.json**

用于实现反向代理，利于前后端分离，进行本地开发：
1. **path**为代理别名即ajax.url = "/api/vote"
2. **to**为被代理地址
3. http开头为跨域地址，/开头为本地地址。

```
{
  "routes": [
    {
      "path": "/api/vote", 
      "to": "http://www.baonahao.com/Ajaxs/getCategoryNameAndCourseNum",
      "commons": "接口信息备注"
    },
    {
      "path": "/api/getUserInfo",
      "to": "/mock/post1.json",
      "commons": "接口信息备注"
    }
  ]
}
```

## 主要技术栈

+ Zepto       : 不解释
+ require     : AMD模块化工具，项目的主要构件。源文件目录src/js，生成目录dist/。
+ Less        : CSS预编译语言。源文件目录src/less，生成目录dist/css。
+ Mock        : 解决方案有2种：
1. 基于mock.js假数据的解决方案。用于模拟数据接口格式即假数据，文件位置src/js/mock。(用于接口不存在的情况)
2. 接口反向代理(用于接口存在的情况)
+ artTemplate : HTML模板。源文件目录src/template，生成目录dist/。

## 目录结构
<pre>
src(项目源码)
├─agent(php接口代理层)
│  └─tmp
├─img(图片)
│  ├─icon(公共icon)
│  └─tpl3(第3套模板所用图片)【目录可依照情况自行定义】
│      ├─default(默认图片)
│      ├─header(头部图片)
│      └─icon(图标)
├─include(公共结构)
│  └─layout(布局)
├─js(js脚本文件目录)
│  ├─config(配置文件目录)
│  ├─page-1(模板1-js入口文件目录)
│  ├─page-2(模板2-js入口文件目录)
│  ├─page-3(模板3-js入口文件目录)
│  ├─page-DemoShow(代码示例-js入口文件目录)
│  ├─page-Index(之前规划的首页-js入口文件，现在弃用了)
│  └─public(公共逻辑)
│      ├─business(业务逻辑)
│      ├─layout(布局)
│      ├─logic(逻辑相关模块)【每套模板公共逻辑】
│      ├─service(接口通信层)==【接口统一调用封装,所有的接口调用必须再此处封装】==
│      └─tools(工具)【公共方法，不要涉及业务操作】
├─less(样式文件目录)
│  ├─component(组件)【公共组件及基础样式】
│  ├─layout(布局)
│  ├─page-1(模板1-less入口文件目录)
│  ├─page-2(模板2-less入口文件目录)
│  ├─page-3(模板3-less入口文件目录)
│  ├─page-DemoShow(代码示例-less入口文件目录)
│  ├─page-Index(之前规划的首页-less入口文件，现在弃用了)
│  └─variable(变量目录)
├─lib(第三方插件文件)
│  ├─css
│  └─js
│      ├─iscroll
│      │  └─img
│      ├─layer-mobile
│      └─photoswipe
│          └─default-skin
├─mock(模拟数据)
│  └─DemoShow(示例代码模拟数据部分)
└─view(视图文件目录)
    ├─1(模板1-视图目录)
    ├─2(模板2-视图目录)
    ├─3(模板3-视图目录)
    └─DemoShow(示例-视图目录)

</pre>

详见 src/README.md

## 代理接口调用
1. 示例地址：https://doc.oschina.net/jigou-web2.0
2. 密码：xiaohe.com

## 接口文档
文档地址：https://documenter.getpostman.com/view/2544557/collection/6n7TBuz

## css3兼容性速查
http://caniuse.com/#search=%3A%3Aafter


