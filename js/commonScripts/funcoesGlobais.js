function distribuicaoAno(featurename){
  var distdataAno=[];
  var soma=0,soma1=0,soma2=0;
  if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado && d.Mês==mesSelecionado){
        var dias=diasToArray(d);
        dias.forEach(function(d,i){
                    distdataAno.push(d);
                  });
      }
    });
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
          distdataAno.push(d[diaSelecionado]);
      }
    });
  }else if(anoSelecionado!=null){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
          distdataAno.push(SomaDias(d));
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename) {
        if(d.Ano==2016){
          soma+=SomaDias(d);
        }else if (d.Ano==2017) {
          soma1+=SomaDias(d);
        }else{
          soma2+=SomaDias(d);
        }
      }
    });
    distdataAno.push(soma);
    distdataAno.push(soma1);
    distdataAno.push(soma2);
  }
  return distdataAno;
}
function SomaDias(d){
  var soma=0;
  if(d.Mês=='Abr'||d.Mês=='Jun'||d.Mês=='Set'||d.Mês=='Nov'){
    for (var i = 1; i < 31; i++) {
      soma=soma+Number(d[i]);
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      soma+=Number(d[i]);
    }
  }else{
    for (var i = 1; i < 32; i++) {
      soma=soma+Number(d[i]);
    }
  }
  return soma;
}
function distribuicaoTri(featurename){
  var distdataTrimestre=[];
  if(anoSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }
    });
    /*database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataTrimestre.push(SomaDias(d[diaSelecionado]));
      }
    });*/
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if(d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==2){
        if(d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==3){
        if(d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else{
        if(d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename){
          distdataTrimestre.push(SomaDias(d));
      }
    });
  }
  return distdataTrimestre;
}
function distribuicaoMes(featurename){
  var distdataMes=[];
  if(anoSelecionado!=undefined){
    if (mesSelecionado==undefined) {
      database.forEach(function(d,i){
        if (d.name==featurename && d.Ano==anoSelecionado){
            distdataMes.push(SomaDias(d));
        }
      });  
    }else{
      database.forEach(function(d,i){
        if (d.name==featurename && d.Mês==mesSelecionado && d.Ano==anoSelecionado){
            distdataMes.push(SomaDias(d));
        }
      });
    }
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataMes.push(SomaDias(d[diaSelecionado]));
      }
    });
  }else if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataMes.push(SomaDias(d));
      }
    });
  }else{

    database.forEach(function(d,i){
      if(d.name==featurename){
          var m= SomaDias(d);
          distdataMes.push(Number(m.toFixed(2)));
      }
    });
  }
  return distdataMes;
}
function diasToArray(d){
  var diasArray=[];
  if(d.Mês=='Abr'||d.Mês=='Jun'||d.Mês=='Set'||d.Mês=='Nov'){
    for (var i = 1; i < 31; i++) {
      diasArray.push(d[i]);
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      diasArray.push(d[i]);
    }
  }else{
    for (var i = 1; i < 32; i++) {
      diasArray.push(d[i]);
    }
  }
  return diasArray;
}
function distribuicaoDia(featurename){
  var distdataDia=[];
  if(anoSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1 && d.name==featurename){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==2 && d.name==featurename){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==3 && d.name==featurename){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename){
            if(diaSelecionado==31){
              if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

              }else{
                distdataDia.push(d[diaSelecionado]);
              }
            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }
        }
      }
    });
  }else if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename) {
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename) {
        diasToArray(d).forEach(function(d,i){
          distdataDia.push(d);
        });
      }
    });
  }
  return distdataDia;
}
function dotMapPrep(dist){
  var round=[];
  var uniqueArray;
  dist.forEach(function(d,i){
    round.push(Math.ceil(d/10)*10);
  });
  uniqueArray = round.filter(function(item, pos) {
      return round.indexOf(item) == pos;
  });
  var probs = {};
  //round.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
  round.forEach(function(x) {
    var num=(probs[x] || 0)+1; 
    num= num/dist.length;
    probs[x]=num;
  });
  uniqueArray.forEach(function(d,i){
    uniqueArray[i]=[d,probs[d]];
  });
  return uniqueArray;
}
function infoprops(props){
    if(featurename!=undefined){
      if(anoSelecionado!=undefined){
        if(mesSelecionado!=undefined){
          return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }
      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
        }else{
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+trimestreSelecionado+'ºs trimestres no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês no período.');
      }else{
          return '<h4> Informações com base em '+featurename+'.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }else{
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
        }else{
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+trimestreSelecionado+'ºs trimestres no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês no período.');
      }else{
          return '<h4> Informações com base em PE.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }
}
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1.5,
    color: 'black',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function resetHighlight(e) {
  GeoLayer.resetStyle(e.target);
}

