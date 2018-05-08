define(["publicService/service",
		"public/tools/method",
		"public/business/nativeFun"
	], function(Server, Method, nativeFun) {
	return function() {
		var page_param = Method.getUrlParam("page_param");
		var course_id = JSON.parse(page_param)['course_id'];
		var purchase_number = 0;
		Server.getScrollDetail(null, {
			course_id: course_id
		}, function(data) {
			console.log(data);
			Method.artRender($('.content'), 'TplClass', data.result, false, function() {
				purchase_number = data.result.lessons[0];
				console.log(purchase_number)
			})
		})
		// 传递参数
		var parent_id = localStorage.parent_id;

		// 选择课时
		$('.content').on('tap', '.category.lesson .normal span', function(e) {
			$('.category .list .special .num').find('.count').html('1');
			$('.category .list .special .num').addClass('hide');
			$('.category.lesson span').removeClass('active');
			$(this).addClass('active');
			var price = $(".container .body .price .num").data('unit_price');
			price = parseFloat(price);
			var num = $(this).data('value');
			num = parseFloat(num);
			purchase_number = num;
			var priceAll = Number(price * num).toFixed(2);
			$('.container .footer .left span').text('￥' +priceAll);
		})

		// 自定义
		$('.content').on('tap', '.category .list .special>span', function(e) {
			//price = Number(price);
			var price = $('.container .body .price .num').data('unit_price');
			price = Number(price).toFixed(2);
			$('.container .footer .left span').text('￥'+price);
			$('.category .list .special .num').removeClass('hide');
			$('.category.lesson span').removeClass('active');
			$(this).addClass('active');
		})
		var n = 0;
		$('.content').on('tap','.category .list .special .num .cut', function(e) {
			if(!$(this).hasClass('cut')){
				return
			}else{
				var num = Number($(this).next('.count').val())
				num = num - 1;
				num = Math.max(1, num);
				purchase_number= num;
				$(this).next('.count').val(num)
				var price = Number($('.container .body .price .num').data('unit_price'));
				var priceAll = Number(num * price).toFixed(2);
				console.log(priceAll)
				$('.container .footer .left span').text('￥'+priceAll);
			}
		})

		$('.content').on('input','.category .list .special .num .count', function(e) {
			if(!$(this).hasClass('count')){
				return
			}else{
				var num = Number(this.value);
				var reg = /\d+/;
				if(!reg.test(num)){
					this.value = 1;
				}else{
					if(num>999) {
						num = 999;
						this.value = 999;
					}else if(num < 1){
						num = 1;
						this.value = '';
					}
				}
				purchase_number= num;
				var price = Number($('.container .body .price .num').data('unit_price'));
				var priceAll = Number(num * price).toFixed(2);
				console.log(priceAll)
				$('.container .footer .left span').text('￥'+priceAll);
			}
		})
		$('.content').on('blur','.category .list .special .num .count', function(e) {
			if(!this.value) {
				this.value = 1;
			}
		})

		$('.content').on('tap','.category .list .special .num .add', function(e) {
			if(!$(this).hasClass('add')){
				return
			}else{
				//alert(num)
				var num = Number($(this).prev('.count').val())
				console.log(num, '--------')
				num = num + 1;
				num = Math.min(999, num);
				purchase_number = num;
				$(this).prev('.count').val(num);
				var price = Number($('.container .body .price .num').data('unit_price'));
				var priceAll = Number(num * price).toFixed(2);
				$('.container .footer .left span').text('￥'+priceAll);
			}
		})

		// 返回上一页
		$('.content').on('click', '.header .back', function() {
			console.log(nativeFun)
			nativeFun("goBack");
		});

		// 报名
		$('.container').on('click','.footer .right', function() {
			var param = {
				"parent_id": parent_id,
				"purchase_number": String(purchase_number),
				"course_id": course_id
			}
			console.log(param);
			nativeFun("toCourseRollPurchaseDetails", param);
		})

		// 打电话
		$('.content').on('click', '.tel', function() {
			nativeFun('callPhone', {"phone": Method.getUrlParam("merchant_phone")});
		})
	}
})