var Icon00 = L.icon({iconUrl: './data/00.png',iconSize: [43, 55],popupAnchor: [-3, -76]});
var Icon01 = L.icon({iconUrl: './data/01.png',iconSize: [43, 55],popupAnchor: [-3, -76]});
var Icon02 = L.icon({iconUrl: './data/02.png',iconSize: [43, 55], popupAnchor: [-3, -76]});
var Icon10 = L.icon({iconUrl: './data/10.png',iconSize: [43, 55],popupAnchor: [-3, -76] });
var Icon11 = L.icon({iconUrl: './data/11.png', iconSize: [43, 55], popupAnchor: [-3, -76] });
var Icon12 = L.icon({iconUrl: './data/12.png',iconSize: [43, 55],popupAnchor: [-3, -76] });
var Icon20 = L.icon({iconUrl: './data/20.png', iconSize: [43, 55], popupAnchor: [-3, -76] });
var Icon21 = L.icon({iconUrl: './data/21.png',iconSize: [43, 55],popupAnchor: [-3, -76]});
var Icon22 = L.icon({iconUrl: './data/22.png',iconSize: [43, 55],popupAnchor: [-3, -76]});
var Iconn10 = L.icon({iconUrl: './data/110.png',iconSize: [43, 55], popupAnchor: [-3, -76]});
var Iconn11 = L.icon({iconUrl: './data/111.png',iconSize: [43, 55],popupAnchor: [-3, -76] });
var Iconn12 = L.icon({iconUrl: './data/112.png', iconSize: [43, 55], popupAnchor: [-3, -76] });
var Iconn20 = L.icon({iconUrl: './data/120.png',iconSize: [43, 55],popupAnchor: [-3, -76] });
var Iconn21 = L.icon({iconUrl: './data/121.png', iconSize: [43, 55], popupAnchor: [-3, -76] });
var Iconn22 = L.icon({iconUrl: './data/122.png', iconSize: [43, 55], popupAnchor: [-3, -76] });
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,featurename;
var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var GeoLayer,filterbytri,dataset,database,grades = [];
var legend = L.control({position: 'bottomright'});
map.doubleClickZoom.disable();
var markers = L.layerGroup();
var info = L.control();
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

d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
  });
});