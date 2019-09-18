$(document).ready(function () {
	//$('#vis').hide();
    //$('#footer').hide();
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
	$('.bs-stepper')[0].addEventListener('shown.bs-stepper', function (event) {
		if(event.detail.indexStep==3){
		  	opcoes=['Recife','Caruaru'];
    		Vis01TutorialFunction(dataset,false);
    		mapVis01.invalidateSize();
		}else if(event.detail.indexStep==5){
		  	opcoes=['Recife','Caruaru'];
    		Vis02TutorialFunction(dataset,true);
    		mapVis02.invalidateSize();
		}else if(event.detail.indexStep==7){
    		Vis03TutorialFunction(dataset);
    		mapVis03.invalidateSize();
		}else if(event.detail.indexStep==9){
    		Vis04TutorialFunction(dataset);
    		mapVis04.invalidateSize();
		}
	});


	$("#Vis01Tuto").ionRangeSlider({
		min: 0,
        max: 300,
        skin: "big",
        grid: true,
        onFinish: function (data) {
        	opcoes=['Recife','Caruaru'];
            alpha=data.from;
            Vis01TutorialFunction(dataset,false);
        }
	});
	$("#Vis02Tuto").ionRangeSlider({
		type: "double",
		min: 0,
        max: 300,
        from: 60,
        to: 100,
        drag_interval: true,
        skin: "big",
        grid: true,
        onFinish: function (data) {
        	opcoes=['Recife','Caruaru'];
            left=data.from;
            right=data.to;
            Vis02TutorialFunction(dataset,true);
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
            inicioRange(dataset);
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

   	var nv= $('#pills-tab > li');
   	var nvf=nv.slice(4,5);
	nv=nv.slice(0,4);
	shuffle(nv);

	$('#pills-tab').empty();
	nv.each(function(d,i){
	 	$('#pills-tab').append(nv[d]);
	});
	$('#pills-tab').append(nvf);
	$('#pills-tab >li >a')[0].click(); //classList.add('active');
	$('#pills-tab >li')[1].classList.add('disabled');
	$('#pills-tab >li')[2].classList.add('disabled');
	$('#pills-tab >li')[3].classList.add('disabled');
	$('#pills-tab >li')[4].classList.add('disabled');

    $("a[href='#pills-profile']").on('shown.bs.tab', function(e) {
	    mapRange.invalidateSize();
	    var id= $('#2Form > div.active > div > div > div > div> input')[0].id;
		id=id.substring(0, 3);
		var p=findP(perguntasT2,id);
		p=p.slice(2,p.length);
		opcoes=[];
		p.forEach(function(d,i){
		    opcoes.push(d);
		});
		inicioRange(dataset);
	});
	$("a[href='#pills-dotmap']").on('shown.bs.tab', function(e) {
	    mapDot.invalidateSize();
	    inicioDotMap(dataset);
	});
	$("a[href='#pills-media']").on('shown.bs.tab', function(e) {
	    mapMedia.invalidateSize();
	    var id= $('#4Form > div.active > div > div > div > div> input')[0].id;
		id=id.substring(0, 3);
		var p=findP(perguntasT2,id);
		p=p.slice(2,p.length);
		opcoes=[];
		p.forEach(function(d,i){
		    opcoes.push(d);
		});
		inicioMedia(dataset);
	});
	$("a[href='#pills-home']").on('shown.bs.tab', function(e) {
		map.invalidateSize();
	    var id= $('#Form > div.active > div > div > div > div> input')[0].id;
	    id=id.substring(0, 3);
	    var p=findP(perguntasT1,id);
	    p=p.slice(2,p.length);
	    opcoes=[];
	    p.forEach(function(d,i){
	    	opcoes.push(d);
	    });
	    inicio(dataset);
	});

	$('#pills-tab > li> a.active').ready(function(){
		if($('#Form').is(':visible')){
			map.invalidateSize();
			var id= $('Form > div.active > div > div > div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT1,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicio(dataset);
		}else if($('#2Form').is(':visible')){
			mapRange.invalidateSize();
			var id= $('#2Form > div.active > div > div > div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT2,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicioRange(dataset);
		}else if($('#4Form').is(':visible')){
			mapMedia.invalidateSize();
			var id= $('#4Form > div.active > div > div > div > div> input')[0].id;
		    id=id.substring(0, 3);
		    var p=findP(perguntasT2,id);
		    p=p.slice(2,p.length);
		    opcoes=[];
		    p.forEach(function(d,i){
		    	opcoes.push(d);
		    });
		    inicioMedia(dataset);
		}
	});
   $('#iniciar').click(function(){
    	$('#header').css('display','none');
    	//$("#vis").css("display", "");
    	$('#tutorial').css('display','');
    	//map.invalidateSize();
    	//$("#header").css("display", "none");
    });
   /*
    $(window).on('resize', function(){
      var win = $(this); //this = window
      $('#mapvis6').css('height',win.height());
	});
	$(window).on('load', function(){
      var win = $(this); //this = window
      $('#mapvis6').css('height',win.height());
	});*/

});
