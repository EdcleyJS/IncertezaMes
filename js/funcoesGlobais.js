  //console.log(distribuitionMes);
  //distribuition.sort(function(a, b){return a - b});
  //var auxiliar= new distribuicaoTeste(distribuitionMes,90);
  //console.log(auxiliar.cdf().toFixed(2));
function distribuicaoAno(featurename){
  //tipo de visualização
  var distdataAno=[];
  var soma=0,soma1=0,soma2=0;
  //console.log(database);

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
      soma+=d[i];
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      soma+=d[i];
    }
  }else{
    for (var i = 1; i < 32; i++) {
      soma+=d[i];
    }
  }
  return soma;
}

function distribuicaoTri(featurename){
  //tipo de visualização
  var distdataTrimestre=[];
  /*console.log(database);
    database.forEach(function(d,i){
      if (d.name==featurename){
          distdataMes.push(SomaDias(d));
      }
    });*/
  if(anoSelecionado!=undefined){
    console.log("ano selecionado");
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
  //tipo de visualização
  var distdataMes=[];
  /*console.log(database);
    database.forEach(function(d,i){
      if (d.name==featurename){
          distdataMes.push(SomaDias(d));
      }
    });*/
  if(anoSelecionado!=undefined){
    //console.log("ano selecionado");
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado && d.Ano==anoSelecionado){
          distdataMes.push(SomaDias(d));
      }
    });
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
    //console.log(database);
    database.forEach(function(d,i){
      if(d.name==featurename){
          distdataMes.push(SomaDias(d));
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
  //tipo de visualização
  var distdataDia=[];
  //console.log(database);
  /*database.forEach(function(d,i){
    if (d.name==featurename) {
      diasToArray(d).forEach(function(d,i){
        distdataDia.push(d);
      });
    }
  });*/

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