var mobipro = {

    homeSliderH: function () {
    	var imgH = $('.ei-slider-large li img:first-child').height();  
    	$('#ei-slider').height(imgH);
    },

    userLoginValid: function () {
		$(document).on('click','.log-user', function() {
			var email = $('#tbn_email').val();
			var pass = $('#tbn_pass').val();
			
		});
	},

	removeMiniCart: function ()
	{
		var url = window.location.pathname;  
		var miniCart = $('aside .cart');

		if (url.toLowerCase().match("checkout.php") !== null){
			miniCart.remove();
		}
	},

    searchProducts: function () {
    	var obj = $('#searchPro');

    	$(obj).focus(function(){
			var searchW = $(obj).width();
		    $(this).animate({width:'400px'});
		}).blur(function(){
		    $(this).animate({width: '155px'});
		});
    },

    selectInput: function () {
    	$(document).on("click","select option",function() {
			$(this).parents('.select_pro').find('option').removeAttr('selected');
			$(this).attr('selected','selected');
		});
    },

	init: function () {
		this.homeSliderH();
    	this.searchProducts();
    	this.userLoginValid();
	    this.removeMiniCart();
		//mobipro.selectInput();
	},

    initResize: function () {
    	this.homeSliderH();
	},

	initScroll: function () {

	}
}

$(document).ready(function() {
	mobipro.init();
});

$(window).resize(function() {
	mobipro.initResize();
});

$(window).scroll(function() {

});