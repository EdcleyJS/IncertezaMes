function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  var dist1,dist2;
  if(anoSelecionado!=undefined){
    dist1= distribuicaoAno(featurename);
  }else if(trimestreSelecionado!=undefined){
    console.log("entrou");
    dist1= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    dist1= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    dist1= distribuicaoDia(featurename);
  }else{
    dist1= distribuicaoMes(featurename);
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      if(anoSelecionado!=undefined){
        dist2= distribuicaoAno(feature.properties.name);
      }else if(trimestreSelecionado!=undefined){
        //console.log("entrou");
        dist2= distribuicaoTri(feature.properties.name);
      }else if(mesSelecionado!=undefined){
        dist2= distribuicaoMes(feature.properties.name);
      }else if(diaSelecionado!=undefined){
        dist2= distribuicaoDia(feature.properties.name);
      }else{
        dist2= distribuicaoMes(feature.properties.name);
      }
      //console.log(dist2);
      //console.log(dist1);
      var area= cmp(dist1,dist2);
      //= new distribuicaoIntervalo(feature,left,right);
      //console.log(area.cdfintervalo());
      if(featurename==feature.properties.name){
        return {
            weight: 3.5,
            opacity: 1,
            fillColor: "#"+colorN(area.toFixed(2)),
            color: 'yellow',
            fillOpacity: 0.9
        };
      }else {
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(area.toFixed(2)),
            color: 'black',
            fillOpacity: 0.9
        };   
      }

      },onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        //var area= new distribuicaoIntervalo(feature,left,right);
        if(anoSelecionado!=undefined){
          dist2= distribuicaoAno(feature.properties.name);
        }else if(trimestreSelecionado!=undefined){
          //console.log("entrou");
          dist2= distribuicaoTri(feature.properties.name);
        }else if(mesSelecionado!=undefined){
          dist2= distribuicaoMes(feature.properties.name);
        }else if(diaSelecionado!=undefined){
          dist2= distribuicaoDia(feature.properties.name);
        }else{
          dist2= distribuicaoMes(feature.properties.name);
        }
        var area= cmp(dist1,dist2);
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+area.toFixed(2));
        layer.on({
          dblclick: whenClicked
        });
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
      if(filterbymouth!=undefined && filterbymouth!='off'){
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Comparação Probabilidade de Chuva.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }
      }else if (filterbytri!=undefined && filterbytri!='off') {
        if (featurename==undefined) {
          this._div.innerHTML = '<h5>Comparação Probabilidade de Chuva.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva no '+filterbytri+'º trimestre/2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva no '+filterbytri+'º trimestre/2018.');
        }
      }else{
        if (featurename!=undefined) {
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Levantamento com base na RMR.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }
      }
  };
  info.addTo(map);
}