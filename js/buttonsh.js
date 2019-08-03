$(document).ready(function () {
   	$( "[name='buttons']" ).change(function() {
   		featurename=undefined;
   		filterbymouth=this.value;
   		inicio(dataset);
   		if(document.getElementById('dft').checked== false) {
		  	document.getElementById("dft2").disabled = true;
		  	for (var i = 1; i < 5; i++) {
				document.getElementById("trimestre"+i).disabled = true;
			}
		}else if(document.getElementById('dft').checked == true) {
		  	document.getElementById("dft2").disabled = false;
	  		for (var i = 1; i < 5; i++) {
				document.getElementById("trimestre"+i).disabled = false;
			}
		}
	});
   	$( "[name='tri']" ).change(function() {
   		featurename=undefined;
   		filterbytri=this.value;
   		inicio(dataset);
   		if(document.getElementById('dft2').checked== false) {
			document.getElementById("dft").disabled = true;
			for (var i = 1; i < 13; i++) {
				document.getElementById("button"+i).disabled = true;
			}
		}else if(document.getElementById('dft2').checked== true) {
		  	document.getElementById("dft").disabled = false;
			for (var i = 1; i < 13; i++) {
				document.getElementById("button"+i).disabled = false;
			}
		}
	});
	$("[name='cidadesfiltro'").change(function(){
		var sdr = document.getElementById("example_id");
		var slider = $("#example_id").data("ionRangeSlider");
        var slider2 = $("#sliderrange2").data("ionRangeSlider");
        var selectedCountry = $(this).children("option:selected").val();

        if(featurename== $(this).children("option:selected").val()){
		   	featurename=undefined;
		}else if('off'==$(this).children("option:selected").val()){
			inicio(dataset);
			if(sdr){
		    	slider.reset();
			    slider.update({
			      disable:false
			    });
		    }else{
		    	slider2.reset();
			    slider2.update({
			      disable:false
			    });
		    }
		}else{	
		    featurename= $(this).children("option:selected").val();
		    compare(dataset); 
		    if(sdr){
		    	slider.update({
			      disable:true
			    });
		    }else{
		    	slider2.update({
			      disable:true
			    });
		    }
		}
		
    });
    $("#example_id").ionRangeSlider({
		min: 0,
        max: 300,
        skin: "big",
        grid: true,
        onFinish: function (data) {
            alpha=data.from;
            inicio(dataset);
        }
	});
	$("#sliderrange2").ionRangeSlider({
		type: "double",
		min: 0,
        max: 300,
        from: 60,
        to: 100,
        drag_interval: true,
        grid: true,
        skin: "big",
        onFinish: function (data) {
        	interOn=true;
            left=data.from;
            right=data.to;
            inicio(dataset);
            interOn=false;
        }
	});
	$("[name='ano']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			anoSelecionado=undefined;
			inicio(dataset);
		}else{
			if(mesSelecionado!=undefined &&diaSelecionado!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
	        	anoSelecionado=$(this).children("option:selected").val();
        		inicio(dataset);
			}
		}
    });
    $("[name='trimestre']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			$("[name='meses']").prop('disabled', false);
			trimestreSelecionado=undefined;
			inicio(dataset);
		}else{
			if(anoSelecionado!=undefined && diaSelecionado!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
				$("[name='meses']").prop('selectedIndex',0);
				$("[name='meses']").prop('disabled', true);
				console.log("entrou");
				trimestreSelecionado=$(this).children("option:selected").val();
				inicio(dataset);
			}
		}
    });
	$("[name='meses']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			$("[name='trimestre']").prop('disabled', false);
			mesSelecionado=undefined;
			inicio(dataset);
		}else{
			if(anoSelecionado!=undefined && diaSelecionado!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
				$("[name='trimestre']").prop('selectedIndex',0);
				$("[name='trimestre']").prop('disabled', true);
				console.log("entrou");
				mesSelecionado=$(this).children("option:selected").val();
				inicio(dataset);
			}
		}
    });
    $("[name='dias']").change(function(){
    	if('off'==$(this).children("option:selected").val()){
			diaSelecionado=undefined;
			inicio(dataset);
		}else{
			if(anoSelecionado!=undefined && mesSelecionado!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
				diaSelecionado=$(this).children("option:selected").val();
				inicio(dataset);
			}
		}
    });
});