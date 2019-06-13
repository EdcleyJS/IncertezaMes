function compare(dataset){
  addressPoints=[];
  if(heat!= null){
    map.removeLayer(heat);
  }
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var total = sum(feature);
        var area= (turf.area(feature.geometry)/1000000);
        to= layer.getBounds()._southWest.lat;
        fro= layer.getBounds()._northEast.lat;
        to2= layer.getBounds()._southWest.lng;
        fro2= layer.getBounds()._northEast.lng;
        lat=layer.getBounds().getCenter().lat;
        lng=layer.getBounds().getCenter().lng;
        intensity= (probDA(total).toFixed(2)*5);
        if(area<0){
          area= (area*-1);
        }
        area=area*5;
        var nump= (probDA(total).toFixed(2)*area);
        for (var i = 0; i < nump; i++) {
          addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),3.9]);
        }
      }
  });
  addressPoints = addressPoints.map(function (p) { return [p[0], p[1], p[2]]; });
  heat = L.heatLayer(addressPoints,{radius:15}).addTo(map);
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