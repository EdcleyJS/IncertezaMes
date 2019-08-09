function inicio(dataset){
  addressPoints=[];
  if(heat!= null){
    map.removeLayer(heat);
  }
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  dim= map.getBounds();
  Le = dim.getEast();
  Oe= dim.getWest();
  No= dim.getNorth();
  Su=dim.getSouth();
  zoom= map.getZoom();

  GeoLayer =L.geoJson(dataset,{
    onEachFeature: function (feature, layer) {
      cidades.push(feature.properties.name);
      //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
      var probArea= new distribuicaoIntervalo(feature,left,right);
      var area= (turf.area(feature.geometry)/1000000);
      to= layer.getBounds()._southWest.lat;
      fro= layer.getBounds()._northEast.lat;
      to2= layer.getBounds()._southWest.lng;
      fro2= layer.getBounds()._northEast.lng;
      lat=layer.getBounds().getCenter().lat;
      lng=layer.getBounds().getCenter().lng;
      intensity= (probArea.cdfintervalo().toFixed(2)*5);
      if(area<0){
        area= (area*-1);
      }
      if(zoom>=9){
        area=area*5;
      }else{
        area=area*3;
      }
      var nump= (probArea.cdfintervalo().toFixed(2)*area);
        if(No>=fro && Le>=fro2 && Su<=to && Oe<=to2){
          for (var i = 0; i < nump; i++) {
            if(zoom>=9){
              addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),1.9]);
            }else{
              addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),2.9]);
            }
          }
        }
    }
  });
  addressPoints = addressPoints.map(function (p) { return [p[0], p[1], p[2]]; });
  heat = L.heatLayer(addressPoints,{maxZoom:18,radius:15}).addTo(map);

  info.update = function (props) {
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Levantamento com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }
  };
  info.addTo(map);
}