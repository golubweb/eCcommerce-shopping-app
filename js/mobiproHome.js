var mobiproHome = {
	
	readyAjax: function (vm) 
    {
    	$.post("class/ajaxHome.class.php", { 
	        start_position_pro: vm
		})

        .success(
        	function (response) 
        	{ 
        	    var json_obj = $.parseJSON(response);//parse JSON
                mobiproHome.contentProduct(json_obj);
        	}	
        );
    },

    scrollAjax: function (startNumb) 
    {
    	//  0 + 1056 => 988
        if($(window).scrollTop() + window.innerHeight == $(document).outerHeight( true ))
        {
        	var startNumb = startNumb;
        	this.productsAjax(startNumb);
        } 
    },

    productsAjax: function (startNumb) 
    {
		$.post("class/ajaxHome.class.php", { 
	        //dataType: "json",
	        start_position_pro: startNumb
		})

        .success(
        	function (response) 
        	{ 
        	    var json_obj = $.parseJSON(response);//parse JSON
                mobiproHome.contentProduct(json_obj);
        	}	
        );
	},
	
	contentProduct: function (json_obj)
	{
		mobiproContent.productItem(json_obj);
    },

	init: function (vm) 
	{
	    this.readyAjax(vm);
	},

	initScroll: function (startNumba) 
	{
	    this.scrollAjax(startNumba);
	}
}

$(document).ready(function() 
{
	if(!$(".products-now aricle").length){
		mobiproHome.init(1);
	}
});

$(window).scroll(function() {
	if($(".products-now").length){
		var proLength = $('.products-now article').length;
		var startNumba = proLength + 1;
		mobiproHome.initScroll(startNumba);
	}	
});

