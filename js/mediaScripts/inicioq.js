function inicio(dados){
  var maximo=0;
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    GeoLayer2.clearLayers();
    GeoLayer3.clearLayers();
  }
  GeoLayer3= L.geoJson(dados,
    {style: function(feature){
      //console.log('3');
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN2(probArea.quartil()[3]),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          layer.bindPopup(""+feature.properties.name+": "+(Math.floor((probArea.quartil()[2])* 100)/100));
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              GeoLayer3.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(map3);

  GeoLayer= L.geoJson(dados,
    {style: function(feature){
      var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN2(probArea.quartil()[0]),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          layer.bindPopup(""+feature.properties.name+": "+(Math.floor((probArea.quartil()[2])* 100)/100));
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

  GeoLayer2= L.geoJson(dados,{
    style: function(feature){
      var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN2(probArea.quartil()[2]),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          layer.bindPopup(""+feature.properties.name+": "+(Math.floor((probArea.quartil()[2])* 100)/100));
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              GeoLayer2.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(map2);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
  info2.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info2.addTo(map2);
  info3.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info3.addTo(map3);
}