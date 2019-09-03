var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var map2 = L.map('vis7').setView([-8.305448,-37.822426], 8);
var map3 = L.map('vis8').setView([-8.305448,-37.822426], 8);
var GeoLayer,GeoLayer2,GeoLayer3,filterbytri,dataset,database;
var legend = L.control({position: 'bottomright'});
var legend2 = L.control({position: 'bottomright'});
var legend3 = L.control({position: 'bottomright'});
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,featurename;
var grades=[0,30,60,90,120,150,180,210,240,250,280];
map.doubleClickZoom.disable();
map2.doubleClickZoom.disable();
map3.doubleClickZoom.disable();
var info = L.control();var info2 = L.control();var info3 = L.control();
var medias=[];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18, id: 'mapbox.streets', accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(map);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18, id: 'mapbox.streets', accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(map2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18, id: 'mapbox.streets', accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
   }).addTo(map3);
//Escala de cores para o mapa
function colorN(media){
  var cbf = palette('tol-sq', 11);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}
map.on("mouseup", function () {
  map2.setView(map.getCenter(), map.getZoom());
  map3.setView(map.getCenter(), map.getZoom());
});
map.on("mouseout", function () {
  map2.setView(map.getCenter(), map.getZoom());
  map3.setView(map.getCenter(), map.getZoom());
});
map2.on("mouseup", function () {
  map.setView(map2.getCenter(), map2.getZoom());
  map3.setView(map2.getCenter(), map2.getZoom());
});
map2.on("mouseout", function () {
  map.setView(map2.getCenter(), map2.getZoom());
  map3.setView(map2.getCenter(), map2.getZoom());
});
map3.on("mouseup", function () {
  map.setView(map3.getCenter(), map3.getZoom());
  map2.setView(map3.getCenter(), map3.getZoom());
});
map3.on("mouseout", function () {
  map.setView(map3.getCenter(), map3.getZoom());
  map2.setView(map3.getCenter(), map3.getZoom());
});
// criação da div que contém o Título e Subtítulo do Mapa. 
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
info2.onAdd = function (map2) {   
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
info3.onAdd = function (map3) { 
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

legend.onAdd = function (map) { return legendonAdd(map);};
legend.addTo(map);
legend2.onAdd = function (map2) { return legendonAdd(map2);};
legend2.addTo(map2);
legend3.onAdd = function (map3) { return legendonAdd(map3);};
legend3.addTo(map3);

d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
  });
});