// ajax类
define([
  "public/business/layerFz",
  "public/business/backEndStatusCode",
  "public/business/nativeFun"
], function(layer, StatusCode, nativeFun) {
  function ajax(obj, successcallback, failcallback) {
    var options = {
      // url: '/agent/index.php?func=api',
      type: 'post',
      cache: 'false',
      dataType: 'json',
      isShowLoading: true,//是否显示默认的加载动画
      showLoadingTxt: "",//加载动画的文本
      data: {
        "api_name": "api_parent", //请求接口api名称（一个项目可能调用多个域名的接口）eg:api_join 为加盟中心的接口名称
        "keys": {
          "token_key": localStorage.token_key,
          'token_val': localStorage.token_val
        },
        "data": {}
      }
    };

    var loadingIndex = 0;

    $.extend(true, options, obj);

    // 判断是否进行反向代理
    if(window.IsProxy == "false"){//不开启反向代理
      if(!options.data.uri){
        options.data.uri = options.url;
      }
      options.url = '/agent/index.php?func=api';
    }else if(window.IsProxy == "true"){
      if(options.data.api_name == ""){
        options.data.keys.packey = "f7a3d19f52d6c5ab7841c7b82f03805a";
        options.data.keys.security_code = "t2)H)@g]R]&[VhG&CJCB?QxdFJH#j)LUIU#VyO^grY[ZjQ)wMz%qxUD6aG8EUFv[";
      }else{
        options.data.keys.packey = "d2eef03584d44ae0b6344d4c54731211";
        options.data.keys.security_code = "v1YDrA19KqLn5khsko8db6]4eR3(qS3[7fdew$c^XMh$6g6x)R.GaNHBmb86n%qV";
      }
    }

    if (options.dataType === "json") {
      options.beforeSend = function() {
        if(options.isShowLoading){
          loadingIndex = layer.load({
            content: options.showLoadingTxt ? options.showLoadingTxt : "加载中"
          });
        }
      };
    }

    var jqXHR = $.ajax(options);

    // 接口请求成功
    jqXHR.done(function(json, textStatus, jqXHR) {
      // 接口请求成功--请求结果失败
      console.log(json)
      if (json.status == false) {

        // 接口的提示信息
        var msg = json.code_user_msg || json.code_msg;

        // 没有登录状态处理-这个需要与后台沟通确定准确的值
        if (json.code == StatusCode.tokenFailure) {
          layer.close(loadingIndex);
          
          // 清楚本地存储
          localStorage.clear();
          // 通知原生跳转到登录页
          nativeFun("logout");
        } else {
          layer.close(loadingIndex);
          window.boxErrorIndex && layer.close(window.boxErrorIndex);
          window.boxErrorIndex = layer.msg({
            content: msg
          });
        }

        failcallback && failcallback(jqXHR, "statusFalse", json);
        return;
      }

      layer.close(loadingIndex);
      successcallback && successcallback(json);

      // codefn(json.code, json.message, function() {


      //   successcallback && successcallback(json);
      // }, failcallback);
    });

    // 接口请求失败
    jqXHR.fail(function(jqXHR, textStatus, errorThrown) {
      console.log('请求失败===============')
      layer.close(loadingIndex);
      if (jqXHR.status == 404) {
        alertmodel("接口不存在");
      }

      if (jqXHR.status == 500) {
        alertmodel("服务器错误");
      }

      failcallback && failcallback(jqXHR, textStatus, errorThrown);
      // console.log(jqXHR);
      // console.log(textStatus);
      // console.log(errorThrown);
    });
    return jqXHR;
  }

  // 错误提示的通知
  function alertmodel(txt, call){
    layer.alert({
      content: txt,
      btn: ["知道了"],
      yes: function(index){
        call && call();
        layer.close(index);
      }
    });
  }

  // 根据接口状态码定义不同的提示--需要与后台沟通？
  function codefn(code, message, callback, failcallback) {
    switch (Number(code)) {
      case 200:
        if (message) {
          alertmodel(message);
        }
        callback && callback();
        break;
      case 401:
        loginout(message); // 未登
        failcallback && failcallback();
        break;
      case 401.0:
        loginout(message); // 未登录
        failcallback && failcallback();
        break;
      case 403:
        noPermissions(message); // 无权访问
        failcallback && failcallback();
        break;
      case 403.0:
        noPermissions(message); // 无权访问
        failcallback && failcallback();
        break;
      case -1:
        businessError(message); // 业务错误
        failcallback && failcallback();
        break;
      case 500.1:
        businessThrown(message); // 业务异常
        failcallback && failcallback();
        break;
      case 500.2:
        systemThrown(message); // 系统异常
        failcallback && failcallback();
        break;
      default: // renderhtml
        callback && callback();
        break;
    }
  }

  // 与上面函数配合的函数
  function loginout(message) {
    alertmodel(message, function() {
      window.location.href = login;
    });
    // loadingmodel.close();
  }

  function noPermissions(message) {
    alertmodel(message);
    // loadingmodel.close();
  }

  function businessError(message) {
    alertmodel(message);
    // loadingmodel.close();
  }

  function businessThrown(message) {
    alertmodel(message);
    // loadingmodel.close();
  }

  function systemThrown(message) {
    alertmodel(message);
    // loadingmodel.close();
  }

  return ajax;
});