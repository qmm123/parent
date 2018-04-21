define(["publicService/service",
		"public/tools/method"
	], function(Server, Method) {
	return function() {
		var page_param = Method.getUrlParam("page_param");
		var course_id = page_param ? JSON.parse(page_param)['course_id'] : "0f40142622964999853a421a8fe74705";
		Server.getScrollDetail(null, {
			course_id: course_id
		}, function(data) {
			console.log(data);
			Method.artRender($('.content'), 'TplClass', data.result, false, function() {

			})
		})

		// 选择课时
		$('.content').on('tap', '.category.lesson .normal span', function(e) {
			$('.category .list .special .num').find('.count').html('1');
			$('.category .list .special .num').addClass('hide');
			$('.category.lesson span').removeClass('active');
			$(this).addClass('active');
			var price = $(this).data('unit_price');
			price = parseFloat(price);
			var num = $(this).html();
			num = parseFloat(num);
			$('.container .body .price .num').text(price);
			//$('.container .body .category .list .special span').data("price", price);
			var priceAll = '￥' + price * num;
			$('.container .footer .left span').text(priceAll);
		})

		// 自定义
		$('.content').on('tap', '.category .list .special>span', function(e) {
			//price = Number(price);
			var price = $('.container .body .price .num').text();
			price = Number(price)
			//$('.container .body .price .num').data("price", price);
			$('.container .footer .left span').text(price);
			$('.category .list .special .num').removeClass('hide');
			$('.category.lesson span').removeClass('active');
			$(this).addClass('active');
		})
		var n = 0;
		$('.content').on('tap','.category .list .special .num .cut', function(e) {
			if(!$(this).hasClass('cut')){
				return
			}else{
				var num = Number($(this).next('.count').html())
				num = num - 1;
				num = Math.max(1, num);
				$(this).next('.count').html(num)
				var price = Number($('.container .body .price .num').text());
				var priceAll = num * price;
				$('.container .footer .left span').text(priceAll);
			}
		})

		$('.content').on('tap','.category .list .special .num .add', function(e) {
			if(!$(this).hasClass('add')){
				return
			}else{
				//alert(num)
				var num = Number($(this).prev('.count').html())
				num = num + 1;
				num = Math.min(999, num);
				$(this).prev('.count').html(num);
				var price = Number($('.container .body .price .num').text());
				var priceAll = '￥' +  num * price;
				$('.container .footer .left span').text(priceAll);
			}
		})
	}
})