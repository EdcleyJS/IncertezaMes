$(document).ready(function () {
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
        skin: "big",
        grid: true,
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
    $('#vis').hide();
    $('#iniciar').click(function(){
    	$('#header').hide();
    	//$("#vis").css("display", "");
    	$('#vis').show();
    	//$("#header").css("display", "none");
    });
    $('#footer').hide();
});