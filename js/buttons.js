$(document).ready(function () {
   	$( "[name='buttons']" ).change(function() {
   		featurename=undefined;
   		filterbymouth=this.value;
   		//alert(filterbymouth);
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
});