var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var GeoLayer,filterbytri,dataset,database,grades = [],legend = L.control({position: 'bottomright'});
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado;
map.doubleClickZoom.disable();
var info = L.control();
var medias=[];

//Escala de cores para o mapa
function colorN(media){
  var cbf = palette('cb-RdYlGn', 11);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(map);

   // criação da div que contém o Título e Subtítulo do Mapa. 
  info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

function inicio(dados){
  var maximo=0;
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    legend.remove();
  }
  medias=[];
  // criação da div que contém a legenda do Mapa.
  L.geoJson(dados,{onEachFeature: function(feature,layer){
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
      var probArea= new distribuicaoTeste(dist,0);
      var media= Number(probArea.media().toFixed(2));
      if(maximo<media){
        maximo=media;
      }
    }
  });
  var distance= (maximo/11).toFixed(2);
  for (var i = 0; i < 11; i++) {
    grades.push((i*distance).toFixed(2));
  }

  legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      for (var i = (grades.length-1); i >=0 ; i--) {
          div.innerHTML +='<i style="color:'+colorN(grades[i])+'; background:'+colorN(grades[i])+'"></i>'+">"+grades[i]+'</br>';
        }
      return div;
    };
  legend.addTo(map);

  GeoLayer= L.geoJson(dados,
    {style: function(feature){
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
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var probArea= new distribuicaoTeste(dist,0);
      var media= probArea.media().toFixed(2);
      return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorN(media),
            color: 'black',
            fillOpacity: 0.9
        };
      },onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
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
          var probArea= new distribuicaoTeste(dist,0);
          var media= probArea.media().toFixed(2);
          layer.bindPopup("Precipitação média acumulada em "+feature.properties.name+" (período de 2018): "+media+" mm.");
          layer.on('mouseover', function (e) {
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
        }
    }).addTo(map);
  grades=[];

  info.update = function (props) {
    if(anoSelecionado!=undefined){
      if(mesSelecionado!=undefined){
        this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para '+mesSelecionado+'/'+anoSelecionado+'.');
      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
        }else{
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
        }
      }else if(diaSelecionado!=undefined){
        this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
      }else{
        this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para '+anoSelecionado+'.');
      }

    }else if(trimestreSelecionado!=undefined){
      if(diaSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
      }else{
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para os '+trimestreSelecionado+'ºs trimestres no período.');
      }

    }else if(mesSelecionado!=undefined){
      if(diaSelecionado!=undefined){
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para os '+diaSelecionado+'ºs dias dos meses de'+mesSelecionado+' no período.');
      }else{
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para o mês de '+mesSelecionado+' no período.');
      }
    }else if(diaSelecionado!==undefined){
          this._div.innerHTML = '<h5>Precipitação com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Média para os '+diaSelecionado+'ºs dias dos meses no período.');
    }else{
        this._div.innerHTML = '<h4> Precipitação com base em PE.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': 'Média no período.');
    }
  };
  info.addTo(map);
}

d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
  });
});