var perguntas=[];
perguntas.push(['Título1','001','Sim','Não']);
perguntas.push(['Título2','002','Recife','Vitória','Cabo','Caruaru']);
perguntas.push(['Título3','003','Escada','Floresta','Petrolina']);



	var arr = [0,1,2];
/*while(arr.length < 4){
	var r = Math.floor(Math.random()*3) + 1;
	if(arr.indexOf(r) === -1) arr.push(r);
}*/
function shuffle(array) {
	var m = array.length, t, i;
	  // While there remain elements to shuffle…
	while (m) {
	    // Pick a remaining element…
		i = Math.floor(Math.random() * m--);
	    // And swap it with the current element.
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
	}
	return array;
}
arr= shuffle(arr);
console.log(arr);

function geraperguntas(perguntas,index){
	//var index=Math.floor((Math.random()*1)+1);
	var d1= document.createElement("div");
	var d2= document.createElement("div");
	d2.setAttribute('class','card');
	console.log(index);
	var pergunta= perguntas[index];
	var label = document.createElement("label");//label antes com a pergunta
	label.setAttribute('style',"font-weight:bold;");
	//label.setAttribute('class',"custom-control-label");
	label.setAttribute('for',"pergunta1");
	label.setAttribute('id',"pergunta1");
	label.innerText= pergunta[0];//"Pergunta 1 ?";
	for (var i = 2; i < pergunta.length; i++) {
		var div1 = document.createElement("div");
		div1.setAttribute('class',"custom-control custom-radio custom-control-inline ");
		var radio1 = document.createElement("input"); //input element, text
		if(i==2){
			radio1.required = true;
		}
		radio1.setAttribute('type',"radio");
		radio1.setAttribute('class',"custom-control-input form-check-input");
		radio1.setAttribute('name',"pergunta"+pergunta[1]);
		radio1.setAttribute('id',""+pergunta[1]+pergunta[i]);
		radio1.setAttribute('value',pergunta[i]);
		var label1 = document.createElement("label");
		label1.setAttribute('class',"custom-control-label form-check-label");
		label1.setAttribute('for',""+pergunta[1]+pergunta[i]);
		label1.setAttribute('style',"font-weight:bold;");
		label1.innerText=pergunta[i];

		div1.appendChild(radio1);
		div1.appendChild(label1);

		d2.appendChild(label);
		d1.appendChild(div1);
		d2.appendChild(d1);
	}
	return d2;

}
//geraperguntas(perguntas);
var stepper1;
$(document).ready(function () {
  	stepper1 = new Stepper($('.bs-stepper')[0]);
  	$("#confianca,#confianca2p,#confianca3p").ionRangeSlider({
		min: 0,
        max: 5,
        skin: "big",
        grid: true,
	});
	arr.forEach(function(d,i){
		switch(i) {
		  	case 0:
		  		var d3= geraperguntas(perguntas,d);
		  		var list = document.getElementById("1p");
				list.insertBefore(d3, list.childNodes[0]);
		    break;
		  	case 1:
		  		var d3= geraperguntas(perguntas,d);
		  		var list = document.getElementById("2p");
				list.insertBefore(d3, list.childNodes[0]);
		    break;
		  	case 2:
		  		var d3= geraperguntas(perguntas,d);
		  		var list = document.getElementById("3p");
				list.insertBefore(d3, list.childNodes[0]);
		    break;
		  default:
		}
	});

	$("#next1").click(function() {
		document.getElementById("clicksp1").value = clicks;
		var d2 = new Date();  // some date
		var diff = Math.abs(d1-d2);  // difference in milliseconds
		document.getElementById("tempop1").value = (Math.round(diff/60));
		clicks=-1;
		d1 = new Date();
		console.log(document.getElementById("clicksp1").value);
		console.log(document.getElementById("tempop1").value);
	});

	$("#next2").click(function() {
		document.getElementById("clicksp2").value = clicks;
		var d2 = new Date();  // some date
		var diff = Math.abs(d1-d2);  // difference in milliseconds
		document.getElementById("tempop2").value = (Math.round(diff/60));
		clicks=-1;
		d1 = new Date();
			console.log(document.getElementById("clicksp2").value);
		console.log(document.getElementById("tempop2").value);
	});
    $("#pergunta1Form").submit(function(event){
		event.preventDefault(); //prevent default action 
		var post_url = $(this).attr("action"); //get form action url
		var request_method = $(this).attr("method"); //get form GET/POST method
		var form_data = $(this).serialize(); //Encode form elements for submission
		console.log(JSON.stringify($(this).serializeArray()));
		$.ajax({
			url : post_url,
/*			headers: {
	            'Access-Control-Allow-Origin': '*',
	            'Content-Type':'application/json',
	            'Access-Control-Allow-Credentials': 'true'
	        },*/
	        data :  form_data,
	        method: 'POST',
	        dataType: 'json',
	        type: request_method,
	        success: function(data){
	          	console.log('success: '+data);
	        }
			//crossDomain: true,
			//
			
			//contentType: 'application/json',
    		//cache: false,
    		

		});
	});

});
var clicks=0;
var d1 = new Date();
$(document).ready(function() {
    $(document).on("click",function() {
        clicks+=1;
        console.log(clicks);
		//console.log(Math.round(diff/60));
    });
    $(".custom-control-input").click(function() {
    	clicks-=1;
    });
    
});
//"idform" is the id of the form

/*

//d1.setAttribute('class',"col-lg-3 col-md-3 col-sm-3 col-xs-3");

var f = document.createElement("form");
f.setAttribute('method',"post");
f.setAttribute('action',"submit.php");

var div1 = document.createElement("div");
div1.setAttribute('class',"custom-control custom-radio custom-control-inline");
var div2 = document.createElement("div");
div2.setAttribute('class',"custom-control custom-radio custom-control-inline");
var div3 = document.createElement("div");
div3.setAttribute('class',"custom-control custom-radio custom-control-inline");
var div4 = document.createElement("div");
div4.setAttribute('class',"custom-control custom-radio custom-control-inline");



*/



/*

var radio3 = document.createElement("input"); //input element, text
radio3.setAttribute('type',"radio");
radio3.setAttribute('class',"custom-control-input");
radio3.setAttribute('name',"pergunta1");
radio3.setAttribute('id',"3radiopergunta1");
radio3.setAttribute('value',"R3");

var label3 = document.createElement("label");
label3.setAttribute('class',"custom-control-label");
label3.setAttribute('for',"3radiopergunta1");
label3.setAttribute('style',"font-weight:bold;");
label3.innerText="R3";

var radio4 = document.createElement("input"); //input element, text
radio4.setAttribute('type',"radio");
radio4.setAttribute('class',"custom-control-input");
radio4.setAttribute('name',"pergunta1");
radio4.setAttribute('id',"4radiopergunta1");
radio4.setAttribute('value',"R4");

var label4 = document.createElement("label");
label4.setAttribute('class',"custom-control-label");
label4.setAttribute('for',"4radiopergunta1");
label4.setAttribute('style',"font-weight:bold;");
label4.innerText="R4";


//var s = document.createElement("input"); //input element, Submit button
//s.setAttribute('type',"submit");
//s.setAttribute('value',"Submit");



div2.appendChild(radio2);
div2.appendChild(label2);

div3.appendChild(radio3);
div3.appendChild(label3);

div4.appendChild(radio4);
div4.appendChild(label4);
//d.appendChild(s);



d1.appendChild(div1);
d1.appendChild(div2);
d1.appendChild(div3);
d1.appendChild(div4);

//d1.appendChild(f);
//and some more input elements here
//and dont forget to add a submit button
*/

