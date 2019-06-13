function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  if(markers!= null){
    markers.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    { onEachFeature: function (feature, layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var total = sum(feature);
        if(probDA(total).toFixed(2)>=0.8){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon1});
        }else if(probDA(total).toFixed(2)>=0.6){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon2});
        }else if(probDA(total).toFixed(2)>=0.4){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon3});
        }else if(probDA(total).toFixed(2)>=0.2){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon4});
        }else{
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon5});
        }
        markers.addLayer(marker);
      }
  });
  map.addLayer(markers);
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