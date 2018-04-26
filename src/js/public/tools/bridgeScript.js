// webviewJavascriptBridge 封装-用于注册事件
define([
  
], function(){
	function setupWebViewJavascriptBridge(callback) {
		var oAgent = $.os;
		//Android使用
		if(oAgent.android){
			if (window.WebViewJavascriptBridge) {
				callback(WebViewJavascriptBridge)
			} else {
				document.addEventListener('WebViewJavascriptBridgeReady', function() {
					callback(WebViewJavascriptBridge);
				},false);
			}
		}

		//iOS使用
		if(oAgent.ios){
			if (window.WebViewJavascriptBridge) {
				return callback(WebViewJavascriptBridge);
			}
			if (window.WVJBCallbacks) {
				return window.WVJBCallbacks.push(callback);
			}
		}
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
	}
	return setupWebViewJavascriptBridge;
})