function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  var str = ""+window.location.href;
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      if(anoSelecionado!=undefined){
        var dist= distribuicaoAno(feature.properties.name);
      }else if(trimestreSelecionado!=undefined){
        console.log("entrou");
        var dist= distribuicaoTri(feature.properties.name);
      }else if(mesSelecionado!=undefined){
        var dist= distribuicaoMes(feature.properties.name);
      }else if(diaSelecionado!=undefined){
        var dist= distribuicaoDia(feature.properties.name);
      }else{
        var dist= distribuicaoMes(feature.properties.name);
      }

      if(interOn==true){
        var probArea= new distribuicaoIntervalo(dist,left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
        //console.log("a");
      }else{
        var sdr = document.getElementById("example_id");
        //console.log(!sdr);
        //console.log(sdr);
        if(typeof(sdr) != 'undefined' && sdr != null){
          var probArea= new distribuicaoTeste(dist,alpha);
          var prob= probArea.cdf().toFixed(2);
            if(feature.properties.name=='Recife'){
              //console.log(dist);
            }
        }else{
          var probArea= new distribuicaoTeste(dist,alpha);
          var prob= probArea.cdf().toFixed(2);
        }
      }

        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(prob),
            color: 'black',
            fillOpacity: 0.9
          };
    },
      onEachFeature: function (feature, layer) {
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
        if(interOn==true){
          var probArea= new distribuicaoIntervalo(dist,left,right);
          var prob= probArea.cdfintervalo().toFixed(2);
          //console.log("a");
        }else{
          var sdr = document.getElementById("example_id");
          //console.log(!sdr);
          //console.log(sdr);
          if(typeof(sdr) != 'undefined' && sdr != null){
            var probArea= new distribuicaoTeste(dist,alpha);
            var prob= probArea.cdf().toFixed(2);
              if(feature.properties.name=='Recife'){
                //console.log(dist);
              }
          }else{
            var probArea= new distribuicaoIntervalo(dist,left,right);
            var prob= probArea.cdfintervalo().toFixed(2);
          }
        }
        
        var area= new distribuicaoTeste(dist,alpha);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+prob);
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
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Levantamento com Base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em '+filterbymouth+'/2018.');
        }
  };
  info.addTo(map);
}