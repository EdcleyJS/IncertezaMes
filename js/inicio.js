class distribuicao {
  constructor(feature,alpha) {
    this.feature=feature;
    this.alpha=alpha;
    this.cdf= function cdf(){
                var dist=[[Number(feature.properties.Janeiro)],[Number(feature.properties.Fevereiro)],[Number(feature.properties.Março)],[Number(feature.properties.Abril)],[Number(feature.properties.Maio)],[Number(feature.properties.Junho)],[Number(feature.properties.Julho)],[Number(feature.properties.Agosto)],[Number(feature.properties.Setembro)],[Number(feature.properties.Outubro)],[Number(feature.properties.Novembro)],[Number(feature.properties.Dezembro)]];
                dist= dist.sort(function(a, b){return a - b});
                var prob= d3.bisectRight(dist, alpha)/dist.length;
                return prob;
              }
  }
}

function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var area= new distribuicao(feature,alpha);
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(area.cdf()),
            color: 'black',
            fillOpacity: 0.9
          };
    },
      onEachFeature: function (feature, layer) {
        var area= new distribuicao(feature,alpha);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+area.cdf().toFixed(2));
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            resetHighlight(e);
            this.closePopup();
        });
      }
  }).addTo(map);
  
  info.update = function (props) {
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Levantamento com Base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }
  };
  info.addTo(map);
}