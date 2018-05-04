// arttemplate相关方法
define([
  "artlib"
], function(template){
	var methods = {};

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
  methods.artRender = function(listEle, tplId, data, isAppend, callback){
    var sTpl = template(tplId, data);
    if(isAppend){
      listEle.append(sTpl);
      setTimeout(function(){
        callback && callback();
      }, 20)
    }else{
      listEle.html(sTpl);
      setTimeout(function(){
        callback && callback();
      }, 20)
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
  methods.artRenderString = function(listEle, tpl, data, isAppend, callback){
    var sTpl = template.render(tpl, data);
    if(isAppend){
      listEle.append(sTpl);
    }else{
      listEle.html(sTpl);  
    }
    setTimeout(function(){
      callback && callback();
    }, 20);
  }

  /**
   * @Author    高同檩
   * @DateTime  2018-4-23
   * @copyright [获取artTemplate模板字符串]
   * @param     {[tpl]}         模板内容，及模板字符串
   * @param     {[data]}        渲染数据源
   * @param     {[type]}        默认通过id获取，true->通用过模板字符获取
   * @return    {[string]}      模板字符
   */
  methods.getArtString = function(tpl, data, type){
    var sTpl = "";
    if(type){
      sTpl = template.render(tpl, data);
    }else{
      sTpl = template(tpl, data);
    }
    return sTpl;
  }

	/**
	 * @Author    高同檩
	 * @DateTime  2017-11-29
	 * @copyright [arttemplate-helper 将数字转换成字母]
	 * @param     {[key]}    number     数字索引
	 * @return    {[string]}            处理好的
	 */
	methods.parseNumberToLetter = function(key){
	  template.defaults.imports.parseNumberToLetter = function(key){
	    var obj = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	    return obj[key];
	  }
	}

  /**
   * @Author    高同檩
   * @DateTime  2018-4-17
   * @copyright [arttemplate-helper 计算评分星数]
   * @param     {[score]}    number     获得分数
   * @param     {[type]}    number     类型 默认为5分制 1->为100分制
   * @return    {[number]}            宽度值
   */
  methods.calculateStar = function(score, type){
    template.defaults.imports.calculateStar = function(score, type){
      var iLen = 0;
      switch(type){
        case 1:
          iLen = calculate(score, 100);
        break;
        default:
          iLen = calculate(score, 5);
      }
      function calculate(score, num){
        return (score/num)*75 - 1;
      }
      return iLen;
    }
  }


	return methods;
})