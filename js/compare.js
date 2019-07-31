class distribuicaoIntervalo {
  constructor(feature,left,right) {
    this.feature=feature;
    this.left=left;
    this.right=right;
    this.cdfintervalo= function cdfintervalo(){
                var dist=[[Number(feature.properties.Janeiro)],[Number(feature.properties.Fevereiro)],[Number(feature.properties.Março)],[Number(feature.properties.Abril)],[Number(feature.properties.Maio)],[Number(feature.properties.Junho)],[Number(feature.properties.Julho)],[Number(feature.properties.Agosto)],[Number(feature.properties.Setembro)],[Number(feature.properties.Outubro)],[Number(feature.properties.Novembro)],[Number(feature.properties.Dezembro)]];
                dist= dist.sort(function(a, b){return a - b});
                //console.log(dist);
                //console.log(""+right+" - "+left);
                //console.log(d3.bisectRight(dist, right));
                //console.log(d3.bisectRight(dist, left));
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
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var area= new distribuicaoIntervalo(feature,left,right);
      //console.log(area.cdfintervalo());
      if(featurename==feature.properties.name){
        return {
            weight: 3.5,
            opacity: 1,
            fillColor: "#"+colorN(area.cdfintervalo().toFixed(2)),
            color: 'yellow',
            fillOpacity: 0.9
        };
      }else {
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(area.cdfintervalo().toFixed(2)),
            color: 'black',
            fillOpacity: 0.9
        };   
      }

      },onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var area= new distribuicaoIntervalo(feature,left,right);
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
      if(filterbymouth!=undefined && filterbymouth!='off'){
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Comparação Probabilidade de Chuva.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }
      }else if (filterbytri!=undefined && filterbytri!='off') {
        if (featurename==undefined) {
          this._div.innerHTML = '<h5>Comparação Probabilidade de Chuva.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva no '+filterbytri+'º trimestre/2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva no '+filterbytri+'º trimestre/2018.');
        }
      }else{
        if (featurename!=undefined) {
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Levantamento com base na RMR.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }
      }
  };
  info.addTo(map);
}