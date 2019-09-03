function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  if(selecionados.length==2){
    var newdata=[];
    selecionados.forEach(function(d,i){
      newdata.push(d.target.feature);
    });
    compare(newdata);
  }else{
    GeoLayer =L.geoJson(dataset,
      {style: function(feature){
        //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
          return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#e9e9e9",
              color: 'black',
              fillOpacity: 0.6
            };
      },
        onEachFeature: function (feature, layer) {
          var str = ""+window.location.href;
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          layer.bindPopup(feature.properties.name);
          if(str.includes("choropleth1a1.html")){
            layer.on({
              click: comparando
            });
          }
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
}