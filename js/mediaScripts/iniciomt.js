function inicio(dados){
  var maximo=0;
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    GeoLayer2.clearLayers();
    GeoLayer3.clearLayers();
  }
  GeoLayer= L.geoJson(dados,
    {style: function(feature){
      anoSelecionado=2016;
      var probArea= new distribuicaoTeste(getDis2(feature.properties.name),0);
      var media= probArea.media().toFixed(2);
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN(media),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          var probArea= new distribuicaoTeste(getDis2(feature.properties.name),0);
          var media= probArea.media().toFixed(2);
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          layer.bindPopup(""+feature.properties.name+": "+media+" mm.");
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
    GeoLayer2= L.geoJson(dados,
    {style: function(feature){
      anoSelecionado=2017;
      var probArea= new distribuicaoTeste(getDis2(feature.properties.name),0);
      var media= probArea.media().toFixed(2);
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN(media),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          var probArea= new distribuicaoTeste(getDis2(feature.properties.name),0);
          var media= probArea.media().toFixed(2);
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          layer.bindPopup(""+feature.properties.name+": "+media+" mm.");
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
  GeoLayer3= L.geoJson(dados,
    {style: function(feature){
      anoSelecionado=2018;
      var probArea= new distribuicaoTeste(getDis2(feature.properties.name),0);
      var media= probArea.media().toFixed(2);
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN(media),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          var probArea= new distribuicaoTeste(getDis2(feature.properties.name),0);
          var media= probArea.media().toFixed(2);
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          layer.bindPopup(""+feature.properties.name+": "+media+" mm.");
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