var mobiproLogin = {
	
	loginAjax: function (vm) 
    {
    	$(".login .log-user").on("click", function(){
    		console.log(1);

    		var form_data = {
    			username: $('#tbn_email').val(),
    			password: $('#tbn_pass').val(),
    			is_ajax: 1
    		}

    		$.ajax({
    			type: "POST",
    			url: "class/user.class.php",
    			data: form_data,

    			success: function (response){
    				console.log(2);
    				if(response == 'success'){
    				}
    			}
    		});
    	});
    },

    notUserReady: function (){
    	
    },

    notUser: function (code) {

		$.post("class/user.class.php", { 
	        notUser: code
		})

	    .success(
	    	function (response) 
	    	{ 
    	    	var 
    	    		data = response;
    	    		console.log(data);
    	    		body = $('body');

    	    		$(body).removeAttr('data');
    	    		$(body).attr('data', data);
	    	}	
	    );
    },

	init: function () 
	{
	    this.loginAjax();
	    this.notUser();
	    this.notUserReady();
	},

	initScroll: function () {}
}

$(document).ready(function() 
{
	mobiproLogin.init();
});

