function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
      pontos.clearLayers();
  }
  /*if(markers!= null){
    markers.clearLayers();
  }*/
  var dist1,dist2;
  if(anoSelecionado!=undefined){
    dist1= distribuicaoAno(featurename);
  }else if(trimestreSelecionado!=undefined){
    dist1= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    dist1= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    dist1= distribuicaoDia(featurename);
  }else{
    dist1= distribuicaoMes(featurename);
  }
  var dots = [];
  GeoLayer =L.geoJson(dataset,
    { onEachFeature: function (feature, layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        if(anoSelecionado!=undefined){
          dist2= distribuicaoAno(feature.properties.name);
        }else if(trimestreSelecionado!=undefined){
          dist2= distribuicaoTri(feature.properties.name);
        }else if(mesSelecionado!=undefined){
          dist2= distribuicaoMes(feature.properties.name);
        }else if(diaSelecionado!=undefined){
          dist2= distribuicaoDia(feature.properties.name);
        }else{
          dist2= distribuicaoMes(feature.properties.name);
        }
        var prob= cmp(dist1,dist2).toFixed(2);
        /*
        if(prob>=0.86){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon1});
        }else if(prob>=0.7){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon2});
        }else if(prob>=0.56){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon3});
        }else if(prob>=0.42){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon4});
        }else if(prob>=0.28){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon5});
        }else if(prob>=0.14){
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon6});
        }else{
          marker=L.marker(layer.getBounds().getCenter(), {icon: Icon7});
        }
        markers.addLayer(marker);*/
        var bounds = layer.getBounds();
        var width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        var height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        var area= (turf.area(feature.geometry)/10000000);
        area= area/2;
        var intensity= (prob*5);
        var zoom= map.getZoom();
        if(area<0){
          area= (area*-1);
        }
        var nump= area;
        var cont=0;
        var cor= '#'+colorN(prob);
        for (var i=0; i < nump; i++) {
          var p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
          if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
            dots.push(L.circleMarker(p, {radius: 3, weight: 3, color: cor,renderer: myRenderer}));
          }
        }
      }
  });
  pontos = L.layerGroup(dots);
  pontos.addTo(map);
  //map.addLayer(markers);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}