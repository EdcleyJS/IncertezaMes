$(document).ready(function () {
	$("[name='ano']").change(function(){
		if('off'==$(this).children("option:selected").val()){
			console.log("undefined");
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
				//console.log("entrou");
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
				//console.log("entrou");
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