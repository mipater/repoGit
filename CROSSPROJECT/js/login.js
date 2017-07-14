// gestise la visualizzazione di alcuni elementi delle pagine in base al fatto che l'utente sia autenticato o meno.
firebase.auth().onAuthStateChanged(function(user) {
	
	"use strict";
	
  if (user) {
    // User is signed in.
	  $("#indexLogout").show();
	  $("#mobileLogout").show();
	  $("#indexLogin").hide();
	  $("#mobileLogin").hide();
	  $("#indexBackOffice").show();
	  $("#mobileBackOffice").show();
  } else {
    // No user is signed in.
	  $("#indexLogout").hide();
	  $("#mobileLogout").hide();
	  $("#indexLogin").show();
	  $("#mobileLogin").show();
	  $("#indexBackOffice").hide();
	  $("#mobileBackOffice").hide();
  }
});

//  listener che fa partire la procedura di autenticazione a firebase quando viene cliccato il button con id="signInBtn".
$("#signInBtn").click(function() {

	"use strict";
	
	var email = $("#loginEmail").val();
	var password = $("#loginPassword").val();
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		
		$("#loginError").show().text(error.message);
				
	});
	
	firebase.auth().onAuthStateChanged(function (user) {
	
	if(user) {

    	window.location = 'back-office.html';
		
	  }
	 	  	
    });
	
});

// listener che rimanda l'utente alla pagina "index.html" quando si clicca o il pulsante di "logout".
$("#indexLogout, #mobileLogout").click(function(){
	
	"use strict";
	
		firebase.auth().signOut().then(function () {
		// Sign-Out successful.
		window.location = 'index.html';

	}, function (error) {
		// An error happened.
		alert(error.message);
		
	});
	
});
