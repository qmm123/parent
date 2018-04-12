define([
	"publicService/service",
	"publicTool/method"
	], function(Service, Method) {
		var requestSchedule = {

		}
		// 获取课表 (全部日期)
		requestSchedule.getSche = function(current_month, successCallback, errorCallback) {
			Service.getScheduleCourseListOpenDate(null, {
			}, function(data) {
				var _data = data.result.data;
				if (data.status) {
					if(_data && _data.length > 0) {
						addClass(_data, current_month)
					}
				}
			}, function(err, data) {
				// console.log(err, data);
			})
		}
		// 获取课表(列表)
		requestSchedule.getList = function(date_time, successCallback, errorCallback){
			Service.getScheduleCourseList(null, {
				conditions: {
					open_date: date_time
				}
			}, function(data) {
				if(data.status) {
					var _data = {}
					var data = data.result;
					if(data && data.length > 0) {
						_data.data = data;
						setRender(_data, function() {
							successCallback && successCallback();
						})
					}
				}
			}, function() {
				console.log(22222)
			})
		}
		// 显示哪一天有课
		function addClass(_data, current_month) {
			for(var i=0;i <_data.length;i++){
				(function(j){
					//console.log( _data[j]+'=========;'+current_month+'======' +_data[j].indexOf(current_month) )
					if(_data[j].indexOf(current_month) > -1) {
						$('#datepicker .date_list li._current').each(function(index,val) {
							if(val.innerHTML == parseInt(_data[j].split("-")[2])){
								$(this).addClass("has");
							}
						})
					}
				})(i)
			}
		}
		// 模板
		function setRender(_data, successCallback) {
			var wrapper = $('#listContainer');
			var tpl = "TplClass";
			Method.artRender(wrapper, tpl, _data, false, function() {
				successCallback && successCallback();
			});
		}
		return requestSchedule;
	})