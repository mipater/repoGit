// inizializza l'effetto parallasse e l'interfaccia side-nav per i dispositivi mobile.
(function($){
	"use strict";
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

// inizializza gli elementi creati dinamicamente avente classe "collapsible".
$(document).on('click', '.collapsible', function(){
	
	"use strict";
	
	$('.collapsible').collapsible();
	
});

// inizializza gli elementi creati dinamicamente avente classe "modal".
$(document).on('click', '.collapsible', function(){
	
	"use strict";
	var count = $(this).data('scic');
	
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      complete: function() { $("#qrcode"+count).empty(); } // Callback for Modal close
    }
  );
     
	
});

// inizializza l'elemento avente classe "modal" nella pagina "back-office.html".
  $(document).ready(function(){
	  "use strict";
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  }); 