define(["publicTool/datepicker",
	"publicLogic/scheduleList"
	], function(datepicker, bScroll) {
	//console.log(scroll)
	return function (){
		var isShow = false;
		$('#listContainer').on('click', '.right-arrow', function(e) {
			if(!isShow) {
				$(this).parent().find('.roo').addClass("active");
				$(this).parent().find('.address').addClass("active");
			}else {
				$(this).parent().find('.roo').removeClass("active");
				$(this).parent().find('.address').removeClass("active");
			}
			isShow = !isShow;
			bScroll.refresh(550)
			return false;
		})
		$('#listContainer').on('click', '.item', function(e) {
			if($(e.target).hasClass('right-arrow')){
				return
			}
			alert(222)
		})
	}
})