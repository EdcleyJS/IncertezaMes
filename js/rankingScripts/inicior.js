function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  var distMax=[];
  var distMin=[];
  L.geoJson(dataset,{onEachFeature: function(feature,layer){
      var dist= getDis(feature.properties.name);
      dist.forEach(function(d,i){
        dist[i]=(Math.ceil(d/10)*10);
      });
      if(distMax.length==0){
        dist.forEach(function(d,i){
          distMax.push(Math.ceil(dist[i]/10)*10);
        });
      }else{
        distMax.forEach(function(d,i){
          var n= Math.ceil(dist[i]/10)*10;
          if(distMax[i]<n){
            distMax[i]=n;
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
      var prob= cmpM(distMax,dist);
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
          dist[i]=(Math.ceil(d/10)*10).toFixed(2);
        });
        var prob= cmpM(distMax,dist);
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
        var prob= cmpM(distMax,dist);
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