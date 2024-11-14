var mobiproContent = {

	miniItem: function (json_obj, delNaw) 
	{
		var miniCart = '';
		var totalCart = 0;

		for (var i in json_obj)
		{
			if(delNaw == json_obj[i].id)
			{
				var getDelNaw = json_obj[i].id;
				mobiproMiniCart.getDeleteItem(getDelNaw);
			}

			miniCart += '<div class="products '+ json_obj[i].id +'" id="'+ json_obj[i].id +'">';
            miniCart += '<span class="close-x" id='+ json_obj[i].id +'>x</span>';
            miniCart += '<img src="img/proizvodi/'+ json_obj[i].img_id +'" alt="'+ json_obj[i].img_id +'" />';
            miniCart += '<p><a href="product.php?id='+ json_obj[i].id +'">'+ json_obj[i].name +'</a></p>';
            miniCart += '<div class="quantity-holder">';
            miniCart += '<span class="price">'+ json_obj[i].price +'</span>';
            miniCart += '<span class="img">*</span>';
            miniCart += '<span class="quantity">'+ json_obj[i].pro_qua +'</span>';
            totalCart = json_obj[i].price * json_obj[i].pro_qua;
            miniCart += '<span> = '+ totalCart +'&euro;</span>';
            miniCart += '</div></div>';
		}

		$(".cart .aside-content").prepend(miniCart);
	},

	productItem: function(json_obj) 
	{
		var content = '';

		for (var i in json_obj)
		{
	    	content += '<article>';
	    	content += '<div class="article-thumb">';
	    	content += '<a href="product.php?id='+ json_obj[i].id +'"><img src="img/proizvodi/'+ json_obj[i].img_id +'" alt="'+ json_obj[i].name +'" /></a>';
	    	content += '</div>';         
	    	content += '<div class="article-title">';         
	    	content += '<h3><a href="product.php?id='+ json_obj[i].id +'" >'+ json_obj[i].name +'</a></h3>';
	    	content += '<p><span class="price">'+ json_obj[i].price +'</span> &euro;</p>';
	    	content += '</div>';  
		    content += '<div class="article-box">';
		    content += '<p>Telefon star '+ json_obj[i].old +' meseci, garancija '+ json_obj[i].warranty +' godinu dana</p>';
		    content += '<select class="select_pro" name="qua">';
		    
		    var q = 0;
		    
		    for(var l = 0; l < json_obj[i].quantity; l++){
		    	q++;
		    	content += '<option value="'+ q +'">'+ q +'</option>';
		    }

		    content += '</select>';		               
		    content += '<span class="btn-cart" id="'+ json_obj[i].id +'" name="id_pro" /></span>';
		    content += '<a href="product.php?id='+ json_obj[i].id +'" class="btn-read"></a>';	  
		    content += '</div>';
		    content += '</article>';
		}

		var url = window.location.pathname;  

		if(url.toLowerCase().match("index.php") || url.toLowerCase().match("/mobipro/") !== null){
			$(".products-now").append(content);
		}else if(url.toLowerCase().match("category.php") !== null){
			$("#category-pro").append(content);
		}
	},

	paymentMsg: function (itemLeng)
	{
	    paymentMsg =    '<tr class="paymentMsg">'+
					        '<td colspan="6">Da li ste sigurni da zelite da zavrsitie kupovinu!'+
					        	'<span id="paymentCartGo">DA</span>'+
					        	'<span id="paymentCartNo">NE</span>'+
					    '</tr>';	
		$(itemLeng).append(paymentMsg);
	},

	paymentDone: function (tableBody)
	{
	    paymentDone =    '<tr class="paymentDone">'+
					        '<td colspan="6">Uspesno ste kupovali, sacekajte dok kupovina bude odobrena! '+
					        	'<a href="'+ window.location.origin +'/mobipro/index.php">Nastavite vasu kupovinu ovde</a>'+
					    '</tr>';	
		$(tableBody).append(paymentDone);
	},

	paymentEmpty: function (tableBody)
	{
		paymentEmpty = 	'<tr class="paymentEmpty">'+
					        '<td colspan="6">Vasa korpa je prazna, molimo vas narucite proizvod! '+
					        	'<a href="'+ window.location.origin +'/mobipro/index.php">Ovde</a>'+
					    '</tr>';
		$(tableBody).append(paymentEmpty);
	},

	productCart: function (json_obj)
	{
		var pageCart = '';
		var totalCart = 0;
		
		for (var i in json_obj)
		{
		   
			pageCart += '<tr class="products '+ json_obj[i].id +'" id="'+ json_obj[i].id +'">';
            pageCart += '<td><a href="product.php?id='+ json_obj[i].id +'"><img src="img/proizvodi/'+ json_obj[i].img_id +'" alt="'+ json_obj[i].img_id +'" /></a></td>';
            pageCart += '<td><a href="product.php?id='+ json_obj[i].id +'">'+ json_obj[i].name +'</a></td>';
       		pageCart += '<td><select class="select_pro">';

		    var q = 0;
		    for(var l = 0; l < json_obj[i].quantity; l++){
		    	q++;
		    	if(q == json_obj[i].pro_qua){
		    		pageCart += '<option value="'+ json_obj[i].pro_qua +'" selected="selected">'+ json_obj[i].pro_qua +'</option>';
		    		continue;
		    	}
		    	pageCart += '<option value="'+ q +'">'+ q +'</option>';
		    	
		    }

		    pageCart += '</select></td>';
			pageCart += '<td class="price">'+ json_obj[i].price +'</td>';
			totalCart = json_obj[i].price * json_obj[i].pro_qua;
            pageCart += '<td class="itemTotal">'+ totalCart +'</td>';
            pageCart += '<td class="close-x" id='+ json_obj[i].id +'>x</td>';
            pageCart += '</tr>';
		}
		$('.content-cart table tbody').html(pageCart);
	},

	init: function () {
		//this.productCon();
	}
}

$(document).ready(function() {
	//mobiproContent.init();
});