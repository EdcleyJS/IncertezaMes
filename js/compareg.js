class distribuicaoIntervalo {
  constructor(feature,left,right) {
    this.feature=feature;
    this.left=left;
    this.right=right;
    this.cdfintervalo= function cdfintervalo(){
                var dist=[[Number(feature.properties.Janeiro)],[Number(feature.properties.Fevereiro)],[Number(feature.properties.Março)],[Number(feature.properties.Abril)],[Number(feature.properties.Maio)],[Number(feature.properties.Junho)],[Number(feature.properties.Julho)],[Number(feature.properties.Agosto)],[Number(feature.properties.Setembro)],[Number(feature.properties.Outubro)],[Number(feature.properties.Novembro)],[Number(feature.properties.Dezembro)]];
                dist= dist.sort(function(a, b){return a - b});
                var prob= (d3.bisectRight(dist, right) - d3.bisectLeft(dist, left))/dist.length;
                return prob;
              }
  }
}

function compare(dataset){
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }
  if(markers!= null){
    markers.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    { onEachFeature: function (feature, layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var probArea= new distribuicaoIntervalo(feature,left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
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
        markers.addLayer(marker);
      }
  });
  map.addLayer(markers);
  info.update = function (props) {
    if(featurename==undefined){
      this._div.innerHTML = '<h5>Levantamento com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
    }else{
      this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
    }
  };
  info.addTo(map);
}