$(document).ready(function () {
	var anos=[2016,2017,2018];
	var trimestre=[1,2,3,4];
	var meses=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
	var dias=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	//var laço= anos.length;
	var laço= meses.length;
	//var laço= trimestre.length;
	//var laço= dias.length;
	//console.log(laço);
	async function animacao(){
		for (var i = 0; i < laço; i++) {
			//anoSelecionado=anos[i];
			//trimestreSelecionado= trimestre[i];
			mesSelecionado= meses[i];
			//diaSelecionado= dias[i];
			await sleep(2000);
			if(i==(laço-1)){
				i=-1;
			}
			inicio(dataset);
		}
	}
	animacao();
});
