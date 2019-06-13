$(document).ready(function () {
   	$( "[name='tri']" ).change(function() {
   		filterbytri=this.value;
   		inicio(dataset);
	});
});