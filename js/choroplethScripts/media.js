var mapMedia = L.map('vis4').setView([-8.305448,-37.822426], 8);
var LayerMedia,GeoLayer2,GeoLayer3,filterbytri,dataset,database;
var legendMedia = L.control({position: 'bottomright'});
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,featurename,mesmedia;
var grades=[0,30,60,90,120,150,180,210,240,250,280];
map.doubleClickZoom.disable();
var infoMedia = L.control();
var medias=[];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
  }).addTo(mapMedia);
//Escala de cores para o mapa
function colorM(media){
  var cbf = palette('tol-sq', 11);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}
// criação da div que contém o Título e Subtítulo do Mapa. 
infoMedia.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
legendMedia.onAdd = function (mapMedia) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorM(grades[i])+'; background:'+colorM(grades[i])+'"></i>'+">"+grades[i]+'</br>';
  }
  return div;
};
legendMedia.addTo(mapMedia);
/*d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
  });
});*/