define([], function() {
	return function() {
		$('textarea').on('change', function(e) {
			var target = e.target;
			var val = target.value;
			var len = val.length;
			console.log(len);
		})
		$('.star').on('tap', function() {
			$(this).toggleClass('active');
		})
	}
})