// arttemplate相关方法
define([
  "artlib"
], function(template){
	var methods = {};

	/**
	 * @Author    高同檩
	 * @DateTime  2017-11-20
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

	return methods;
})