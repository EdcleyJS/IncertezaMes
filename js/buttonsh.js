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
	$("select.custom-select").change(function(){
		var sdr = document.getElementById("example_id");
        var selectedCountry = $(this).children("option:selected").val();
        var slider = $("#example_id").data("ionRangeSlider");
        var slider2 = $("#sliderrange2").data("ionRangeSlider");
        
        if(featurename== $(this).children("option:selected").val()){
		   	featurename=undefined;
		}else if('off'==$(this).children("option:selected").val()){
			featurename=undefined;
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
		    for (var i = 0; i < dataset.features.length; i++) {
		    	if(dataset.features[i].properties.name==featurename){
		    		var f=dataset.features[i];
		    		var dist=[[Number(f.properties.Janeiro)],[Number(f.properties.Fevereiro)],[Number(f.properties.Março)],[Number(f.properties.Abril)],[Number(f.properties.Maio)],[Number(f.properties.Junho)],[Number(f.properties.Julho)],[Number(f.properties.Agosto)],[Number(f.properties.Setembro)],[Number(f.properties.Outubro)],[Number(f.properties.Novembro)],[Number(f.properties.Dezembro)]];       
		    		dist= dist.sort(function(a, b){return a - b});
		    		left=Number(dist[0]); right=Number(dist[11]);
					break;
			  	}
		    }
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
        skin: "big",
        onFinish: function (data) {
            left=data.from;
            right=data.to;
            compare(dataset);
        }
	});
});