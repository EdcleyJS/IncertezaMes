var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var filterbymouth,filterbytri,alpha=0,left=60,right=100;
map.doubleClickZoom.disable();
var featurename;
var dataset,max;
var medias=[];
var GeoLayer;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

d3.json("./data/pe.json",function(error,dados){
  dataset=dados;
  inicio(dataset);
}); 

//Escala de cores para o mapa
function colorN(d){
  var cbf = palette('cb-RdYlGn', 11);
  for (var i =10; i>=0 ; i--) {
    if(d>(0.09*i)){
      return cbf[i];
    }else if(d==0){
      return cbf[0];
    }
  }
}

function whenClicked(e) {              
  var slider = $("#sliderrange2").data("ionRangeSlider");
  if(featurename==e.target.feature.properties.name){
    featurename=undefined;
    inicio(dataset);
      slider.update({
        disable:false
      });
  }else{
    featurename=e.target.feature.properties.name;
    var dist=[[Number(e.target.feature.properties.Janeiro)],[Number(e.target.feature.properties.Fevereiro)],[Number(e.target.feature.properties.Março)],[Number(e.target.feature.properties.Abril)],[Number(e.target.feature.properties.Maio)],[Number(e.target.feature.properties.Junho)],[Number(e.target.feature.properties.Julho)],[Number(e.target.feature.properties.Agosto)],[Number(e.target.feature.properties.Setembro)],[Number(e.target.feature.properties.Outubro)],[Number(e.target.feature.properties.Novembro)],[Number(e.target.feature.properties.Dezembro)]];       
    dist= dist.sort(function(a, b){return a - b});
    left=Number(dist[0]); right=Number(dist[11]);
    compare(dataset);
      slider.update({
        disable:true
      });
  }
}

// criação da div que contém o Título e Subtítulo do Mapa. 
var info = L.control();
info.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
// Fim da criação da div que contém o Título e Subtítulo do Mapa.

// criação da div que contém a legenda do Mapa.
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  for (var i = 11; i > 0; i--) {
    grades.push(0.09*i);
  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+">"+grades[i].toFixed(2) +'</br>';
  }
  return div;
};
legend.addTo(map);

function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1.5,
    color: 'black',
    dashArray: '',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  GeoLayer.resetStyle(e.target);
}