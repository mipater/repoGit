(function($){
  $(function(){
	  
	  "use strict";

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space



$(document).on('click', '.collapsible', function(){
	
	"use strict";
	
	$('.collapsible').collapsible();
	
});

$(document).on('click', '.collapsible', function(){
	
	"use strict";
	
	$('.modal').modal();
	
});

  $(document).ready(function(){
	  "use strict";
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  }); 