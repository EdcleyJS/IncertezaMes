function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var area= cmp(getDis(featurename),getDis(feature.properties.name));
      if(featurename==feature.properties.name){
        return {
            weight: 3.5,
            opacity: 1,
            fillColor: "white",
            color: 'yellow',
            fillOpacity: 1.0
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
      var area= cmp(getDis(featurename),getDis(feature.properties.name));
      layer.bindPopup("Probabilidade em "+feature.properties.name+": "+area.toFixed(2));
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
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}