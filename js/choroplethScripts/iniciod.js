function inicioDotMap(dataset){
  if(LayerDotMap!= null){
    LayerDotMap.clearLayers();
    pontos2.clearLayers();
  }
  var dots = [];
  LayerDotMap =L.geoJson(dataset,
    {onEachFeature: function (feature, layer) {
        //cidades.push(feature.properties.name);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var novaDist= dotMapPrep(getDis(feature.properties.name));  
        var bounds = layer.getBounds();
        var width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        var height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        var area= (turf.area(feature.geometry)/10000000);      
        area= area/2;
        var zoom= mapDot.getZoom();
        if(area<0){
          area= (area*-1);
        }
        novaDist.forEach(function(d,i){
          var nump= area*d[1];
          var cont=0;
          var cor= colorD(d[0]);
          for (var i=0; i < nump; i++) {
            var p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {

              var markerCircle=L.circleMarker(p, {radius: 4, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer});
              markerCircle.bindPopup(" "+d[0]);
              dots.push(markerCircle);
            }
          }
        });
  }});
  pontos2 = L.layerGroup(dots);
  pontos2.addTo(mapDot);
  infoDot.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoDot.addTo(mapDot);
}