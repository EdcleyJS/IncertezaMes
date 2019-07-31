class distribuicao {
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

function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      var area= new distribuicao(feature,left,right);
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(area.cdfintervalo()),
            color: 'black',
            fillOpacity: 0.9
          };
    },
      onEachFeature: function (feature, layer) {
        var area= new distribuicao(feature,left,right);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+area.cdfintervalo().toFixed(2));
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
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }
  };
  info.addTo(map);
}