function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  var distMin=[];
  L.geoJson(dataset,{onEachFeature: function(feature,layer){
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
      var probArea= new distribuicaoTeste(dist,0);
      var media= Number(probArea.media().toFixed(2));
      if(distMin.length==0){
        distMin=dist;
        distMin.forEach(function(d,i){
          distMin[i]=(Math.ceil(d/10)*10);
        });
      }else{
        distMin.forEach(function(d,i){
          if(d>(Math.ceil(dist[i]/10)*10)){
            distMin[i]=(Math.ceil(dist[i]/10)*10);
          }
        });
      }
    }
  });
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
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
      dist.forEach(function(d,i){
        dist[i]=(Math.ceil(d/10)*10);
      });
      var prob= cmpM(distMin,dist);
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
        dist.forEach(function(d,i){
          dist[i]=(Math.ceil(d/10)*10);
        });
        var prob= cmpM(distMin,dist);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+prob);
        if(str.includes("choroplethCompare.html")){
          layer.on({
            dblclick: whenClicked
          });
        }
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            resetHighlight(e);
            this.closePopup();
        });
      }
  }).addTo(map);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}