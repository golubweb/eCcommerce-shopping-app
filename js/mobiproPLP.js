var mobiproPLP = {

	pagRunAjax: function (startCat) 
	{ 
		$.get("class/pagination.class.php", { 
	        ID: startCat
		})

        .success(
        	function (data) 
        	{ 
        	    var json_pag = data;
                mobiproPLP.contentPagination(startCat, json_pag);
        	}	
        );
	},	

	contentPagination: function (startCat, json_pag) 
	{ 
		var pagContent = '';
        var pagli = (+json_pag) + (+1);

		for (i = 1; i < pagli; i++)
		{
			pagContent += '<li><a href="###" id="'+ startCat +'" >'+ i +'</a></li>';		
		}	

		$(".pagination ul").append(pagContent);
	},

	clickPagAjex: function (startCat, json_pag) 
	{ 
		$(document).on('click', '.pagination li a', function(e){
			e.preventDefault();

			$('.pagination li').removeAttr('class');
			$(this).parent().addClass('active');
			var 
				resCat = $(this).attr("id");
				resPage = $(this).html();

			mobiproPLP.productsAjax(resPage, resCat);
		});
	},

	productsAjax: function (startPage, startCat) 
	{
		$.get("class/products.class.php", { 
	        ID: startCat,
	        page: startPage
		})

        .success(
        	function (response) 
        	{ 
        	    var json_obj = $.parseJSON(response);//parse JSON
                mobiproPLP.contentPro(json_obj);
        	}	
        );
	},

	contentPro: function (json_obj) 
	{
		$("#category-pro").empty();
		mobiproContent.productItem(json_obj);
    },

	init: function () 
	{
	   mobiproPLP.clickPagAjex();
	}
}


$(document).ready(function() {
	mobiproPLP.init();
});