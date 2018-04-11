define([
	"publicTool/datepicker",
	'BScroll',
	"style!lib/js/iscroll/iscroll"
	], function(datepicker, BScroll) {
	datepicker.init();

	var dateH = $('.calendar').css('height');
	var navH = $('.nav').css('height');
	var top = parseInt(dateH) + parseInt(navH) + 10;
	var index = $('.calendar').find('.today').index();
	var liH = $('.calendar .date_list').find('li').css('height');
	$('#wrapper').css("top",top);
	var scroll = new BScroll($('#wrapper')[0], {
		click: true,
		pullDownRefresh: false,
		pullUpLoad: false,
		probeType: 3
	})
	var isY = true;
	scroll.on('scroll', function(pos) {
		if(pos.y < 0) {
			
		}
		if(this.movingDirectionY == 1) {
			if(isY) {
				isY = false;
				$('.calendar .date_list').find('li').slice(0,index - 3).hide();
				$('.calendar .date_list').find('li').slice(index + 4).hide();
				$('.calendar .date_list').find('li').slice(index - 3, index + 4).addClass('date_top');
				dateH = $('.calendar').css('height');
				// $('.calendar').css('height', _dateH);
				top = parseInt(dateH) + parseInt(navH) + 10;
				$('#wrapper').css('transition', 'all 0.5s');
				$('#wrapper').css("top", top);
				setTimeout(function() {
					scroll.refresh();
					$('#wrapper').css('transition', 'none');
				}, 600)
			}
		}
		if(this.movingDirectionY == -1) {
			if(pos.y > 0){
				if(!isY) {
					isY = true;
					$('.calendar .date_list').find('li').slice(0,index - 3).show();
					$('.calendar .date_list').find('li').slice(index + 4).show();
					$('.calendar .date_list').find('li').slice(index - 3, index + 4).removeClass('date_top');
					// $('.calendar').css('height', 'auto');
					$('#wrapper').css('transition', 'all 0.5s');
					dateH = $('.calendar').css('height');
					// $('.calendar').css('height', _dateH);
					top = parseInt(dateH) + parseInt(navH) + 10;
					$('#wrapper').css("top", top);
					setTimeout(function() {
						scroll.refresh();
						$('#wrapper').css('transition', 'none');
					}, 600)
				}
			}
		}
	})
	scroll.on('scrollStart', function(pos) {
		console.log(pos+'===========')
	})
})