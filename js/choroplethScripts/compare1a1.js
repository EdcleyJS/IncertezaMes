function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  var dist1,dist2;
  var feature1=dataset[0];
  var feature2=dataset[1];
  var prob= cmp(getDis(feature1.properties.name),getDis(feature2.properties.name));
  var prob2= cmp(getDis(feature2.properties.name),getDis(feature1.properties.name));
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
        if(feature.properties.name==dataset[0].properties.name){
          return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorN(prob),
              color: 'black',
              fillOpacity: 0.9
          };
        }else {
          return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorN(prob2),
              color: 'black',
              fillOpacity: 0.9
          };   
        }
      },onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        if(feature.properties.name==dataset[0].properties.name){
          layer.bindPopup("Probabilidade em "+feature.properties.name+": "+prob.toFixed(2));
        }else{
          layer.bindPopup("Probabilidade em "+feature.properties.name+": "+prob2.toFixed(2));
        }
        layer.on({
          dblclick: whenClicked,
          click: comparando
        });
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