function inicioRange(dataset){
  if(LayerRange!= null){
    LayerRange.clearLayers();
  }
  LayerRange =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
        var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
        if(opcoes.includes(feature.properties.name)){
          return {
            weight: 3.0,
            opacity: 1,
            fillColor: "#"+colorN(prob),
            dashArray: '3',
            color: 'blue',
            fillOpacity: 0.9
          };
        }else{
          return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorN(prob),
              color: 'black',
              fillOpacity: 0.9
            };
        }
      }
    ,onEachFeature: function (feature, layer) {
        var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
        var area= new distribuicaoTeste(getDis(feature.properties.name),alpha);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+": "+prob);
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerRange.resetStyle(e.target);
            this.closePopup();
        });
      }
    }).addTo(mapRange);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(mapRange);
}