function getDis(featurename){
  if(anoSelecionado!=undefined){
    var dist= distribuicaoAno(featurename);
  }else if(trimestreSelecionado!=undefined){
    var dist= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    var dist= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    var dist= distribuicaoDia(featurename);
  }else{
    var dist= distribuicaoMes(featurename);
  }
  return dist;
}

function getDis2(featurename){
  if(trimestreSelecionado!=undefined){
    var dist= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    var dist= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    var dist= distribuicaoDia(featurename);
  }else{
    var dist= distribuicaoMes(featurename);
  }
  return dist;
};

function legendonAdd(map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorN(grades[i])+'; background:'+colorN(grades[i])+'"></i>'+">"+grades[i]+'</br>';
  }
  return div;
};

function geraperguntas(perguntas,index,vis){
  var d1= document.createElement("div");
  var d2= document.createElement("div");
  d2.setAttribute('class','card');
  var pergunta= perguntas[index];
  var label = document.createElement("label");//label antes com a pergunta
  label.setAttribute('style',"font-weight:bold;");
  label.setAttribute('for',"pergunta1");
  label.setAttribute('id',"pergunta1");
  label.innerText= pergunta[0];//"Pergunta 1 ?";

  for (var i = 2; i < pergunta.length; i++) {
    var div1 = document.createElement("div");
    div1.setAttribute('class',"custom-control custom-radio custom-control-inline ");
    var input1= document.createElement("input");
    input1.setAttribute('type','hidden');
    input1.setAttribute('id','CLC'+pergunta[1]+vis);
    input1.setAttribute('name','CLC'+pergunta[1]+vis);
    input1.setAttribute('value','');

    var input2= document.createElement("input");
    input2.setAttribute('type','hidden');
    input2.setAttribute('id','TMP'+pergunta[1]+vis);
    input2.setAttribute('name','TMP'+pergunta[1]+vis);
    input2.setAttribute('value','');

    var label2 = document.createElement("label");
    label2.setAttribute('for','CNFC'+pergunta[1]+vis);
    label2.setAttribute('style',"font-weight:bold;");
    label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

    var input3= document.createElement("input");
    input3.setAttribute('type','text');
    input3.setAttribute('class','ioRangerSlider');
    input3.setAttribute('id','CNFC'+pergunta[1]+vis);
    input3.setAttribute('name','CNFC'+pergunta[1]+vis);
    input3.setAttribute('value','');
    input3.required=true;

    var radio1 = document.createElement("input"); //input element, text
    if(i==2){
      radio1.required = true;
    }
    radio1.setAttribute('type',"radio");
    radio1.setAttribute('class',"custom-control-input form-check-input form-control");
    radio1.setAttribute('name',"pergunta"+pergunta[1]+vis);
    radio1.setAttribute('id',""+pergunta[1]+pergunta[i]+vis);
    radio1.setAttribute('value',pergunta[i]);
    var label1 = document.createElement("label");
    label1.setAttribute('class',"custom-control-label form-check-label");
    label1.setAttribute('for',""+pergunta[1]+pergunta[i]+vis);
    label1.setAttribute('style',"font-weight:bold;");
    label1.innerText=pergunta[i];

    div1.appendChild(radio1);
    div1.appendChild(label1);
    if(i==pergunta.length-1){
      var input4= document.createElement("div");
      var input7= document.createElement("br");
      var input6= document.createElement("p");
      input4.setAttribute('class','invalid-feedback');
      input6.innerText='Você precisa escolher um.';
      input4.appendChild(input7);
      input4.appendChild(input6);
      div1.appendChild(input4);
    }
    d2.appendChild(label);
    d1.appendChild(div1);
    d2.appendChild(d1);
  }

  d2.appendChild(label2);
  d2.appendChild(input3);
  var input5= document.createElement("div");
  input5.setAttribute('class','invalid-feedback');
  input5.innerText='Você precisa escolher um';
  d2.appendChild(input5);
  d2.appendChild(input1);
  d2.appendChild(input2);
  return d2;

}

function recaptcha_callback(){
  $('#feedback').val($('#feedback2').val());
  $('#vis').css('display','none');
  $('#footer').css('display','');
  $('#Form').submit();
  $('#2Form').submit();
  $('#3Form').submit();
  $('#4Form').submit();
  $('#5Form').submit();
  //$('#captchaError').hide();
}