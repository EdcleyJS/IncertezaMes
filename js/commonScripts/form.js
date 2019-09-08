var perguntas=[];
perguntas.push(['Título1','001','Sim','Não']);
perguntas.push(['Título2','002','Recife','Vitória','Cabo','Caruaru']);
perguntas.push(['Título3','003','Escada','Floresta','Petrolina']);

var arr = [0,1,2];
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
		  		d4= geraperguntas(perguntas,d,1);
		  		list = document.getElementById("1p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,2);
		  		list = document.getElementById("4p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,3);
		  		list = document.getElementById("7p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,4);
		  		list = document.getElementById("10p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		  	case 1:
		  		d4= geraperguntas(perguntas,d,1);
		  		list = document.getElementById("2p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,2);
		  		list = document.getElementById("5p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,3);
		  		list = document.getElementById("8p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,4);
		  		list = document.getElementById("11p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		  	case 2:
		  		d4= geraperguntas(perguntas,d,1);
		  		list = document.getElementById("3p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,2);
		  		list = document.getElementById("6p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,3);
		  		list = document.getElementById("9p");
				list.insertBefore(d4, list.childNodes[0]);
		  		d4= geraperguntas(perguntas,d,4);
		  		list = document.getElementById("12p");
				list.insertBefore(d4, list.childNodes[0]);
		    break;
		  default:
		}
	});

	stepper1 = new Stepper($('.bs-stepper')[0]);
	stepper2 = new Stepper($('.bs-stepper')[1]);
	stepper3 = new Stepper($('.bs-stepper')[2]);
	 stepper4 = new Stepper($('.bs-stepper')[3]);
  	$(".ioRangerSlider").ionRangeSlider({
		min: 0,
        max: 5,
        skin: "big",
        grid: true,
        onFinish: function (data) {
        	$('#'+data.input[0].id).value=data.input[0].value; 
        }
	});
/*
  	$("#4confianca,#5confianca,#6confianca").ionRangeSlider({
		min: 0,
        max: 5,
        skin: "big",
        grid: true,
	});

  	$("#7confianca,#8confianca,#9confianca").ionRangeSlider({
		min: 0,
        max: 5,
        skin: "big",
        grid: true,
	});
  	$("#10confianca,#11confianca,#12confianca").ionRangeSlider({
		min: 0,
        max: 5,
        skin: "big",
        grid: true,
	});
*/
	$("#next1").click(function() {
		if($('input[type="radio"]:checked')[0]==undefined){
			document.getElementById("Form").classList.add('was-validated');
		}else{
			stepper1.next();
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
		if($('input[type="radio"]:checked')[1]==undefined){
			document.getElementById("Form").classList.add('was-validated');
		}else{
			stepper1.next();
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
		if($('input[type="radio"]:checked')[2]==undefined){
			document.getElementById("Form").classList.add('was-validated');
		}else{

			/*$('li')[1].classList.remove("disabled");
			$('li')[1].classList.remove("btn-secondary");*/
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#3p> div > input')[1].value = clicks;
			$('#3p> div > input')[2].value = (Math.round(diff/60));
			$('li > a')[1].click();
			$('li > a')[0].classList.add("disabled");
			//$('li > a')[0].classList.add("btn-secondary");
			//stepper1.next();
			if($("#Form").hasClass('was-validated')){
				document.getElementById("Form").classList.remove("was-validated");
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
	$("#2next1").click(function() {
		if($('input[type="radio"]:checked')[0]==undefined){
			document.getElementById("2Form").classList.add('was-validated');
		}else{
			stepper2.next();
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
		if($('input[type="radio"]:checked')[1]==undefined){
			document.getElementById("2Form").classList.add('was-validated');
		}else{
			stepper2.next();
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
		if($('input[type="radio"]:checked')[2]==undefined){
			document.getElementById("2Form").classList.add('was-validated');
		}else{
			/*$('li')[1].classList.remove("disabled");
			$('li')[1].classList.remove("btn-secondary");*/
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#6p> div > input')[1].value = clicks;
			$('#6p> div > input')[2].value = (Math.round(diff/60));
			$('li > a')[2].click();
			$('li > a')[1].classList.add("disabled");
			//$('li > a')[0].classList.add("btn-secondary");
			//stepper2.next();
			if($("#2Form").hasClass('was-validated')){
				document.getElementById("2Form").classList.remove("was-validated");
			}

			clicks=-1;
			d1 = new Date();
		}
	});
	$("#3next1").click(function() {
		if($('input[type="radio"]:checked')[0]==undefined){
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
		if($('input[type="radio"]:checked')[1]==undefined){
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
		if($('input[type="radio"]:checked')[2]==undefined){
			document.getElementById("3Form").classList.add('was-validated');
		}else{
			/*$('li')[1].classList.remove("disabled");
			$('li')[1].classList.remove("btn-secondary");*/
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#9p> div > input')[1].value = clicks;
			$('#9p> div > input')[2].value = (Math.round(diff/60));
			$('li > a')[3].click();
			$('li > a')[2].classList.add("disabled");
			//$('li > a')[0].classList.add("btn-secondary");
			if($("#3Form").hasClass('was-validated')){
				document.getElementById("2Form").classList.remove("was-validated");
			}

			clicks=-1;
			d1 = new Date();
		}
	});
	$("#4next1").click(function() {
		if($('input[type="radio"]:checked')[0]==undefined){
			document.getElementById("4Form").classList.add('was-validated');
		}else{
			stepper4.next();
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
		if($('input[type="radio"]:checked')[1]==undefined){
			document.getElementById("4Form").classList.add('was-validated');
		}else{
			stepper4.next();
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
		stepper4.next();
	});
	$("#4next4").click(function() {
		stepper4.next();
	});
	$('#captchaError').hide();
	/*$('#recaptcha-anchor > div').click(function(){
		
	});*/
	$("#4btn1").click(function() {
		//var v = grecaptcha.getResponse();
		if($('input[type="radio"]:checked')[2]==undefined){
			document.getElementById("4Form").classList.add('was-validated');
		}/*else if(v.length == 0){
		        $('#captchaError').show();
			    //else
			    {
			        document.getElementById('captcha').innerHTML="Captcha completado!";
			        return true; 
			    }
		}*/else{

			/*$('li')[1].classList.remove("disabled");
			$('li')[1].classList.remove("btn-secondary");*/
			//$('li > a')[3].click();
			//$('li > a')[2].classList.add("disabled");
			//$('li > a')[0].classList.add("btn-secondary");
			if($("#4Form").hasClass('was-validated')){
				document.getElementById("4Form").classList.remove("was-validated");
			}
			forms = document.getElementsByClassName('needs-validation');
			d2 = new Date();
			diff = Math.abs(d1-d2);
			$('#12p> div > input')[1].value = clicks;
			$('#12p> div > input')[2].value = (Math.round(diff/60));
			clicks=-1;
			d1 = new Date();
			Array.prototype.filter.call(forms, function(form) {
				if (form.checkValidity() === false) {
		          	event.preventDefault();
		          	event.stopPropagation();
		        }else{
		        	event.preventDefault();
		        	event.stopPropagation();
		        	form.reset();
		        	post_url = $(this).attr("action"); //get form action url
					request_method = $(this).attr("method"); //get form GET/POST method
					form_data = $(this).serialize(); //Encode form elements for submission
					//console.log(JSON.stringify($(this).serializeArray()));
					$.ajax({
						url : post_url,
						//type: request_method,
						//contentType: "application/json",
						//crossDomain : true,
						dataType: 'json',
				        data :  form_data,
				        method: 'post',
				        success: function(data){
				          	console.log('success: '+data);
				        },
				        error: function (request, status, error) {
			                console.log(error);
			            }
					});
					d1 = new Date();
					clicks=0;
					console.log(form);
		        }
			});
			$('#vis').hide();
    		$('#footer').show();
		}
	});
});