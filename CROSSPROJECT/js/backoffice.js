
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
	var opKey = snap.getKey();
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
        ' <a class="waves-effect waves-light btn btn-large" href="#modal'+rowCount+'"><i class="material-icons">mode_edit</i></a>'+ 
         '<!-- Modal Structure -->' +
       '  <div id="modal'+rowCount+'" class="modal modal-fixed-footer">'+
          ' <div class="modal-content"> '+
            ' <h4>'+ titolo +'</h4>'+
		    '<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea disabled value="" id="idOpera'+rowCount+'" class="materialize-textarea">' + opKey + '</textarea>'+
				  '<label class="active" for="idOpera">ID</label>'+
				'</div>' +
			  '</div>' +
		     '</form>' + 
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea id="titoloOpera'+rowCount+'" class="materialize-textarea">' + titolo + '</textarea>'+
				  '<label class="active" for="titoloOpera">Titolo</label>'+
				'</div>' +
			  '</div>' +
		     '</form>' + 
			' <div class="row"> ' +
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea id="autoreOpera'+rowCount+'" class="materialize-textarea">' + autore + '</textarea>'+
				  '<label class="active" for="autoreOpera">Autore</label>'+
				'</div>' +
			  '</div>' +
		    '</form>' +
		    '</div>' +
		    ' <div class="row"> ' +
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea id="periodoOpera'+rowCount+'" class="materialize-textarea">' + periodo + '</textarea>'+
				  '<label class="active" for="periodoOpera">Periodo</label>'+
				'</div>' +
			  '</div>' +
		    '</form>' +
		    '</div>' +
			' <div class="row"> ' +
			'<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea id="descrizioneOpera'+rowCount+'" class="materialize-textarea">' + descrizione + '</textarea>'+
				  '<label class="active" for="descrizioneOpera">Descrizione</label>'+
				'</div>' +
			  '</div>' +
		     '</form>' +
		    '</div>' +
           '</div>'+
          ' <div class="modal-footer">'+ 
	      '<a href="#!" id="'+rowCount+'" class="modificaNodo modal-action modal-close waves-effect waves-green btn-flat ">Conferma</a>'+
		  '<a href="#!" id="'+rowCount+'" class="cancellaNodo modal-action modal-close waves-effect waves-green btn-flat ">Elimina</a>'+
	      '</div>'+
         '</div>'+
		'</p>' +
       '</div>'+
     '</li>'+
  ' </ul> <!-- FINE COLLAPSIBLE -->'+
' </div> <!-- FINE PRIMA COLONNA -->';
	
	$("#prova").append(html);
		
});
});

	
$("#addBtn").click(function(){

	"use strict";

	var newPostKey = firebase.database().ref().child('opere').push().key;

	firebase.database().ref('opere/' + newPostKey).set({

	 autore: $("#autoreOpera").val(),
	 titolo: $("#titoloOpera").val(),
	 periodo: $("#periodoOpera").val(),
	 descrizione: $("#descrizioneOpera").val()

	});

});


$(document).on('click', '.modificaNodo', function(){
	
	"use strict";
	
	var count = this.id;
	var keyOpera = $("#idOpera"+count).val();
	var titoloOperas = $("#titoloOpera"+count).val();
	
	var updateRef = firebase.database().ref("opere/"+keyOpera);
	updateRef.update({

		 "titolo": titoloOperas

	});
	
});

$(document).on('click', '.cancellaNodo', function(){
	
	"use strict";
	
	var count = this.id;
	var keyOpera = $("#idOpera1").val();
	var updateRef = firebase.database().ref("opere/"+keyOpera);
	updateRef.remove();
	location.reload();
	
});


