$(document).ready(function () {
	$("#sliderrange").ionRangeSlider({
		type: "double",
		min: 0,
        max: 300,
        from: 60,
        to: 100,
        drag_interval: true,
        skin: "big",
        grid: true,
        onFinish: function (data) {
            left=data.from;
            right=data.to;
            inicioIntervalo(dataset2);
        }
	});
	$("[name='ano2']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			anoSelecionado2=undefined;
			inicioIntervalo(dataset2);
		}else{
			if(mesSelecionado2!=undefined &&diaSelecionado2!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
	        	anoSelecionado2=$(this).children("option:selected").val();
        		inicioIntervalo(dataset2);
			}
		}
    });
    $("[name='trimestre2']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			$("[name='meses']").prop('disabled', false);
			trimestreSelecionado2=undefined;
			inicioIntervalo(dataset2);
		}else{
			if(anoSelecionado2!=undefined && diaSelecionado2!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
				$("[name='meses']").prop('selectedIndex',0);
				$("[name='meses']").prop('disabled', true);
				console.log("entrou");
				trimestreSelecionado2=$(this).children("option:selected").val();
				inicioIntervalo(dataset2);
			}
		}
    });
	$("[name='meses2']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			$("[name='trimestre']").prop('disabled', false);
			mesSelecionado2=undefined;
			inicioIntervalo(dataset2);
		}else{
			if(anoSelecionado2!=undefined && diaSelecionado2!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
				$("[name='trimestre']").prop('selectedIndex',0);
				$("[name='trimestre']").prop('disabled', true);
				console.log("entrou");
				mesSelecionado2=$(this).children("option:selected").val();
				inicioIntervalo(dataset2);
			}
		}
    });
    $("[name='dias2']").change(function(){
    	if('off'==$(this).children("option:selected").val()){
			diaSelecionado2=undefined;
			inicioIntervalo(dataset2);
		}else{
			if(anoSelecionado2!=undefined && mesSelecionado2!=undefined){
				alert("Não é possível comparar apenas um elemento!");
			}else{
				diaSelecionado2=$(this).children("option:selected").val();
				inicioIntervalo(dataset2);
			}
		}
    });
});