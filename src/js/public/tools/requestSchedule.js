define([
	"publicService/service",
	"publicTool/method",
	], function(Service, Method) {
		var requestSchedule = {

		}
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
		return requestSchedule;
	})