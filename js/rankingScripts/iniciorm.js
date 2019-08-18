function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  var distMin=[];
  L.geoJson(dataset,{onEachFeature: function(feature,layer){
      var dist= getDis(feature.properties.name);
      dist.forEach(function(d,i){
        dist[i]=(Math.ceil(d/10)*10);
      });
      if(distMin.length==0){
        dist.forEach(function(d,i){
          distMin.push(Math.ceil(dist[i]/10)*10);
        });
      }else{
        distMin.forEach(function(d,i){
          var n= Math.ceil(dist[i]/10)*10;
          if(distMin[i]>n){
            distMin[i]=n;
          }
        });
      }
    }
  });
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var dist= getDis(feature.properties.name);
      dist.forEach(function(d,i){
        dist[i]=(Math.ceil(d/10)*10);
      });
      var prob= cmpM(distMin,dist);
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(prob),
            color: 'black',
            fillOpacity: 0.9
          };
    },
      onEachFeature: function (feature, layer) {
        var str = ""+window.location.href;
        var dist= getDis(feature.properties.name);
        dist.forEach(function(d,i){
          dist[i]=(Math.ceil(d/10)*10);
        });
        var prob= cmpM(distMin,dist);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+": "+prob);
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            resetHighlight(e);
            this.closePopup();
        });
      },
      filter: function(feature){
      var dist= getDis(feature.properties.name);
        dist.forEach(function(d,i){
          dist[i]=(Math.ceil(d/10)*10);
        });
        var prob= cmpM(distMin,dist);
        var cor=colorN(prob);
        if(cor!=false){
          return true;
        }
      }
  }).addTo(map);
  info.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}