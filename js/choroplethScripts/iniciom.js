function inicioMedia(dados){
  var maximo=0;
  if(LayerMedia!= null){
    LayerMedia.clearLayers();
  }
  LayerMedia= L.geoJson(dados,{
    style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      if(mesmedia!=undefined){
            var distdataMes=[];
            database.forEach(function(d,i){
              if (d.name==feature.properties.name && d.Mês==mesmedia){
                  distdataMes.push(SomaDias(d));
              }
            });
            var probArea= new distribuicaoTeste(distdataMes,0);
      }else{
        var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
      }
      var media= probArea.media().toFixed(2);
      if(opcoes.includes(feature.properties.name)){
        return {
          weight: 3.0,
          opacity: 1,
          fillColor: colorM(media),
          dashArray: '3',
          color: 'blue',
          fillOpacity: 0.9
        };
      }else{      
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorM(media),
            color: 'black',
            fillOpacity: 0.9
        };
      }
    },
      onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(mesmedia!=undefined){
            var distdataMes=[];
            database.forEach(function(d,i){
              if (d.name==feature.properties.name && d.Mês==mesmedia){
                  distdataMes.push(SomaDias(d));
              }
            });
            var probArea= new distribuicaoTeste(distdataMes,0);
          }else{
            var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          }
          var media= probArea.media().toFixed(2);
          layer.bindPopup(""+feature.properties.name+": "+media+" mm.");
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              LayerMedia.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(mapMedia);
  if(mesmedia!=undefined){
    infoMedia.update = function (props) {
      this._div.innerHTML= '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o mês de '+mesmedia+' no período.');
    };
  }else{
    infoMedia.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoMedia.addTo(mapMedia);
}