var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var GeoLayer,GeoLayer2,GeoLayer3,filterbytri,dataset,database;
var legend = L.control({position: 'bottomright'});
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,featurename;
var grades=[0,30,60,90,120,150,180,210,240,250,280];
map.doubleClickZoom.disable();
var info = L.control();
var medias=[];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(map);
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
// criação da div que contém o Título e Subtítulo do Mapa. 
info.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorN(grades[i])+'; background:'+colorN(grades[i])+'"></i>'+">"+grades[i]+'</br>';
  }
  return div;
};
legend.addTo(map);
d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
  });
});