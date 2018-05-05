define(["publicService/service",
		"public/tools/method",
		"public/business/nativeFun",
		"publicLogic/header"
	], function(Server, Method, nativeFun, Header) {
	return function() {
		var page_param = Method.getUrlParam("page_param");
		var oto_id = JSON.parse(page_param)['oto_id'];
		// 传递参数
		var parent_id = localStorage.parent_id;
		var class_hour = 0;
		var money = 0;
		var oto_son_id = 0;
		var teaching_mode = 0;


		Server.getOneToOneDetail(null, {
			oto_id: oto_id
		}, function(data) {
			console.log(data);
			Method.artRender($('.content'), 'TplClass', data.result, false, function() {
				class_hour = $('.body').data('end_class_hour_son');
				money = $('.body').data('real_amount');
				oto_son_id = $('.body').data('oto_son_id');
				teaching_mode = $('.body').data('student_num_son');
			})
		})
		// 补0
		function padEnd(num){
			return Number(num).toFixed(2);
		}
		
		// 授课模式
		$('.content').on('tap', '.category.mode .list>span', function() {
			var index = $(this).index();
			$('.category .list .special .num').find('.count').html('1');
			$('.category .list .special .num').addClass('hide');
			$('.category.mode span').removeClass('active');
			$(this).addClass('active');
			$('.category.lesson').find('.normal').removeClass('active');
			$('.category.lesson').find('.normal').eq(index).addClass('active');
			$('.category.lesson span').removeClass('active');
			$('.category.lesson .normal.active').find('span').eq(0).addClass('active');
			var price = $('.category.lesson .normal.active').find('span').eq(0).data('unit_price');
			price = Number(price);
			var num = $('.category.lesson .normal.active').find('span').eq(0).html();
			num = Number(num);
			$('.container .body .price .num').text(price);
			var priceAll = '￥'+padEnd(price * num);
			$('.container .footer .left span').text(priceAll);
			class_hour = num;
			money = padEnd(price * num);
			oto_son_id = $('.category.lesson .normal.active').find('span').eq(0).data('id');
			teaching_mode = $(this).data('student_num');
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
			var _num = $(this).data('start_class_hour');
			num = parseFloat(num);
			var priceAll = 0;
			$('.container .body .price .num').text(price);
			//$('.container .body .category .list .special span').data("price", price);
			var index = $(this).index();
			for(var i=0;i<index;i++){
				var prev = $(this).parent().find('span').eq(i);
				var fPrice = prev.data('unit_price');
				var fNum = prev.data('start_class_hour');
				var cNum = prev.html();
				priceAll += (Number(cNum) - Number(fNum) + 1) * Number(fPrice);
			}

			priceAll += (Number(price) * (Number(num) - Number(_num) + 1));
			priceAll = padEnd(Number(priceAll));
			$('.container .footer .left span').text('￥' +priceAll);
			class_hour = num;
			money = priceAll;
			oto_son_id = $(this).data('id');
		})

		// 自定义
		$('.content').on('tap', '.category .list .special>span', function(e) {
			//price = Number(price);
			var price = $('.category.lesson .normal.active').find('span').eq(0).data('unit_price');
			$('.container .body .price .num').text(price);
			price = padEnd(Number(price));
			//$('.container .body .price .num').data("price", price);
			$('.container .footer .left span').text('￥' + price);
			$('.category .list .special .num').removeClass('hide');
			$('.category.lesson span').removeClass('active');
			$(this).addClass('active');
			class_hour = 1;
			money = price;
			oto_son_id = $('.category.lesson .normal.active').find('span').eq(0).data('id');
		})
		var n = 0;
		$('.content').on('tap','.category .list .special .num .cut', function(e) {
			if(!$(this).hasClass('cut')){
				return
			}else{
				var num = Number($(this).next('.count').html())
				num = num - 1;
				num = Math.max(1, num);
				var priceAll = 0;
				var _len = $('.category.lesson .normal.active').find('span').length;
				var allN= $('.category.lesson .normal.active').find('span').eq(_len - 1).html();
				if(num > Number(allN)){
					for(var i =0;i< _len;i++){
						var item = $('.category.lesson .normal.active').find('span').eq(i);
						var fNum = item.data('start_class_hour');
						var cNum = item.data('end_class_hour');
						var zPrice = item.data('unit_price');
						priceAll += (Number(cNum) - Number(fNum) + 1) * Number(zPrice);
					}
					var item = $('.category.lesson .normal.active').find('span').eq(_len - 1);
					priceAll += (num - Number(item.data('end_class_hour'))) * Number(item.data('unit_price'));
					oto_son_id = item.data('id');
				}else{
					var index = 0;
					for(var j =0;j< _len;j++){
						var item = $('.category.lesson .normal.active').find('span').eq(j);
						var fNum = item.data('start_class_hour');
						var cNum = item.data('end_class_hour');
						if(num >= Number(fNum) && num <= Number(cNum)) {
							index = j;
						}
					}
					for(var n=0;n<index;n++){
						var item = $('.category.lesson .normal.active').find('span').eq(n);
						var fNum = item.data('start_class_hour');
						var cNum = item.data('end_class_hour');
						var zPrice = item.data('unit_price');
						priceAll += (Number(cNum) - Number(fNum) + 1) * Number(zPrice);
					}
					var item = $('.category.lesson .normal.active').find('span').eq(index);
					var $num = Number(item.data('start_class_hour'));
					oto_son_id = item.data('id');
					priceAll += (num - $num + 1) * Number(item.data('unit_price'));
				}
				$(this).next('.count').html(num)
				$('.container .footer .left span').text('￥'+priceAll);
				class_hour = num;
				money = priceAll;

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
				var priceAll = 0;
				var _len = $('.category.lesson .normal.active').find('span').length;
				var allN= $('.category.lesson .normal.active').find('span').eq(_len - 1).html();
				if(num > Number(allN)){
					for(var i =0;i< _len;i++){
						var item = $('.category.lesson .normal.active').find('span').eq(i);
						var fNum = item.data('start_class_hour');
						var cNum = item.data('end_class_hour');
						var zPrice = item.data('unit_price');
						priceAll += (Number(cNum) - Number(fNum) + 1) * Number(zPrice);
					}
					var item = $('.category.lesson .normal.active').find('span').eq(_len - 1);
					priceAll += (num - Number(item.data('end_class_hour'))) * Number(item.data('unit_price'));
					oto_son_id = item.data('id');
				}else{
					var index = 0;
					for(var j =0;j< _len;j++){
						var item = $('.category.lesson .normal.active').find('span').eq(j);
						var fNum = item.data('start_class_hour');
						var cNum = item.data('end_class_hour');
						if(num >= Number(fNum) && num <= Number(cNum)) {
							index = j;
						}
					}
					for(var n=0;n<index;n++){
						var item = $('.category.lesson .normal.active').find('span').eq(n);
						var fNum = item.data('start_class_hour');
						var cNum = item.data('end_class_hour');
						var zPrice = item.data('unit_price');
						priceAll += (Number(cNum) - Number(fNum) + 1) * Number(zPrice);
					}
					var item = $('.category.lesson .normal.active').find('span').eq(index);
					var $num = Number(item.data('start_class_hour'));
					oto_son_id = item.data('id');
					priceAll += (num - $num + 1) * Number(item.data('unit_price'));
				}
				priceAll = padEnd(priceAll);
				$(this).prev('.count').html(num);
				$('.container .footer .left span').text('￥'+priceAll);
				class_hour = num;
				money = priceAll;
			}
		})

		// 跳转到报名页面
		$('.container').on('click','.footer .right', function() {
			var param = {
				"parent_id": parent_id,
				"oto_id": oto_id,
				"class_hour": String(class_hour),
				"money": String(money),
				"oto_son_id": oto_son_id,
				"teaching_mode": String(teaching_mode)
			}
			nativeFun("toOneToOneEnroll", param);
		})
		// 返回上一页
		$('.container').on('click', '.back', function() {
			nativeFun('goBack');
		})
	}
})