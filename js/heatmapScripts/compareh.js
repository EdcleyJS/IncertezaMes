function compare(dataset){
  addressPoints=[];
  if(heat!= null){
    map.removeLayer(heat);
  }
  info.remove();
  if(GeoLayer!= null){
      GeoLayer.clearLayers();
  }

  var dist1,dist2;
  if(anoSelecionado!=undefined){
    dist1= distribuicaoAno(featurename);
  }else if(trimestreSelecionado!=undefined){
    dist1= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    dist1= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    dist1= distribuicaoDia(featurename);
  }else{
    dist1= distribuicaoMes(featurename);
  }

  dim= map.getBounds(); Le = dim.getEast(); Oe= dim.getWest(); No= dim.getNorth(); Su=dim.getSouth(); zoom= map.getZoom();

  GeoLayer =L.geoJson(dataset,
    {
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        if(anoSelecionado!=undefined){
          dist2= distribuicaoAno(feature.properties.name);
        }else if(trimestreSelecionado!=undefined){
          dist2= distribuicaoTri(feature.properties.name);
        }else if(mesSelecionado!=undefined){
          dist2= distribuicaoMes(feature.properties.name);
        }else if(diaSelecionado!=undefined){
          dist2= distribuicaoDia(feature.properties.name);
        }else{
          dist2= distribuicaoMes(feature.properties.name);
        }
        var probArea= cmp(dist1,dist2).toFixed(2);
        var area= (turf.area(feature.geometry)/1000000);
        to= layer.getBounds()._southWest.lat;
        fro= layer.getBounds()._northEast.lat;
        to2= layer.getBounds()._southWest.lng;
        fro2= layer.getBounds()._northEast.lng;
        lat=layer.getBounds().getCenter().lat;
        lng=layer.getBounds().getCenter().lng;
        intensity= (probArea*5);
        if(area<0){
          area= (area*-1);
        }
        if(zoom>=9){
          area=area*5;
        }else{
          area=area*3;
        }
        var nump= (probArea*area);
        if(No>=fro && Le>=fro2 && Su<=to && Oe<=to2){
          for (var i = 0; i < nump; i++) {
            if(zoom>=9){
              addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),1.9]);
            }else{
              addressPoints.push([(Math.random() * (to - fro) + fro).toFixed(6),(Math.random() * (to2 - fro2) + fro2).toFixed(6),2.9]);
            }
          }
        }
      }
  });
  addressPoints = addressPoints.map(function (p) { return [p[0], p[1], p[2]]; });
  heat = L.heatLayer(addressPoints,{maxZoom:18,radius:15}).addTo(map);
  info.update = function (props) {
    if(featurename!=undefined){
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
        }else{
          this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
        }else{
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+trimestreSelecionado+'ºs trimestres no período.');
        }

      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias dos meses de'+mesSelecionado+' no período.');
        }else{
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os meses de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            this._div.innerHTML = '<h5>Precipitação com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias dos meses no período.');
      }else{
          this._div.innerHTML = '<h4> Precipitação com base em '+featurename+'.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade no período.');
      }
    }else{
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
        }else{
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
        }else{
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+trimestreSelecionado+'ºs trimestres no período.');
        }

      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias dos meses de'+mesSelecionado+' no período.');
        }else{
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os meses de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade para os '+diaSelecionado+'ºs dias dos meses no período.');
      }else{
          this._div.innerHTML = '<h4> Precipitação com base em PE.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Probabilidade no período.');
      }
    }
  };
  info.addTo(map);
}