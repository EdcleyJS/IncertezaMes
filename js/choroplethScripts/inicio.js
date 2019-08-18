function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var str = ""+window.location.href;
      if(str.includes("choroplethIntervalo.html")){interOn=true;}
      if(interOn==true){
        var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
      }else{
        var sdr = document.getElementById("example_id");
        if(typeof(sdr) != 'undefined' && sdr != null){
          var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
          var prob= probArea.cdf().toFixed(2);
        }else{
          var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
          var prob= probArea.cdf().toFixed(2);
        }
      }
      if(str.includes("choroplethCompare.html")){
          return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#e9e9e9",
            color: 'black',
            fillOpacity: 0.6
          };
      }else{
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(prob),
            color: 'black',
            fillOpacity: 0.9
          };
      }
    },
      onEachFeature: function (feature, layer) {
        var str = ""+window.location.href;
        if(str.includes("choroplethIntervalo.html")){interOn=true;}
        if(interOn==true){
          var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
          var prob= probArea.cdfintervalo().toFixed(2);
        }else{
          var sdr = document.getElementById("example_id");
          if(typeof(sdr) != 'undefined' && sdr != null){
            var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
            var prob= probArea.cdf().toFixed(2);
          }else{
            var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
            var prob= probArea.cdfintervalo().toFixed(2);
          }
        }
        var area= new distribuicaoTeste(getDis(feature.properties.name),alpha);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        if(str.includes("choroplethCompare.html")){
          layer.bindPopup(feature.properties.name);
        }else{
          layer.bindPopup("Probabilidade em "+feature.properties.name+": "+prob);
        }

        if(str.includes("choroplethCompare.html")){
          layer.on({
            dblclick: whenClicked
          });
        }
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
    this._div.innerHTML= infoprops(props);
  };
  info.addTo(map);
}