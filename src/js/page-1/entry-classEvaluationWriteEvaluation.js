define([], function() {
	return function() {
		$('textarea').on('change', function(e) {
			var target = e.target;
			var val = target.value;
			var len = val.length;
			console.log(len);
		})
		// 评星效果
		$('.star').on('tap', function() {
			var parent = $(this).parent();
			var index = $(this).index();
			parent.find('.star').removeClass('active');
			parent.find('.star').slice(0, index + 1).addClass('active');
		})
	}
})