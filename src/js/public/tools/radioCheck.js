// 模拟单选框及复选框 封装
define([
  "publicTool/method",
], function(Method){
	var RadioCheck = {};

	// 单选框
	RadioCheck.radio = function(opt){
		var defaults = {
			delegateEle: "",//delegateEle 代理元素（jq对象）
			eleFolder: "[data-role='radio']",//元素标记层
			eleEvent: "",//点击事件元素
			classSelected: "on",//选中的class
			callBefore: "",//变化之前的回调
			callAfter: "",//变化之后的回调
		}
		$.extend(true, defaults, opt);
		var oDele = defaults.delegateEle ? defaults.delegateEle : $(document);
		oDele.on("tap", defaults.eleFolder + " " + defaults.eleEvent, function(){
			defaults.callBefore && defaults.callBefore( $(this) );
			$(this).parents(defaults.eleFolder).find(defaults.eleEvent).removeClass(defaults.classSelected);
			$(this).addClass(defaults.classSelected);
			defaults.callAfter && defaults.callAfter( $(this) );
		})
	}

	// 单选框重置
	RadioCheck.radioReset = function(opt){
		var defaults = {
			eleFolder: "[data-role='radio']",//元素标记层
			eleEvent: "",//点击事件元素
			classSelected: "on",//选中的class
			resetAttr: "data-default"//重置元素属性
		}
		$.extend(true, defaults, opt);
		var oSelected = $(defaults.eleFolder + " " + defaults.eleEvent + "[" + defaults.resetAttr + "=true]");
		oSelected.parents(defaults.eleFolder).find(defaults.eleEvent).removeClass(defaults.classSelected);
		oSelected.addClass(defaults.classSelected);
	}

	// 获取radio类型元素的值
	RadioCheck.getRadioValue = function(opt){
		var defaults = {
			eleFolder: "[data-role='radio']",//元素标记层
			eleEvent: "",//点击事件元素
			classSelected: "on",//选中的class
			keyAttr: "data-input-key",//键存储属性
			valAttr: "data-input-value"//值存储属性
		}
		$.extend(true, defaults, opt);
		var sStr = "";
		$(defaults.eleFolder).each(function(){
			var sName = $(this).attr(defaults.keyAttr);
			sStr += (sName + "=");
			var sVal = $(this)
									.find(defaults.eleEvent + "." + defaults.classSelected)
									.attr(defaults.valAttr);
			sStr += (sVal + "&");
		})
		return Method.unserialize( sStr.replace(/\&$/g, "") );
	}



	return RadioCheck;
})