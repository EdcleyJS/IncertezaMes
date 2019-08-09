function inicio(dados){
  var maximo=0;
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  GeoLayer= L.geoJson(dados,
    {style: function(feature){
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
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var probArea= new distribuicaoTeste(dist,0);
      var media= probArea.media().toFixed(2);
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN(media),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
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
          var probArea= new distribuicaoTeste(dist,0);
          var media= probArea.media().toFixed(2);
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
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}