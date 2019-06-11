/*var greenIcon = L.icon({
    iconUrl: 'https://pngimage.net/wp-content/uploads/2018/06/more-png-6.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [8, 15], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

*/
function setmarker(e){
  console.log("entrou");
  L.marker(e.latlng, {icon: greenIcon}).addTo(map);
}


function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
    medias=[];
  for (var i = 0; i < dataset.features.length; i++){
      medias.push(sum(dataset.features[i]));
      medias.sort(function(a, b){return a - b});
    }
  
  
  //console.log(dataset);
  //console.log(medias);
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var total = sum(feature);
      if(total>=math.max(medias)){
        return {
            weight: 2.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'green',
            fillOpacity: 0.9
          };
      }else if(total<=math.min(medias)){
        return {
            weight: 2.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'orange',
            fillOpacity: 0.9
          };
      }else{
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(probDA(total)),
            color: 'black',
            fillOpacity: 0.9
          };
      }
    },
      onEachFeature: function (feature, layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var total = sum(feature);
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+probDA(total).toFixed(2));
        /*console.log(layer.getBounds());
        L.marker(layer.getBounds().getCenter(), {icon: greenIcon}).addTo(map);*/
        layer.on({
          dblclick: whenClicked,
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          load: setmarker
        });
      }
  }).addTo(map);
  /*info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };*/

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
        this._div.innerHTML = '<h5>Comparação com base na RMR.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
      }
  };
  info.addTo(map);
}