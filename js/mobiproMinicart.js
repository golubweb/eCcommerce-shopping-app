var mobiproMiniCart = {

	getCart: function (get) 
	{
		$.post("class/miniCart.class.php", { 
	        getCart: get
		})

	    .success(
	    	function (data) 
	    	{ 
    	    	var json_obj = $.parseJSON(data);
	    	    mobiproMiniCart.getContent(json_obj);
	    	}	
	    );
	},

	proAjexCart: function (nb) 
	{ 
		$(document).on('click','.btn-cart', function() 
		{
			var idPro = $(this).attr('id');
			var numbQua = $(this).parents('.article-box').find('.select_pro option:selected').val();

			mobiproMiniCart.insertItem(idPro, numbQua, nb);
		});
	},

	insertItem: function (idPro, numbQua, nb) 
	{
		$.post("class/miniCart.class.php", { 
	        proID:  idPro,
	        proQua: numbQua,
	        proNb:  nb
		})

		.success(
	    	function (data) 
	    	{ 
	    		var idPro = $.parseJSON(data);
				mobiproMiniCart.getItem(idPro);
	    	}	
	    );
	},

	getItem: function (idPro) 
	{
		$.post("class/miniCart.class.php", { 
	        getIDpro: idPro
		})

	    .success(
	    	function (data) 
	    	{ 
    	    	var json_obj = $.parseJSON(data);
    	    	for (var i in json_obj) {
    	    		var delNaw = json_obj[i].id;
	    	    }
	    	    mobiproMiniCart.getContent(json_obj, delNaw);
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
					mobiproMiniCart.totalPrice(idPro);
		    	}	
		    );
		});
	},

	getDeleteItem: function (getDelNaw) {
		$('.products.' + getDelNaw).remove();
	},
	
	totalPrice: function (idPro) 
	{
		var resTotal = 0;
		$('.cart .products').each(function()
		{
			var 
				totalIDpro = $(this).attr('id');
				totalPrice = $(this).find('.price').text();
				totalQua   = $(this).find('.quantity').text();

			if(idPro !== undefined){
				var delTotal = $('.cart .products.'+ idPro).find('.price').text();
				resTotal += totalPrice * totalQua;
				resTotal -= delTotal;
			} else {
				resTotal += totalPrice * totalQua;
			}
		});

		$('.total-holder .total-price').html(resTotal + ' <sub>&euro;</sub>');
	},

	getContent: function (json_obj, delNaw) 
	{
		mobiproContent.miniItem(json_obj, delNaw);
		mobiproMiniCart.totalPrice();
	},	

	init: function () {
	   mobiproMiniCart.deleteItem();
	}
}

$(document).ready(function() {
	mobiproMiniCart.init();
});