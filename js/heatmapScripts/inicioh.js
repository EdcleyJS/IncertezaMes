function inicio(dataset){
  addressPoints=[];
  if(heat!= null){
    map.removeLayer(heat);
  }
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  dim= map.getBounds();
  Le = dim.getEast();
  Oe= dim.getWest();
  No= dim.getNorth();
  Su=dim.getSouth();
  zoom= map.getZoom();
  GeoLayer =L.geoJson(dataset,{
    onEachFeature: function (feature, layer) {
      var str = ""+window.location.href;
      cidades.push(feature.properties.name);
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
      if(str.includes("heatmapIntervalo.html")){interOn=true;}
      if(interOn==true){
        var probArea= new distribuicaoIntervalo(dist,left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
      }else{
        var sdr = document.getElementById("example_id");
        if(typeof(sdr) != 'undefined' && sdr != null){
          var probArea= new distribuicaoTeste(dist,alpha);
          var prob= probArea.cdf().toFixed(2);
        }else{
          var probArea= new distribuicaoTeste(dist,alpha);
          var prob= probArea.cdf().toFixed(2);
        }
      }
      var area= (turf.area(feature.geometry)/10000000);
      to= layer.getBounds()._southWest.lat;
      fro= layer.getBounds()._northEast.lat;
      to2= layer.getBounds()._southWest.lng;
      fro2= layer.getBounds()._northEast.lng;
      lat=layer.getBounds().getCenter().lat;
      lng=layer.getBounds().getCenter().lng;
      //area=area/2;
      intensity= (10);
      var bounds = layer.getBounds();
      var width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
      var height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
      if(zoom>=9){
        area=area*5;
      }else{
        area=area*3;
      }
      //area= area/2;
      var nump= (prob*area);
      for (var i = 0; i < nump; i++) {
        if(zoom>=9){
          addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),1.9]);
        }else{
          addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),intensity]);
        }
      }
    }
  });
  addressPoints = addressPoints.map(function (p) { return [p[0], p[1], p[2]]; });
  heat = L.heatLayer(addressPoints,{maxZoom:18,radius:25}).addTo(map);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}