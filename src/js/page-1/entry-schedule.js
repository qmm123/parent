define(["publicTool/datepicker",
	"publicLogic/scheduleList"
	], function(datepicker, bScroll) {
	//console.log(scroll)
	return function (){
		$('#listContainer').on('click', '.right-arrow', function(e) {
			console.log(e)
			$(this).parent().find('.roo').toggle();
			$(this).parent().find('.address').toggle();
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