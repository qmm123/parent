define([
	'BScroll',
	"publicTool/requestSchedule",
	"style!lib/js/iscroll/iscroll",
	], function(BScroll, RequestSchedule) {
	
	var bScroll = {
		init: function() {
			var dateH = $('.calendar').css('height');
			var navH = $('.nav').css('height');
			var top = parseInt(dateH) + parseInt(navH) + 10;
			var index = $('.calendar').find('.today').index();
			var liH = $('.calendar .date_list').find('li').css('height');
			var scheduleH = $('.schedule').css('height');
			var calendar_dateH =parseInt($('.calendar_date').css('height'));
			var week_listH = parseInt($('.week_list').css('height'));
			var date_listH = parseInt(liH) + 24;
			var _delayH =parseInt(scheduleH) - ( calendar_dateH+ week_listH + date_listH + parseInt(navH))
			$('#wrapper').css("top",top);
			this.scroll = new BScroll($('#wrapper')[0], {
				click: true,
				pullDownRefresh: false,
				pullUpLoad: false,
				probeType: 3
			})
			var _this = this;
			var isY = true;
			var isTouchStart = false;
			var isTouchMove = false;
			this.scroll.on('scroll', function(pos) {
				if(pos.y < 0) {
					
				}
				var $contain = parseInt($("#listContainer").css('height'));
				if($contain < _delayH) {
					isTouchStart = true;
					return;
				}
				
				if(this.movingDirectionY == 1) {
					if(isY) {
						isY = false;
						$('.calendar .date_list').find('li').slice(0,index - 3).hide();
						$('.calendar .date_list').find('li').slice(index + 4).hide();
						$('.calendar .date_list').find('li').slice(index - 3, index + 4).addClass('date_top');
						var _dateH = $('.calendar').css('height');
						// $('.calendar').css('height', _dateH);
						top = parseInt(_dateH) + parseInt(navH) + 10;
						// console.log(dateH+'======'+_dateH)
						$('#wrapper').css('transition', 'all 0.5s');
						$('#wrapper').css("top", top + 'px');
						setTimeout(function() {
							_this.scroll.refresh();
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
							//dateH = $('.calendar').css('height');
							// $('.calendar').css('height', _dateH);
							//top = parseInt(dateH) + parseInt(navH) + 10;
							//$('#wrapper').css("top", top);
							$('#wrapper').css("transform", "translateY(0)");
							setTimeout(function() {
								_this.scroll.refresh();
								$('#wrapper').css('transition', 'none');
							}, 600)
						}
					}
				}
			})
			this.scroll.on('beforeScrollStart',function(e) {
				// console.log(this.movingDirectionY)
				var $contain = parseInt($("#listContainer").css('height'));
				isTouchStart = true;
				//console.log($contain - _delayH)
				if($contain < _delayH) {
					//this.disable();
					//$('#wrapper').trigger('touchstart')
					this.scrollTo(0,0,0);
					return;
				}
			})
			$('#wrapper').on('touchstart', function(e) {
				// console.log(e.targetTouches[0].pageY)
				//console.log($("#listContainer").css('height'))
				if(!isTouchStart) {
					return
				}
				this.y = e.targetTouches[0].pageY;
				isTouchMove = true;
			})
			$('#wrapper').on('touchmove', function(e) {
				// console.log(e.targetTouches[0].pageY )
				if(!isTouchMove) {
					return
				}
				console.log(e.originEvent)
				this.delay = e.targetTouches[0].pageY - this.y;
				//console.log(this.delay)
				console.log(this.delay)
				if(this.delay < 0) {
					$('.calendar .date_list').find('li').slice(0,index - 3).hide();
					$('.calendar .date_list').find('li').slice(index + 4).hide();
					$('.calendar .date_list').find('li').slice(index - 3, index + 4).addClass('date_top');
					var _dateH = $('.calendar').css('height');
					// $('.calendar').css('height', _dateH);
					top = parseInt(_dateH) + parseInt(navH) + 10;
					// console.log(dateH+'======'+_dateH)
					$('#wrapper').css('transition', 'all 0.5s');
					$('#wrapper').css("top", top + 'px');
					setTimeout(function() {
						_this.scroll.refresh();
						$('#wrapper').css('transition', 'none');
					}, 600)
				}
				if(this.delay > 10) {
					$('.calendar .date_list').find('li').slice(0,index - 3).show();
					$('.calendar .date_list').find('li').slice(index + 4).show();
					$('.calendar .date_list').find('li').slice(index - 3, index + 4).removeClass('date_top');
					// $('.calendar').css('height', 'auto');
					$('#wrapper').css('transition', 'all 0.5s');
					dateH = $('.calendar').css('height');
					// $('.calendar').css('height', _dateH);
					top = parseInt(dateH) + parseInt(navH) + 10;
					$('#wrapper').css("top", top);
					$('#wrapper').css("transform", "translateY(0)");
					setTimeout(function() {
						_this.scroll.refresh();
						$('#wrapper').css('transition', 'none');
					}, 600)
				}
			})
			this.scroll.on('touchEnd', function(e) {
				isTouchMove = false;
				isTouchStart = false;
			})
		}
	}
	bScroll.refresh = function(time) {
		var time = time || 20;
		var _this = this;
		setTimeout(function() {
			_this.scroll.refresh();
		}, time)
	}
	return bScroll;
})