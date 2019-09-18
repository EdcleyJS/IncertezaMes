var arr = [0,1,2,3,4,5,6,7,8,9];
function shuffle(array) {
	var m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
	}
	return array;
}
arr= shuffle(arr);
var clicks=0;
var d1 = new Date();
var stepper1,stepper2,stepper3,stepper4,d4,list,d2,diff,post_url,request_method,form_data,forms;
$(document).ready(function () {
	arr.forEach(function(d,i){
		switch(i) {
		  	case 0:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("1p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("11p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("21p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("31p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		  	case 1:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("2p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("12p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("22p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("32p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		  	case 2:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("3p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("13p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("23p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("33p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 3:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("4p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("14p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("24p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("34p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 4:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("5p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("15p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("25p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("35p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 5:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("6p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("16p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("26p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("36p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 6:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("7p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("17p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("27p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("37p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 7:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("8p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("18p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("28p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("38p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 8:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("9p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("19p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("29p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("39p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		    case 9:
		  		d4= geraperguntas(perguntasT1,d,1);
		  		list = document.getElementById("10p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT2,d,2);
		  		list = document.getElementById("20p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT3,d,3);
		  		list = document.getElementById("30p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntasT4,d,4);
		  		list = document.getElementById("40p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		  default:
		}
	});
	stepper0 = new Stepper($('.bs-stepper')[0]);
	stepper1 = new Stepper($('.bs-stepper')[1]);
	stepper2 = new Stepper($('.bs-stepper')[2]);
	stepper3 = new Stepper($('.bs-stepper')[3]);
	stepper4 = new Stepper($('.bs-stepper')[4]);
  	$(".ioRangerSlider").ionRangeSlider({
		min: 0,
        max: 5,
        skin: "big",
        grid: true,
        onFinish: function (data) {
        	$('#'+data.input[0].id).value=data.input[0].value; 
        }
	});
	$(".btn-next-form").click(function() {
		if($(this).hasClass('tutorial')==false){
			var ent= $(this).parent().find('.form-group > div > div> div >input')[0].name;
			if($('input[name='+ent+']:checked').val()==undefined){
				$(this).parent().parent()[0].classList.add('was-validated');
			}else{
			   	var formName=$(this).parent().parent()[0].id;
			   	opcoes=[];
			   	if(formName=='Form'){
			   		stepper1.next();
			   		var id= $(this).parent().next().find('div >div > div> input')[0].id;
			    	id=id.substring(0, 3);
			   		var p=findP(perguntasT1,id);
			    	p=p.slice(2,p.length);
			    	p.forEach(function(d,i){
			    		opcoes.push(d);
			    	});
			    	inicio(dataset);
			   	}else if(formName=='2Form'){
			   		stepper2.next();
			   		var id= $(this).parent().next().find('div >div > div> input')[0].id;
			    	id=id.substring(0, 3);
			   		var p=findP(perguntasT2,id);
			    	p=p.slice(2,p.length);
			    	p.forEach(function(d,i){
			    		opcoes.push(d);
			    	});
			    	inicioRange(dataset);
			   	}else if(formName=='4Form'){
			   		stepper4.next();
			   		var id= $(this).parent().next().find('div >div > div> input')[0].id;
			    	id=id.substring(0, 3);
			   		var p=findP(perguntasT4,id);
			    	p=p.slice(2,p.length);
			    	p.forEach(function(d,i){
			    		opcoes.push(d);
			    	});
			    	inicioMedia(dataset);
			   	}else{
			   		stepper3.next();
			   	}

				if($(this).parent().parent().hasClass('was-validated')){
					$(this).parent().parent()[0].classList.remove("was-validated");
				}
				$(this).parent().find('.form-group > div > input')[1].value = clicks;
				d2 = new Date();
				diff = Math.abs(d1-d2);
				$(this).parent().find('.form-group > div > input')[2].value = (Math.round(diff/60));
				clicks=-1;
				d1 = new Date();		
			}
		}else{
			if($(this)[0].id=='btuto1'){
				if($('#5Form')[0].checkValidity()==false){
					$('#5Form')[0].classList.add("was-validated");
				}else{
					stepper0.next();
				}
			}else if($(this)[0].id=='btuto10'){
				$('#tutorial').css('display','none');
	    		$('#vis').css('display','');
	    		if($('#Form').is(':visible')){
					map.invalidateSize();
					var id= $('Form > div.active > div > div > div > div> input')[0].id;
				    id=id.substring(0, 3);
				    var p=findP(perguntasT1,id);
				    p=p.slice(2,p.length);
				    opcoes=[];
				    p.forEach(function(d,i){
				    	opcoes.push(d);
				    });
				    inicio(dataset);
				}else if($('#2Form').is(':visible')){
					mapRange.invalidateSize();
					var id= $('#2Form > div.active > div > div > div > div> input')[0].id;
				    id=id.substring(0, 3);
				    var p=findP(perguntasT2,id);
				    p=p.slice(2,p.length);
				    opcoes=[];
				    p.forEach(function(d,i){
				    	opcoes.push(d);
				    });
				    inicioRange(dataset);
				}else if($('#4Form').is(':visible')){
					mapMedia.invalidateSize();
					var id= $('#4Form > div.active > div > div > div > div> input')[0].id;
				    id=id.substring(0, 3);
				    var p=findP(perguntasT2,id);
				    p=p.slice(2,p.length);
				    opcoes=[];
				    p.forEach(function(d,i){
				    	opcoes.push(d);
				    });
				    inicioMedia(dataset);
				}else{
					mapDot.invalidateSize();
					inicioDotMap(dataset);
				}
			}else{
				stepper0.next();
			}
		}
	});
	$("#btn1,#2btn1,#3btn1,#4btn1").click(function() {
		var ent= $(this).parent().find('.form-group > div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			$(this).parent().parent()[0].classList.add('was-validated');
		}else{
			d2 = new Date();
			diff = Math.abs(d1-d2);
			var ent= $(this).parent().find('.form-group > div > input')[1].value = clicks;
			var ent= $(this).parent().find('.form-group > div > input')[2].value = (Math.round(diff/60));
			$('#pills-tab > li> a.active').parent().next()[0].classList.remove("disabled");
			$('#pills-tab > li> a.active').parent().next().find('a').click();
			$('#pills-tab > li> a.active').parent().prev()[0].classList.add("disabled");
			if($(this).parent().parent().hasClass('was-validated')){
				$(this).parent().parent()[0].classList.remove("was-validated");
			}
			clicks=-1;
			d1 = new Date();
		}
	});

	$(document).on("click",function() {
        clicks+=1;
    });
    $(".custom-control-input").click(function() {
    	clicks-=1;
    });
    $('#Form,#2Form,#3Form,#4Form,#5Form').submit(function(){
	    $.ajax({
		    url: $(this).attr('action'),
		    type: 'POST',
		    data : $(this).serialize(),
		    success: function(result, status, request){
		        console.log("Estado atual---\n" + status + "\nResultado: " + JSON.stringify(result));
		    },
		    error: function (request, status, erro) {
		      	console.log("Problema ocorrido: " + status + "\nDescição: " + erro);
		    }
	    });
	    return false;
	});
});
/*	$("#next1").click(function() {
		console.log($(this).parent().find('.form-group')[0]);
		var ent= $('#1p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("Form").classList.add('was-validated');
		}else{
			stepper1.next();
			//
			var id= $('Form > div.active > div > div >div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT1,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicio(dataset);
			if($("#Form").hasClass('was-validated')){
				document.getElementById("Form").classList.remove("was-validated");
			}
			$('#1p> div > input')[1].value = clicks;
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#1p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();		
		}
	});
	$("#next2").click(function() {
		var ent= $('#2p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("Form").classList.add('was-validated');
		}else{
			stepper1.next();

			var id= $('#Form > div.active > div > div >div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT1,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicio(dataset);

			if($("#Form").hasClass('was-validated')){
				document.getElementById("Form").classList.remove("was-validated");
			}

			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#2p> div > input')[1].value = clicks;
			$('#2p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();
		}
	});
	$("#btn1").click(function() {
		var ent= $('#3p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("Form").classList.add('was-validated');
		}else{
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#3p> div > input')[1].value = clicks;
			$('#3p> div > input')[2].value = (Math.round(diff/60));
			/*
			$('li > a')[1].classList.remove("disabled");
			$('li > a')[1].click();
			$('li > a')[0].classList.add("disabled");
			

			$('#pills-tab > li> a.active').parent().next()[0].classList.remove("disabled");
			$('#pills-tab > li> a.active').parent().next().find('a').click();
			$('#pills-tab > li> a.active').parent().prev()[0].classList.add("disabled");

			if($("#Form").hasClass('was-validated')){
				document.getElementById("Form").classList.remove("was-validated");
			}
			clicks=-1;
			d1 = new Date();
		}
	});*/


    /*
	$("#2next1").click(function() {
		var ent= $('#4p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("2Form").classList.add('was-validated');
		}else{
			stepper2.next();

			var id= $('#2Form > div.active > div > div >div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT2,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicioRange(dataset);

			if($("#2Form").hasClass('was-validated')){
				document.getElementById("2Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#4p> div > input')[1].value = clicks;
			$('#4p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();		
		}
	});
	$("#2next2").click(function() {
		var ent= $('#5p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("2Form").classList.add('was-validated');
		}else{
			stepper2.next();

			var id= $('#2Form > div.active > div > div >div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT2,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicioRange(dataset);

			if($("#2Form").hasClass('was-validated')){
				document.getElementById("2Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#5p> div > input')[1].value = clicks;
			$('#5p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();
		}
	});
	$("#2btn1").click(function() {
		var ent= $('#6p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("2Form").classList.add('was-validated');
		}else{
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#6p> div > input')[1].value = clicks;
			$('#6p> div > input')[2].value = (Math.round(diff/60));
			//$('li > a')[2].classList.remove("disabled");
			//$('li > a')[2].click();
			//$('li > a')[1].classList.add("disabled");

			$('#pills-tab > li> a.active').parent().next()[0].classList.remove("disabled");
			$('#pills-tab > li> a.active').parent().next().find('a').click();
			$('#pills-tab > li> a.active').parent().prev()[0].classList.add("disabled");
			if($("#2Form").hasClass('was-validated')){
				document.getElementById("2Form").classList.remove("was-validated");
			}
			clicks=-1;
			d1 = new Date();
		}
	});
	$("#3next1").click(function() {
		var ent= $('#7p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("3Form").classList.add('was-validated');
		}else{
			stepper3.next();
			if($("#3Form").hasClass('was-validated')){
				document.getElementById("3Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#7p> div > input')[1].value = clicks;
			$('#7p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();		
		}
	});
	$("#3next2").click(function() {
		var ent= $('#8p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("3Form").classList.add('was-validated');
		}else{
			stepper3.next();
			if($("#3Form").hasClass('was-validated')){
				document.getElementById("3Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#8p> div > input')[1].value = clicks;
			$('#8p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();
		}
	});
	$("#3btn1").click(function() {
		var ent= $('#9p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("3Form").classList.add('was-validated');
		}else{
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#9p> div > input')[1].value = clicks;
			$('#9p> div > input')[2].value = (Math.round(diff/60));

			//$('li > a')[3].classList.remove("disabled");
			//$('li > a')[3].click();
			//$('li > a')[2].classList.add("disabled");

			$('#pills-tab > li> a.active').parent().next()[0].classList.remove("disabled");
			$('#pills-tab > li> a.active').parent().next().find('a').click();
			$('#pills-tab > li> a.active').parent().prev()[0].classList.add("disabled");
			if($("#3Form").hasClass('was-validated')){
				document.getElementById("2Form").classList.remove("was-validated");
			}
			clicks=-1;
			d1 = new Date();
		}
	});
	$("#4next1").click(function() {
		var ent= $('#10p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("4Form").classList.add('was-validated');
		}else{
			stepper4.next();

			var id= $('#4Form > div.active > div > div > div > div > input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT4,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicioMedia(dataset);

			if($("#4Form").hasClass('was-validated')){
				document.getElementById("4Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#10p> div > input')[1].value = clicks;
			$('#10p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();		
		}
	});

	$("#4next2").click(function() {
		var ent= $('#11p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("4Form").classList.add('was-validated');
		}else{
			stepper4.next();

			var id= $('#4Form > div.active > div > div > div > div > input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT4,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicioMedia(dataset);

			if($("#4Form").hasClass('was-validated')){
				document.getElementById("4Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#11p> div > input')[1].value = clicks;
			$('#11p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();
		}
	});
	$("#4next3").click(function() {
		var ent= $('#12p> div > div> div >input')[0].name;
		if($('input[name='+ent+']:checked').val()==undefined){
			document.getElementById("4Form").classList.add('was-validated');
		}else{
			if($("#4Form").hasClass('was-validated')){
				document.getElementById("4Form").classList.remove("was-validated");
			}
			stepper4.next();
		}
	});
	$("#4next4").click(function() {
		stepper4.next();
	});
	*/
	//$('#captchaError').hide();
	/*$("#4btn1").click(function() {
		//var v = grecaptcha.getResponse();
		//if(v.length == 0){
		//       $('#captchaError').show();
		//}else{}
			if($("#4Form").hasClass('was-validated')){
				document.getElementById("4Form").classList.remove("was-validated");
			}
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#12p> div > input')[1].value = clicks;
			$('#12p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();
			clicks=0;
			//$('#vis').css('display','none');
    		//$('#footer').css('display','');
    		$('#pills-tab > li> a.active').parent().next()[0].classList.remove("disabled");
			$('#pills-tab > li> a.active').parent().next().find('a').click();
			$('#pills-tab > li> a.active').parent().prev()[0].classList.add("disabled");
		
	});*/
/*
	$('#2Form').submit(function(){
	    $.ajax({
	      url: $('#2Form').attr('action'),
	      type: 'POST',
	      data : $('#2Form').serialize(),
	      success: function(){
	        console.log('form submitted.');
	      }
	    });
	    return false;
	});
	$('#3Form').submit(function(){
	    $.ajax({
	      url: $('#3Form').attr('action'),
	      type: 'POST',
	      data : $('#3Form').serialize(),
	      success: function(){
	        console.log('form submitted.');
	      }
	    });
	    return false;
	});
	$('#4Form').submit(function(){
		$('#g-recaptcha-response').attr("name","recaptcha");
	    $.ajax({
	      url: $('#4Form').attr('action'),
	      type: 'POST',
	      data : $('#4Form').serialize(),
	      success: function(){
	        console.log('form submitted.');
	      }
	    });
	    return false;
	});*/
