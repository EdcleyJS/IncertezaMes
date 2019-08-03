function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      if(anoSelecionado!=undefined){
        var dist= distribuicaoAno(feature.properties.name);
      }else if(trimestreSelecionado!=undefined){
        console.log("entrou");
        var dist= distribuicaoTri(feature.properties.name);
      }else if(mesSelecionado!=undefined){
        var dist= distribuicaoMes(feature.properties.name);
      }else if(diaSelecionado!=undefined){
        var dist= distribuicaoDia(feature.properties.name);
      }else{
        var dist= distribuicaoMes(feature.properties.name);
      }
      if(feature.properties.name=='Recife'){
              //console.log(dist);
      }

      var area= new distribuicaoTeste(dist,alpha);
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(area.cdf()),
            color: 'black',
            fillOpacity: 0.9
          };
    },
      onEachFeature: function (feature, layer) {
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
        if(feature.properties.name=='Recife'){
                //console.log(dist);
        }
        
        var area= new distribuicaoTeste(dist,alpha);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+area.cdf().toFixed(2));
        /*layer.on({
          dblclick: whenClicked
        });*/
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
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Levantamento com Base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }
  };
  info.addTo(map);
}