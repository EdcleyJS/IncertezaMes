function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    pontos.clearLayers();
  }
  /*if(markers!= null){
    markers.clearLayers();
  }*/
  var dots = [];
  GeoLayer =L.geoJson(dataset,
    {onEachFeature: function (feature, layer) {
        cidades.push(feature.properties.name);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var novaDist= dotMapPrep(getDis(feature.properties.name));  
        /*if(prob>=0.86){
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
        var zoom= map.getZoom();
        if(area<0){
          area= (area*-1);
        }
        novaDist.forEach(function(d,i){
          var nump= area*d[1];
          var cont=0;
          var cor= '#'+colorN(d[1]);
          for (var i=0; i < nump; i++) {
            var p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
              var markerCircle=L.circleMarker(p, {radius: 4, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer});
              markerCircle.bindPopup(" "+d[0]+" mm");
              dots.push(markerCircle);
            }
          }
        });
  }});
  pontos = L.layerGroup(dots);
  pontos.addTo(map);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}