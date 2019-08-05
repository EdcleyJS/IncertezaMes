function compare(dataset){
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
  GeoLayer =L.geoJson(dataset,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
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
      var area= cmp(dist1,dist2);
      if(featurename==feature.properties.name){
        return {
            weight: 3.5,
            opacity: 1,
            fillColor: "#"+colorN(area.toFixed(2)),
            color: 'yellow',
            fillOpacity: 0.9
        };
      }else {
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: "#"+colorN(area.toFixed(2)),
            color: 'black',
            fillOpacity: 0.9
        };   
      }

      },onEachFeature: function (feature,layer) {
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
        var area= cmp(dist1,dist2);
        layer.bindPopup("Probabilidade em "+feature.properties.name+" (2018): "+area.toFixed(2));
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