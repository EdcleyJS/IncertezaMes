var map = L.map('vis6').setView([-8.055213,-34.9724667], 9);
var GeoLayer,filterbytri,dataset,database,grades = [],legend = L.control({position: 'bottomright'});
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado;
map.doubleClickZoom.disable();
var medias=[];

//Escala de cores para o mapa
function colorN(media){
  var cbf = palette('cb-RdYlGn', 11);
  //cbf.reverse();
  //console.log(grades);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      //console.log(cbf[i]);
      color="#"+cbf[i];
    }
  });
  return color;
}

//Escala de cores para o mapa
function color(d) {
  grades.sort(function(a, b){return a - b});
  return d > grades[6] ? '#01665e' :
   d > grades[5]  ? '#35978f' :
    d > grades[4]  ? '#80cdc1' :
     d > grades[3]  ? '#c7eae5' :
      d > grades[2]   ? '#f6e8c3' :
       d > grades[1]   ? '#dfc27d' :
        d > grades[0]  ? '#bf812d': '#8c510a';
}

function sum(feature){
  if(filterbytri!='off' && filterbytri!= undefined){
    if(filterbytri=='1'){
       return (Number(feature.properties.Janeiro)+Number(feature.properties.Fevereiro)+Number(feature.properties.Março));
    }else if(filterbytri=='2') {
      return (Number(feature.properties.Abril)+Number(feature.properties.Maio)+Number(feature.properties.Junho));
    }else if(filterbytri=='3'){
      return (Number(feature.properties.Julho)+Number(feature.properties.Agosto)+Number(feature.properties.Setembro));
    }else if (filterbytri=='4') {
      return (Number(feature.properties.Outubro)+Number(feature.properties.Novembro)+Number(feature.properties.Dezembro));
    }
  }else{
    return (Number(feature.properties.Janeiro)+Number(feature.properties.Fevereiro)+Number(feature.properties.Março)+Number(feature.properties.Abril)+Number(feature.properties.Maio)+Number(feature.properties.Junho)+Number(feature.properties.Julho)+Number(feature.properties.Agosto)+Number(feature.properties.Setembro)+Number(feature.properties.Outubro)+Number(feature.properties.Novembro)+Number(feature.properties.Dezembro));
  }
}
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(map);

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
        console.log("entrou");
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
  console.log(maximo);
  var distance= (maximo/11).toFixed(2);
  for (var i = 0; i < 11; i++) {
    grades.push((i*distance).toFixed(2));
  }

  legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      for (var i = (grades.length-1); i >=0 ; i--) {
        //console.log(grades[i]);
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
        //console.log("entrou");
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
      //console.log(media);
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
            console.log("entrou");
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
          if(feature.properties.name=='Recife'){
            console.log(media);
          }
          layer.bindPopup("Precipitação média acumulada em "+feature.properties.name+" (período de 2018): "+media+" mm.");
        }
    }).addTo(map);
  grades=[];
}

d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
  });
});
 // criação da div que contém o Título e Subtítulo do Mapa. 
var info = L.control();
info.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
info.update = function (props) {
  this._div.innerHTML = '<h4> Precipitação Acumulada (mm)</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Média por municpíos da RMR/2018.');
};
info.addTo(map);
// Fim da criação da div que contém o Título e Subtítulo do Mapa.