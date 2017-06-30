// JavaScript Document

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


$("#signInBtn").click(
function() {
	
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



function logout() {
	
	"use strict";
	
	firebase.auth().signOut().then(function () {
		// Sign-Out successful.
		window.location = 'index.html';

	}, function (error) {
		// An error happened.
		alert(error.message);
		
	});
	
}