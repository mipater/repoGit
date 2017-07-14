/* crea una variabile di tipo stringa che serve a creare i vari componenti(collapsible, modal, buttons, forms, textarea) in maniera dinamica, aggiungedoli ad uno specifico <div> con id=#prova nel <body> di back-office.html. */
function addHtml(img, titolo, rowCount, opKey, autore, periodo, descrizione){
	
	"use strict";
	
	var html = 
'<div class="col s5 offset-s4"> <!-- INIZIO PRIMA COLONNA --> ' +
    '<ul class="collapsible" data-collapsible="accordion"> <!-- INIZIO COLLAPSIBLE --> ' +
     ' <li> ' +
       ' <div class="collapsible-header"><i class="material-icons">filter_drama</i>'+titolo+'</div>'+
      ' <div class="collapsible-body"> ' +
        ' <!-- Modal Trigger --> ' +
		'<div class="row">' +
		' <img src="'+img+'" align="left" class="imgOp responsive-img">' +
		'</div>' +
		' <p align="right">' +
        ' <a class="mod waves-effect waves-light btn btn-large" href="#modal'+rowCount+'"><i class="material-icons">mode_edit</i></a>'+ 
         '<!-- Modal Structure -->' +
         '<div id="modal'+rowCount+'" class="modal modal-fixed-footer">'+
          ' <div class="modal-content">'+
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
		   '<form action="#">'+
		   '<div class="file-field input-field">'+
			 '<div class="btn">'+
				'<span>Immagine</span>'+
				'<input id="targetImg'+rowCount+'" type="file">'+
			 '</div>'+
			 '<div class="file-path-wrapper">'+
			  '<input class="file-path validate" type="text">'+
			 '</div>'+
		    '</div>'+
		  '</form>'+
		  '<form action="#">'+
		   '<div class="file-field input-field">'+
			 '<div class="btn">'+
				'<span>Video</span>'+
				'<input id="targetVideo'+rowCount+'" type="file">'+
			 '</div>'+
			 '<div class="file-path-wrapper">'+
			  '<input class="file-path validate" type="text">'+
			 '</div>'+
		    '</div>'+
		  '</form>'+
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
}

// listener che per ogni nodo aggiunto al database mi costruisce il codice html dinamicamente aggiungendo i valori del nodo prelevati dal database stesso.
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
	var img = snap.child("url").val();
	
	addHtml(img, titolo, rowCount, opKey, autore, periodo, descrizione);
		
});
});

/* listener che si attiva quando viene cliccato il pulsante con id=#addBtn situato nella pagina back-office.html. Aggiunge un nuovo nodo (opera) nel database, prelevando le informazioni da appositi form compilati dall'utente.*/
$("#addBtn").click(function(){
	
	"use strict";

	var newPostKey = firebase.database().ref().child('opere').push().key;
	var storageRef = firebase.storage().ref(newPostKey+'.jpg');
	var file = document.getElementById('targetFiles').files[0];
	var uploadTask = storageRef.put(file);
	
	firebase.database().ref('opere/'+newPostKey).set({

	autore: $("#autoreOpera").val(),
	titolo: $("#titoloOpera").val(),
	periodo: $("#periodoOpera").val(),
    descrizione: $("#descrizioneOpera").val(),
	url: "empty"

    });
	var storageRef2 = firebase.storage().ref(newPostKey+'.mp4'); 
	var file2 = document.getElementById('targetFiles2').files[0];
	storageRef2.put(file2);
	

uploadTask.on('state_changed',
 function() {
  // Handle unsuccessful uploads
	var e = "Error uploading file!";
	alert(e);
}, function(newPostKey) {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;
	firebase.database().ref('opere/'+ newPostKey).update({
		"url": downloadURL
	});
});	
}); 

/* listener che, in seguito al click del pulsante "conferma" creato dinamicamente, salva le modifiche effettuate dall'utente, il quale modifica i campi desiderati relativi all'opera, e le apporta al database al relativo nodo.*/
$(document).on('click', '.modificaNodo', function(){
	
	"use strict";
	
	var count = this.id;
	var keyOpera = $("#idOpera"+count).val();
	
    var imgStorage = firebase.storage().ref(keyOpera+'.jpg');		   
    var file = document.getElementById('targetImg'+count).files[0];
	imgStorage.put(file);
	
	var videoStorage = firebase.storage().ref(keyOpera+'.mp4');
    var file2 = document.getElementById('targetVideo'+count).files[0];
	videoStorage.put(file2);
						  
	var descrizioneOperas = $("#descrizioneOpera"+count).val();
	
	var updateRef = firebase.database().ref("opere/"+keyOpera);
	updateRef.update({

		 "descrizione": descrizioneOperas

	});
	
});

// listener che, in seguito al click del pulsante "elimina" creato dinamicamente, cancella il nodo nel database corrispondente all'opera che si sta cancellando.
$(document).on('click', '.cancellaNodo', function(){
	
	"use strict";
	
	var count = this.id;
	
	var keyOpera = $("#idOpera"+count).val();
	
	var storageRef = firebase.storage().ref(keyOpera+'.jpg');
	
	var storageRef2 = firebase.storage().ref(keyOpera+'.mp4'); 
	
	  // Delete the file
	storageRef.delete().then(function() {
	}).catch(function() {
		var e1 = "Error removing file!";
		alert(e1);
	});
	
	storageRef2.delete().then(function() {
	}).catch(function() {
		var e2 = "Error removing file!";
		alert(e2);
	});
	
	firebase.database().ref("opere/"+keyOpera).remove();

});

// listener che nasconde il pulsante creato dinamicamente "elimina" se l'utente autenticato corrisponde all'operatore del museo, il quale non può cancellare le opere.
$(document).on('click', '.mod', function(){
	
"use strict";
	
firebase.auth().onAuthStateChanged(function (user) {
	
	var uid;

	if (user) {

		// User is signed in.
		
		$(document).ready(function(){
			
			uid = user.uid;
			
			if (uid === "gVNIcf2GI5PhnLSEElUdfhYb6jE3") {

					$('.cancellaNodo').hide();

			}
		});

	}
});
	});
