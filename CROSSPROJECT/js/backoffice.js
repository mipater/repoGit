/* crea una variabile di tipo stringa che serve a creare i vari componenti(collapsible, modal, buttons, forms, textarea) in maniera dinamica, aggiungedoli ad uno specifico <div> con id=#prova nel <body> di back-office.html. */
function addHtml(img, titolo, rowCount, rowCount2, opKey, autore, periodo, descrizione){
	"use strict";
	var html = 
'<div class="col s5 offset-s4">'  +
    '<ul data-scic="'+rowCount+'" class="collapsible teal grey lighten-5" data-collapsible="accordion">  <li> ' +
       ' <div class="collapsible-header"><i class="material-icons">filter_drama</i>'+titolo+'</div>'+
      ' <div class="collapsible-body"> ' +
		'<div class="row">' +
		' <img src="'+img+'" align="left" class="imgOp responsive-img"></div>'+
		' <p align="right">' +
        ' <a class="mod waves-effect waves-light btn btn-large" href="#modal'+rowCount+'"><i class="material-icons">mode_edit</i></a>'+ 
	'<a id="'+opKey+'" data-cic="'+rowCount+'" class="qr waves-effect waves-light btn btn-large" href="#modal'+rowCount2+'"><i class="material-icons">dashboard</i></a>' +
         '<div id="modal'+rowCount+'" class="modal modal-fixed-footer">'+
          ' <div class="modal-content">'+
            ' <h4>'+ titolo +'</h4>'+
		    '<form class="col s12">'+
			'<div class="row"> ' +
				'<div class="input-field col s12">' +
				  '<textarea disabled value="" id="idOpera'+rowCount+'" class="materialize-textarea">' + opKey + '</textarea>'+
				  '<label class="active" for="idOpera">ID</label></div>'+
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
			  '<input placeholder="Nessun immagine selezionata" class="file-path validate" type="text">'+
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
			  '<input placeholder="Nessun video selezionato" class="file-path validate" type="text">'+
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
		 '<div id="modal'+rowCount2+'" class="modal">' +
		   '<div class="modal-content">' +
			 '<h4>'+titolo+'</h4>' +
		   '</div>' +
		' <img id="qrcode'+rowCount+'" src=""/>' +
		   '<div class="modal-footer">' +
			'<a href="#!" data-trick="'+rowCount+'" class="print modal-action waves-effect waves-light btn btn-large"><i class="material-icons">print</i></a> </div></div></div></li></ul></div>';
	$("#prova").append(html);	
}

// listener che per ogni nodo aggiunto al database mi costruisce il codice html dinamicamente aggiungendo i valori del nodo prelevati dal database stesso.
$(document).ready(function(){
	
"use strict";

var rowCount = 0;
var rowCount2 = 100;

var ref = firebase.database().ref("opere");

ref.on("child_added", function(snap) {
	
	rowCount++;
	rowCount2++;

	var opKey = snap.getKey();
	var autore = snap.child("autore").val();
	var descrizione = snap.child("descrizione").val();
	var periodo = snap.child("periodo").val();
	var titolo = snap.child("titolo").val();
	var img = snap.child("url").val();
	
	addHtml(img, titolo, rowCount, rowCount2, opKey, autore, periodo, descrizione);
		
});
});

