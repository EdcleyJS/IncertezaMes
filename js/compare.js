function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var total = sum(feature);
      var cor,peso; 
      if(featurename==feature.properties.name){
        return {
            weight: 3.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'yellow',
            fillOpacity: 0.9
          };
      }else if(total>=math.max(medias)){
        return {
            weight: 2.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'green',
            fillOpacity: 0.9
          };
      }else if(total<=math.min(medias)){
        return {
            weight: 2.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'orange',
            fillOpacity: 0.9
          };
      }return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'black',
            fillOpacity: 0.9

          };   
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var total = sum(feature);
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+probDA(total).toFixed(2));
        layer.on({
          dblclick: whenClicked,
          mouseover: highlightFeature,
          mouseout: resetHighlight,
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
          this._div.innerHTML = '<h5>Comparação com base na RMR.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }
      }
  };
  info.addTo(map);
}