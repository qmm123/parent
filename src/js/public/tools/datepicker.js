define(["publicTool/requestSchedule",
		"publicLogic/scheduleList"
	], function(RequestSchedule, bScroll) {
	var oDiv = document.getElementById('datepicker');		//日历总体容器
	var oH3 = oDiv.getElementsByTagName('h3')[0];	//显示年月的容器
	var oPrev = oDiv.getElementsByTagName('a')[0];	//上一月按钮
	var oNext = oDiv.getElementsByTagName('a')[1];	//下一月按钮
	var oUl = oDiv.getElementsByTagName('ul')[0];	//日历内容容器
	var aLi = oUl.children;							//日历内容单体
	var iNow = 0;
	var isFirst = true;
	var datepicker = {
		// 初始化
		init: function() {
			calendar();
			getDate();
			setStyle();
			var time = new Date();
			var years = time.getFullYear();
			var month = time.getMonth() + 1;
			bScroll.init();
			if(parseInt(month) < 10) {
				month = "0"+month
			}
			var day = time.getDate();
			var date_time = years + '-' + month + '-' + day;
			RequestSchedule.getList(date_time, function() {
				bScroll.refresh();
			});
		}
	}
	function calendar(){
		var index_show = $(oDiv).find('.date_list li.date_top').eq(0).index();
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth()+iNow,1);
		oH3.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
		oUl.innerHTML='';
		//插空格
		var _oDate = new Date();
		
		_oDate.setMonth(_oDate.getMonth()+iNow,1);
		_oDate.setDate(1);
		var w = _oDate.getDay()+1;
		if(w==0){w=7};
		w--;
		var curDate = new Date();
		var curMonth = curDate.getMonth();
		curDate.setMonth(curMonth + 1);
		curDate.setDate(0);
		var _num = curDate.getDate();
		for(var i=0;i<w;i++){
			var oLi = document.createElement('li');
			oLi.innerHTML= _num--;
			// oLi["data"] = 'no_pass';
			oLi.setAttribute("date", "no_pass");
			$(oUl).prepend(oLi);
		}
		
		//插入日期
		var _oDate = new Date();
		_oDate.setMonth(_oDate.getMonth()+iNow,1);
		_oDate.setMonth(_oDate.getMonth()+1,0);
		var n = _oDate.getDate();
		for(var i=0;i<n;i++){
			var oLi = document.createElement('li');

			oLi.innerHTML=i+1;
			$(oLi).addClass('_current')
			oUl.appendChild(oLi);
			// oLi.onmouseout=function(){
			// 	this.style.background='';
			// };
		}
		var _len = $(oUl).find('li').length;
		var __num = 1;
		var _count = Math.ceil(Number(_len)/7) * 7
		while(Number(_len) < _count) {
			_len++;
			var oLi = document.createElement('li');
			oLi.innerHTML=__num++;
			oLi.setAttribute("date", "no_pass");
			oUl.appendChild(oLi);
		}
		if(iNow==0){
			var _oDate = new Date();
			var today = _oDate.getDate();
			for(var i=0;i<aLi.length;i++){
				if(aLi[i].innerHTML<today){
					aLi[i].className+=' past';
				}else if(aLi[i].innerHTML==today){
					aLi[i].className+=' today';
				}
				// if(aLi[i].innerHTML==current){
				// 	alert(aLi[i].innerHTML)
				// 	$(aLi[i]).addClass('current');
				// }
			}
		}else if(iNow<0){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className+=' past';
			}
		}
		if(!index_show) {
			return
		}
		if(index_show >= 0) {
			$(oDiv).find('.date_list li').slice(0,index_show).hide();
			$(oDiv).find('.date_list li').slice(index_show, index_show+7).addClass('date_top');
			$(oDiv).find('.date_list li').slice(index_show+7).hide();
		}
		var years = oDate.getFullYear();
		var month = oDate.getMonth() + 1;
		if(parseInt(month) < 10){
			month = '0'+month;
		}
		var day = oDate.getDate();
		var date_time = years +"-" +month + '-' + day;
		var current_month = years +"-" + month;
		RequestSchedule.getSche(current_month);
	}
	
	//上个月
	oPrev.onclick=function(){
		iNow--;
		calendar();
		getDate();
		setStyle();
		var oUl = oDiv.getElementsByTagName('ul')[0];	//日历内容容器
		var aLi = oUl.children;	
		var current = new Date().getDate();
		for(var i=0;i<aLi.length;i++){
			if(aLi[i].innerHTML==current){
				$(aLi[i]).addClass('current');
			}
		}
	};
	//下个月
	oNext.onclick=function(){
		
		iNow++;
		calendar();
		getDate();
		setStyle();
		var oUl = oDiv.getElementsByTagName('ul')[0];	//日历内容容器
		var aLi = oUl.children;	
		var current = new Date().getDate();
		for(var i=0;i<aLi.length;i++){
			if(aLi[i].innerHTML==current){
				$(aLi[i]).addClass('current');
			}
		}
	};

	/* 获取选中日期 */
	function getDate(){
		var oLis = $("#datepicker .date_list li");
		oLis.on("tap", function(){
			if($(this).attr("date") !== "no_pass"){
				var sYearM = oH3.innerHTML;
				var iYear = sYearM.substring(0, 4);	//获取的年
				var iDate = $(this).html();			//获取的日
				if(iDate.split("").length == 1){
					iDate = 0 + iDate;
				}
				if(sYearM.substring(6) == "月"){
					var iMonth = 0 + sYearM.substring(5, 6);	//获取的月
				}
				else{
					var iMonth = sYearM.substring(5,7);
				}
				var date_time = iYear + '-' + iMonth + '-' + iDate;
				RequestSchedule.getList(date_time, function() {
					bScroll.refresh();
				});
			}
		});
	}
	

	/* 设置点击的样式 */
	function setStyle(){
		$("#datepicker ul li").on("tap",function (){
			if($(this).attr("date") !== "no_pass"){
				$(this).addClass('active').siblings().removeClass('active');
				$(".today").css("background-repeat","no-repeat");
			}
		})
	}
	datepicker.init();
	return datepicker;
})