var mobiproCart = {


	paymentEmpty: function () {
		var tableBody   = $('.content-cart table tbody');

		mobiproContent.paymentEmpty(tableBody);
	},

	paymentCart: function ()
	{
		$(document).on('click', '#paymentCart', function()
		{
			var 
				data       = $(this).attr('data');
				itemLeng   = $('.content-cart table tbody');
				itemChild  =  $('.content-cart table tbody tr.products').length;
				paymentBox = $('.paymentMsg');

			if(itemChild > 0){
				if(paymentBox.length < 1) {

					mobiproContent.paymentMsg(itemLeng);

					$(document).on('click', '#paymentCartGo', function(){
						$('#paymentCart').addClass('readyGo');
						$('#paymentCart').text('Izvrsi kupovinu');

						mobiproCart.getCart(data);
					});

					$(document).on('click', '#paymentCartNo', function(){
						$('.paymentMsg').remove();
					});
				}
			}
		});
	},

	insertPayment: function () 
	{
		$(document).on('click', '#paymentCart.readyGo', function()
		{
			var get = $(this).attr('data');
			$.post("class/cart.class.php", { 
		        itemCart: get
			})

		    .success(
		    	function (data) 
		    	{ 
	    	    	var data = $.parseJSON(data);
	    	    	if(data.status == true) {
	    	    		$('.content-cart table tbody').empty();

	    	    		var tableBody = $('.content-cart table tbody');
						mobiproContent.paymentDone(tableBody);
		    		}
		    	}	
		    );
		});
	},

	getCart: function (get) 
	{
		$.post("class/miniCart.class.php", { 
	        getCart: get
		})

	    .success(
	    	function (data) 
	    	{ 
    	    	var json_obj = $.parseJSON(data);

    	    	if(json_obj ==''){
    	    		mobiproCart.paymentEmpty();
    	    	}else {
	    	    	mobiproCart.getContent(json_obj);
	    		}
	    	}	
	    );
	},

	proAjexCart: function (nb) 
	{ 
		$(document).on('change','.content-cart tbody .products', function() 
		{
			var idPro = $(this).attr('id');
			var numbQua = $(this).find('.select_pro option:selected').val();

			mobiproCart.insertItem(idPro, numbQua, nb);
		});
	},

	insertItem: function (idPro, numbQua, nb) 
	{
		$.post("class/cart.class.php", { 
	        proID:  idPro,
	        proQua: numbQua,
	        proNb:  nb
		})

		.success(
	    	function (data) 
	    	{ 
	    		var proQua = data;
				mobiproCart.totalPrice(proQua);
	    	}	
	    );
	},

	deleteItem: function () 
	{
		$(document).on('click','.close-x', function()
		{
			var idDelete = $(this).attr('id');

			$.post("class/miniCart.class.php", { 
		        proDel: idDelete
			})

			.success(
		    	function (data) 
		    	{ 
		    		var idPro = $.parseJSON(data);
		    		$('.products.' + idPro).remove();
					mobiproCart.totalPrice(idPro);
		    	}	
		    );
		});
	},
	
	totalPrice: function (idPro) 
	{
		var resTotal = 0;
		$('.content-cart tbody .products').each(function()
		{
			var 
				totalIDpro = $(this).attr('id');
				totalPrice = $(this).find('.price').text();
				totalQua   = $(this).find('select option:selected').val();
				itemTotal  = $('.itemTotal');

			resTotal += totalPrice * totalQua;
			$(this).find('.itemTotal').text(resTotal);
		});

		$('.total-holder .total-price').html(resTotal + ' <sub>&euro;</sub>');
	},

	getContent: function (json_obj) 
	{
		mobiproContent.productCart(json_obj);
		mobiproCart.totalPrice();
	},	

	init: function () {
	   mobiproCart.insertPayment();
	   mobiproCart.paymentCart();
	   mobiproCart.deleteItem();
	}
}

$(document).ready(function() {
	mobiproCart.init();
});