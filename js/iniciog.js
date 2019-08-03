function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
  }
  if(markers!= null){
    markers.clearLayers();
  }
  GeoLayer =L.geoJson(dataset,
    {onEachFeature: function (feature, layer) {
        cidades.push(feature.properties.name);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.


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
            var probArea= new distribuicaoIntervalo(dist,left,right);
            var prob= probArea.cdfintervalo().toFixed(2);
          }
        }
        
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