/* listener che si attiva quando viene cliccato il pulsante con id=#addBtn situato nella pagina back-office.html. Aggiunge un nuovo nodo (opera) nel database, prelevando le informazioni da appositi form compilati dall'utente.*/
$("#addBtn").click(function(){
	
	"use strict";
	
	var rootRef = firebase.database().ref();
    rootRef.once('value', function (snapshot) {
    if (!snapshot.hasChild("opere")) {
		
		var k = rootRef.push().key;
		rootRef.child("opere").child(k).set({
			
			autore: $("#autoreOpera").val(),
	        titolo: $("#titoloOpera").val(),
     	    periodo: $("#periodoOpera").val(),
            descrizione: $("#descrizioneOpera").val(),
     	    url: "empty"
		
		});
		var storageRef2 = firebase.storage().ref(k+'.mp4'); 
	    var file2 = document.getElementById('targetFiles2').files[0];
	    storageRef2.put(file2);
		
		var storageRef = firebase.storage().ref(k+'.jpg');
	    var file = document.getElementById('targetFiles').files[0];
	    var uploadTask = storageRef.put(file);
		
		uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
		case firebase.storage.TaskState.PAUSED: // or 'paused'
		  console.log('Upload is paused');
		  break;
		case firebase.storage.TaskState.RUNNING: // or 'running'
		  console.log('Upload is running');
		  break;
	  }
	}, function(error) {
	  // Handle unsuccessful uploads
		alert(error.message);
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  var downloadURL = uploadTask.snapshot.downloadURL;
			firebase.database().ref('opere/'+k).update({
			"url": downloadURL
		});
		location.reload();
});	
    }
});
	
	var newPostKey = firebase.database().ref().child('opere').push().key;
	
	var storageRef2 = firebase.storage().ref(newPostKey+'.mp4'); 
	var file2 = document.getElementById('targetFiles2').files[0];
	storageRef2.put(file2);
	
	firebase.database().ref('opere/'+newPostKey).set({

	autore: $("#autoreOpera").val(),
	titolo: $("#titoloOpera").val(),
	periodo: $("#periodoOpera").val(),
    descrizione: $("#descrizioneOpera").val(),
	url: "empty"
		
    });
	
	var storageRef = firebase.storage().ref(newPostKey+'.jpg');
	var file = document.getElementById('targetFiles').files[0];
	var uploadTask = storageRef.put(file);
	
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
	alert(error.message);
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;
		firebase.database().ref('opere/'+newPostKey).update({
		"url": downloadURL
	});
	location.reload();
});	
}); 

/* listener che, in seguito al click del pulsante "conferma" creato dinamicamente, salva le modifiche effettuate dall'utente, il quale modifica i campi desiderati relativi all'opera, e le apporta al database al relativo nodo.*/
$(document).on('click', '.modificaNodo', function(){
	
	"use strict";
	
	var count = this.id;
	var keyOpera = $("#idOpera"+count).val();
	
    var imgStorage = firebase.storage().ref(keyOpera+'.jpg');		   
    var file = document.getElementById('targetImg'+count).files[0];
	if (typeof file !== "undefined"){
		imgStorage.put(file);
	}
	
	var videoStorage = firebase.storage().ref(keyOpera+'.mp4');
    var file2 = document.getElementById('targetVideo'+count).files[0];
	if (typeof file2 !== "undefined"){
		videoStorage.put(file2);
	}
						 
	var updateRef = firebase.database().ref("opere/"+keyOpera);
	updateRef.update({

		 "descrizione": $("#descrizioneOpera"+count).val(),
		 "titolo":  $("#titoloOpera"+count).val(),
		 "autore": $("#autoreOpera"+count).val(),
		 "periodo": $("#periodoOpera"+count).val()

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
	}).catch(function(error) {
		alert(error.message);
	});
	
	storageRef2.delete().then(function() {
	}).catch(function(error) {
		alert(error.message);
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

// listener che genera il qr code per ogni opera.
$(document).on('click', '.qr', function(){
	
	"use strict";
	
	var id = this.id; // opKey 
	var count = $(this).data('cic');	//contatore
	var imgURL = 'https://chart.googleapis.com/chart?chs=275x275&cht=qr&chl='+id;
	$("#qrcode"+count).attr('src', imgURL);
	
	
});

// listener che consente la stampa del qr code.
$(document).on('click', '.print', function(){
	
	"use strict";
	
	var count = $(this).data('trick');
	
	$("#qrcode"+count).print();
	
});
