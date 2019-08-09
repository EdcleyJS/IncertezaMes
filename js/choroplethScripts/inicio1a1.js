function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  if(selecionados.length==2){
    var newdata=[];
    selecionados.forEach(function(d,i){
      newdata.push(d.target.feature);
    });
    compare(newdata);
  }else{
    GeoLayer =L.geoJson(dataset,
      {style: function(feature){
        //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
        var str = ""+window.location.href;
        if(anoSelecionado!=undefined){
          var dist= distribuicaoAno(feature.properties.name);
        }else if(trimestreSelecionado!=undefined){
          var dist= distribuicaoTri(feature.properties.name);
        }else if(mesSelecionado!=undefined){
          var dist= distribuicaoMes(feature.properties.name);
        }else if(diaSelecionado!=undefined){
          var dist= distribuicaoDia(feature.properties.name);
        }else{
          var dist= distribuicaoMes(feature.properties.name);
        }
        if(str.includes("choroplethIntervalo.html")){interOn=true;}
        if(interOn==true){
          var probArea= new distribuicaoIntervalo(dist,left,right);
          var prob= probArea.cdfintervalo().toFixed(2);
        }else{
          var sdr = document.getElementById("example_id");
          if(typeof(sdr) != 'undefined' && sdr != null){
            var probArea= new distribuicaoTeste(dist,alpha);
            var prob= probArea.cdf().toFixed(2);
          }else{
            var probArea= new distribuicaoTeste(dist,alpha);
            var prob= probArea.cdf().toFixed(2);
          }
        }
          return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorN(prob),
              color: 'black',
              fillOpacity: 0.9
            };
      },
        onEachFeature: function (feature, layer) {
          var str = ""+window.location.href;
          if(anoSelecionado!=undefined){
            var dist= distribuicaoAno(feature.properties.name);
          }else if(trimestreSelecionado!=undefined){
            var dist= distribuicaoTri(feature.properties.name);
          }else if(mesSelecionado!=undefined){
            var dist= distribuicaoMes(feature.properties.name);
          }else if(diaSelecionado!=undefined){
            var dist= distribuicaoDia(feature.properties.name);
          }else{
            var dist= distribuicaoMes(feature.properties.name);
          }
          if(str.includes("choroplethIntervalo.html")){interOn=true;}
          if(interOn==true){
            var probArea= new distribuicaoIntervalo(dist,left,right);
            var prob= probArea.cdfintervalo().toFixed(2);
          }else{
            var sdr = document.getElementById("example_id");
            if(typeof(sdr) != 'undefined' && sdr != null){
              var probArea= new distribuicaoTeste(dist,alpha);
              var prob= probArea.cdf().toFixed(2);
            }else{
              var probArea= new distribuicaoIntervalo(dist,left,right);
              var prob= probArea.cdfintervalo().toFixed(2);
            }
          }
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          layer.bindPopup("Probabilidade em "+feature.properties.name+": "+prob);
          if(str.includes("choropleth1a1.html")){
            layer.on({
              dblclick: whenClicked,
              click: comparando
            });
          }
          layer.on('mouseover', function (e) {
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
        }
    }).addTo(map);
    info.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  info.addTo(map);
  }
}