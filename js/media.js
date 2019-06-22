var map = L.map('vis6').setView([-8.055213,-34.9724667], 9);
var GeoLayer,filterbytri,dataset,grades = [],legend = L.control({position: 'bottomright'});
map.doubleClickZoom.disable();
var medias=[];

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
  if(GeoLayer!= null){
    GeoLayer.clearLayers();
    legend.remove();
  }
  medias=[];
  L.geoJson(dados,
    {onEachFeature: function (feature, layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var total = sum(feature);
        if(filterbytri!='off' && filterbytri!= undefined){
          medias.push((total / 3).toFixed(2));
        }else{
          medias.push((total / 12).toFixed(2));
        }
      }
  });
  // criação da div que contém a legenda do Mapa.
  medias.sort(function(a, b){return a - b});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
        labels = [];
        for (var i = 22; i < 184; i+=22) {
          grades.push(Number(medias[i]));
        }
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +='<i style="color:'+color(grades[i])+'; background:'+color(grades[i])+'"></i>'+">"+grades[i]+'</br>';
        }
      return div;
    };
  legend.addTo(map);

  GeoLayer= L.geoJson(dados,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      var total = sum(feature);
      if(filterbytri!='off' && filterbytri!= undefined){
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: color((total / 3).toFixed(2)),
            color: 'black',
            fillOpacity: 0.9
          };
      }else{
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: color((total / 12).toFixed(2)),
            color: 'black',
            fillOpacity: 0.9
          };
      }
    },
      onEachFeature: function (feature, layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          var total = sum(feature);
          if(filterbytri!='off' && filterbytri!= undefined){
            layer.bindPopup("Precipitação média acumulada em "+feature.properties.name+" (período de 2018): "+(total / 3).toFixed(2)+" mm.");
          }else{
            layer.bindPopup("Precipitação média acumulada em "+feature.properties.name+" (período de 2018): "+(total / 12).toFixed(2)+" mm.");
          }
        }
  }).addTo(map);
  grades=[];
}

d3.json("./data/pe.json",function(dados){
  dataset=dados;
  inicio(dados);
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