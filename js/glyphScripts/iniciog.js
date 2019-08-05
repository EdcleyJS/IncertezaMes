function inicio(dataset){
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    pontos.clearLayers();
  }
  /*if(markers!= null){
    markers.clearLayers();
  }*/
  var dots = [];
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
            var probArea= new distribuicaoTeste(dist,alpha);
            var prob= probArea.cdf().toFixed(2);
          }
        }
        
        /*if(prob>=0.86){
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
         markers.addLayer(marker);*/
        var bounds = layer.getBounds();
        var width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        var height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        var area= (turf.area(feature.geometry)/10000000);      
        area= area/2;

        var intensity= (prob*5);
        var zoom= map.getZoom();
       
        if(area<0){
          area= (area*-1);
        }
        /*if(zoom>=9){
          area=area*5;
        }else{
          area=area*3;
        }*/
        var nump= area;
        //console.log(nump);

        //var p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
        //console.log(leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true));
        //console.log(leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true));
        var cont=0;
        var cor= '#'+colorN(prob);
        //console.log(cor);
        for (var i=0; i < nump; i++) {
          var p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
          if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
            dots.push(L.circleMarker(p, {radius: 3, weight: 3, color: cor,renderer: myRenderer}));
          }
          /*
          if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {

            // check distance to other dots
            // for (let j=0; j<dots.length; j++) {
            //   let dx = p[0]-dots[j][0],
            //       dy = p[1]-dots[j][1]
            //   if (Math.sqrt(dx*dx+dy*dy) < options.distance) 
            //     // continue outer
            // }
            // check distance to polygon edge
            // for (let j=0; j<polygon.length-1; j++) {
            //   if (distPointEdge(p, polygon[j], polygon[j+1]) < options.edgeDistance) continue outer;
            // }
            dots.push(p);
            if (dots.length == 20) break;
          }*/
        }
        /*console.log(cont);
        dots.forEach(function(d,i){
          L.circleMarker(d, {radius: 1, weight: 1, color: 'black',renderer: myRenderer}).addTo(map);
        });*/

        //console.log(dots);

      }
  });
  pontos = L.layerGroup(dots);
  pontos.addTo(map);

  //map.addLayer(markers);
  info.update = function (props) {
        if(featurename==undefined){
          this._div.innerHTML = '<h5>Levantamento com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }else{
          this._div.innerHTML = '<h5>Comparação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade de chuva em 2018.');
        }
  };
  info.addTo(map);
}