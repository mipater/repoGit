
firebase.auth().onAuthStateChanged(function (user) {

	"use strict";

	var uid;

	if (user) {

		// User is signed in.
		
		$(document).ready(function(){
			
			uid = user.uid;
			if (uid == "gVNIcf2GI5PhnLSEElUdfhYb6jE3") {

				$("#deleteBtn").hide();

			}
		});

	}
});


$(document).ready(function(){	
	"use strict";

var rowCount = 0;

var ref = firebase.database().ref("opere");

ref.on("child_added", function(snap) {
	
	rowCount++;
	var autore = snap.child("autore").val();
	var descrizione = snap.child("descrizione").val();
	var periodo = snap.child("periodo").val();
	var titolo = snap.child("titolo").val();
	var html = 
'<div class="col s5 offset-s4"> <!-- INIZIO PRIMA COLONNA --> ' +
    '<ul class="collapsible" data-collapsible="accordion"> <!-- INIZIO COLLAPSIBLE --> ' +
     ' <li> ' +
       ' <div class="collapsible-header"><i class="material-icons">filter_drama</i>'+titolo+'</div>'+
      ' <div class="collapsible-body"> ' +
        ' <!-- Modal Trigger --> ' +
		'<div class="row">' +
		' <img src="monna lisa.jpg" align="left" class="responsive-img">' +
		'</div>' +
		' <p align="right">' +
        ' <a class="waves-effect waves-light btn btn-large" href="#modal'+rowCount+'"><i class="material-icons">mode_edit</i> Edit</a>'+ 
         '<!-- Modal Structure -->' +
       '  <div id="modal'+rowCount+'" class="modal modal-fixed-footer">'+
          ' <div class="modal-content"> '+
            ' <h4>'+ titolo +'</h4>'+
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea class="materialize-textarea">' + titolo + '</textarea>'+
				  '<label class="active" for="modalAutoreOpera">Titolo</label>'+
				'</div>' +
			  '</div>' +
			' <div class="row"> ' +
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea class="materialize-textarea">' + autore + '</textarea>'+
				  '<label class="active" for="modalAutoreOpera">Autore</label>'+
				'</div>' +
			  '</div>' +
		    '</div>' +
		    ' <div class="row"> ' +
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea class="materialize-textarea">' + periodo + '</textarea>'+
				  '<label class="active" for="modalAutoreOpera">Periodo</label>'+
				'</div>' +
			  '</div>' +
		    '</div>' +
			' <div class="row"> ' +
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea class="materialize-textarea">' + descrizione + '</textarea>'+
				  '<label class="active" for="modalAutoreOpera">Descrizione</label>'+
				'</div>' +
			  '</div>' +
		    '</div>' +
           '</div>'+
          ' <div class="modal-footer"> <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a> </div>'+
         '</div>'+
		'</p>' +
       '</div>'+
     '</li>'+
  ' </ul> <!-- FINE COLLAPSIBLE -->'+
' </div> <!-- FINE PRIMA COLONNA -->';
	
	$("#prova").append(html);
	
});
});






