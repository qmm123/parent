// 常用方法类
define([
  "artlib"
], function(template){
  var methods = {};

  /**
   * @Author    李鹏
   * @email     542416615@qq.com
   * @DateTime  2017-08-08
   * @copyright [反序列化，返回json]
   * @param     {[string]}         str ["a=1&b=2"]
   * @return    {[object]}             [{a:1,b:2}]
   */
  methods.unserialize = function(str) {
    if (!str) return {};
    var j = {};

    $.each(str.split("&"), function(i, e) {
      var arr = e.split("=");
      j[arr[0]] = arr[1];
    });

    return j;
  }

  /**
   * @Author    高同檩
   * @DateTime  2017-11-13
   * @copyright [选项卡]
   * @param     {[string]}         tit [tab 标题]
   * @param     {[string]}         con [tab 内容区]
   * @param     {[function]}         endFun [切换最后执行的回调]
   */
  methods.tabChange = function(tit, con, endFun) {
    var aTit = $(tit);
    var aCon = $(con);

    aTit.tap(function(){
      var iIdx = aTit.index( $(this) );
      aTit.removeClass("on");
      $(this).addClass("on");
      aCon.hide();
      aCon.eq(iIdx).show();
      endFun && endFun(iIdx);
    });
  }

  /**
   * @Author    高同檩
   * @DateTime  2017-11-15
   * @copyright [获取浏览器的宽和高]
   * @return     {[json]}         宽(width)和高(height)
   */
  methods.getViewPortSize = function() {
    var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    return {"width": winWidth + scrollL, "height":winHeight + scrollT};
  }

  /**
   * @Author    高同檩
   * @DateTime  2017-11-20
   * @copyright [数字转换千位分隔符]
   * @param     {[number]}         numb [100.00 或者 100]
   * @param     {[boolean]}        noDot true -> 不要小数点后两位 false -> 要小数点后两位
   * @return    {[string]}         返回处理好的千位分隔符
   */
  methods.toThousands = function(numb, noDot){
    var num = (numb || 0).toString();
    var rReg = /\./g; //判断是否有 . 符号-正则
    var rReg1 = /\.\d{1}$/; //判断是否是小数点后一位
    var bBoo = rReg.test(num); //判断是否有 . 符号-变量
    var sSympolDian = ""; //小数点后面的数字
    if(bBoo){
      sSympolDian = num.match(/\.\d{1,2}/)[0];
    }else{
      sSympolDian = ".00";
    }
    num = Math.floor(numb).toString();

    var result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }

    // 判断是否需要小数点后两位
    if(noDot){
      return result;
    }
    // 返回结果
    result = result + sSympolDian;

    if( rReg1.test(result) ){
      return result + "0";
    }
    
    return result;
  }

  /**
   * @Author    高同檩
   * @DateTime  2017-11-20
   * @copyright [获取url search部分 指定名称的属性值]
   * @param     {[string]} name    要获取的属性的属性名
   * @return    {[string]}         指定名称的属性值
   */
  methods.getUrlParam = function(name){
    var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result  = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }

  /**
   * @Author    高同檩
   * @DateTime  2018-2-27
   * @copyright [允许页面缩放 改变meta标签]
   * @return    {[null]}         null
   */
  methods.allowPageScale = function(){
    $("meta[name='viewport']").attr("content", "width=device-width, initial-scale=1");
  }

  /**
   * @Author    高同檩
   * @DateTime  2017-09-26
   * @copyright [arttemplate渲染-调用的是 template的基础方法（渲染基于 script 模板的id）]
   * @param     {[listEle]}     渲染元素 需要传jquery对象
   * @param     {[tplId]}       模板id
   * @param     {[data]}        渲染数据源
   * @param     {[isAppend]}    是否是向后追加元素 true -> 向后追加 false(默认值) -> 直接覆盖
   * @return    {[null]}        null
   */
  methods.artRender = function(listEle, tplId, data, isAppend){
    var sTpl = template(tplId, data);
    if(isAppend){
      listEle.append(sTpl);
    }else{
      listEle.html(sTpl);  
    }
  }

  /**
   * @Author    高同檩
   * @DateTime  2017-09-28
   * @copyright [arttemplate渲染-调用的是 template的 render 方法(渲染基于字符串)]
   * @param     {[listEle]}     渲染元素 需要传jquery对象
   * @param     {[tpl]}         模板内容，及模板字符串
   * @param     {[data]}        渲染数据源
   * @param     {[isAppend]}    是否是向后追加元素 true -> 向后追加 false(默认值) -> 直接覆盖
   * @return    {[null]}        null
   */
  methods.artRenderString = function(listEle, tpl, data, isAppend){
    var sTpl = template.render(tpl, data);
    if(isAppend){
      listEle.append(sTpl);
    }else{
      listEle.html(sTpl);  
    }
  }

  return methods;
});