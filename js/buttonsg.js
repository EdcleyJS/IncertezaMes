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
   		//alert(filterbytri);
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
        var selectedCountry = $(this).children("option:selected").val();
        if(featurename== $(this).children("option:selected").val()){
		   	featurename=undefined;
		}else if('off'==$(this).children("option:selected").val()){
			inicio(dataset);
		}else{
		    featurename= $(this).children("option:selected").val();
		    for (var i = 0; i < dataset.features.length; i++) {
		    	if(dataset.features[i].properties.name==featurename){
			  		filterclick(sum(dataset.features[i]));
					compare(dataset); 
					break;
			  	}
		    }
		}
    });
});