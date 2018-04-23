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
		var aSelected = $(defaults.eleFolder + " " + defaults.eleEvent + "[" + defaults.resetAttr + "=true]");
		aSelected.parents(defaults.eleFolder).find(defaults.eleEvent).removeClass(defaults.classSelected);
		aSelected.addClass(defaults.classSelected);
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

	// 多选框
	RadioCheck.checkbox = function(opt){
		var defaults = {
			delegateEle: "",//delegateEle 代理元素（jq对象）
			eleFolder: "[data-role='checkbox']",//元素标记层
			eleEvent: "",//点击事件元素
			classSelected: "on",//选中的class
			callBefore: "",//变化之前的回调
			callAfter: "",//变化之后的回调
		}
		$.extend(true, defaults, opt);
		var oDele = defaults.delegateEle ? defaults.delegateEle : $(document);
		oDele.on("tap", defaults.eleFolder + " " + defaults.eleEvent, function(){
			defaults.callBefore && defaults.callBefore( $(this) );
			if( $(this).hasClass(defaults.classSelected) ){
				$(this).removeClass(defaults.classSelected);
				if( getType( $(this) ) == "trueFalse" ){
					$(this).data("input-value", "2");
				}
			}else{
				$(this).addClass(defaults.classSelected);
				if( getType( $(this) ) == "trueFalse" ){
					$(this).data("input-value", "1");
				}
			}
			defaults.callAfter && defaults.callAfter( $(this) );
		})
		// 获取复选框的类型
		// 类型：1->普通型 2->true false型【trueFalse】
		function getType(objThis){
			return objThis.data("input-type");
		}
	}

	// 多选框重置
	RadioCheck.checkboxReset = function(opt){
		var defaults = {
			eleFolder: "[data-role='checkbox']",//元素标记层
			eleEvent: "",//点击事件元素
			classSelected: "on",//选中的class
			resetAttr: "data-default",//重置元素属性
			typeAttr: "data-input-type"
		}
		$.extend(true, defaults, opt);
		$(defaults.eleFolder).each(function(){
			var aEle = $(this).find(defaults.eleEvent);
			aEle.each(function(){
				if( $(this).attr(defaults.resetAttr) == "true" ){//默认选中类型
					$(this).addClass("on");
					if( getType( $(this) ) == "trueFalse" ){//类型为1是2否类型
						$(this).data("input-value", "1");
					}
				}else{
					$(this).removeClass("on");
					if( getType( $(this) ) == "trueFalse" ){//类型为1是2否类型
						$(this).data("input-value", "2");
					}
				}
			});
		})
		// 获取复选框的类型
		// 类型：1->普通型 2->true false型【trueFalse】
		function getType(objThis){
			return objThis.data("input-type");
		}
	}

	// 获取checkbox类型元素的值
	RadioCheck.getCheckboxValue = function(opt){
		var defaults = {
			eleFolder: "[data-role='checkbox']",//元素标记层
			eleEvent: "",//点击事件元素
			classSelected: "on",//选中的class
			keyAttr: "data-input-key",//键存储属性
			valAttr: "data-input-value",//值存储属性
			symbol: ","//多个值之间的分隔符
		}
		$.extend(true, defaults, opt);
		var sStr = "";
		$(defaults.eleFolder).each(function(){
			var sName = $(this).attr(defaults.keyAttr);
			sStr += (sName + "=");
			var sVal = "";
			$(this).find(defaults.eleEvent).each(function(){
				if( $(this).hasClass(defaults.classSelected) ){
					sVal += ( $(this).attr(defaults.valAttr) + defaults.symbol);
				}else{
					if( getType( $(this) ) == "trueFalse" ){
						sVal += ( $(this).attr(defaults.valAttr) + defaults.symbol);
					}
				}
			})
			var rReg = new RegExp(defaults.symbol + "$", "g");
			sStr += ( sVal.replace(rReg, "") + "&");
		})
		// 获取复选框的类型
		// 类型：1->普通型 2->true false型【trueFalse】
		function getType(objThis){
			return objThis.data("input-type");
		}
		return Method.unserialize( sStr.replace(/\&$/g, "") );
	}



	return RadioCheck;
})