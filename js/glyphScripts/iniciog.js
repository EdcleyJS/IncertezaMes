function inicio(dados){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    legend.remove();
  }
  if(markers!= null){
    markers.clearLayers();
  }
  // criação da div que contém a legenda do Mapa.
/*
  legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      for (var i = (grades.length-1); i >=0 ; i--) {
          div.innerHTML +='<i style="color:'+colorN(grades[i])+'; background:'+colorN(grades[i])+'"></i>'+">"+grades[i]+'</br>';
        }
      return div;
    };
  legend.addTo(map);*/
  var markersArray=[];
  GeoLayer= L.geoJson(dados,
    {onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          var media= Number(probArea.media().toFixed(2));
          var desvio= Number(probArea.desvio());
          if(media>=200){
            if(desvio>=100){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon22});
            }else if(desvio>=50){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon21});
            }else{
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon20});
            }
          }else if(media>=150){
            if(desvio>=100){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon12});
            }else if(desvio>=50){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon11});
            }else{
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon10});
            }
          }else if(media>=100){
            if(desvio>=100){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon02});
            }else if(desvio>=50){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon01});
            }else{
              marker=L.marker(layer.getBounds().getCenter(), {icon: Icon00});
            }
          }else if(media>=50){
            if(desvio>=100){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Iconn12});
            }else if(desvio>=50){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Iconn11});
            }else{
              marker=L.marker(layer.getBounds().getCenter(), {icon: Iconn10});
            }
          }else{
            if(desvio>=100){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Iconn22});
            }else if(desvio>=50){
              marker=L.marker(layer.getBounds().getCenter(), {icon: Iconn21});
            }else{
              marker=L.marker(layer.getBounds().getCenter(), {icon: Iconn20});
            }
          }
          markers.addLayer(marker);
        }
    });
  markers.addTo(map);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}