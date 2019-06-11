var map = L.map('vis6').setView([-8.055213,-34.9724667], 9);
map.doubleClickZoom.disable();
var GeoLayer;
var medias=[];
var dataset,max;
var filterbymouth,filterbytri;
var featurename;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

d3.json("./data/rmr.json",function(error,dados){
  dataset=dados;
  inicio(dataset);
}); 
//console.log(dataset);

//Escala de cores para o mapa
function colorN(d){
  var cbf = palette('cb-BrBG', 11);
  for (var i =10; i>=0 ; i--) {
    if(d>=0.09*i){
      return cbf[i];
    }
  }
}
function filterclick(v){
  //console.log(v+" - "+math.max(medias));
  if(v==math.max(medias)){
    medias=[];
    for (var i = 0; i < dataset.features.length; i++){
      medias.push(sum(dataset.features[i]));
      medias.sort(function(a, b){return a - b});
    }
  }else{
    for (var i = 0; i < medias.length; i++) {
      if(v<medias[i]){
        //console.log();
        medias.splice(i, (medias.length-i));
        //console.log("splice");
        //delete medias[i];
      }
    }
  }
}

function probDA(v){
  for (var i = (medias.length-1); i>=0 ; i--) {
    var percent= (1/medias.length);
    if(v>=medias[i]){
      return (percent*(i+1));
    }
  }
}

function sum(feature){
  if(filterbymouth!='off' && filterbymouth!= undefined){ 
    var aux= "feature.properties."+filterbymouth;
    return Number(feature.properties[filterbymouth]);
  }else if(filterbytri!='off' && filterbytri!= undefined){
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

function whenClicked(e) {
  if(featurename==e.target.feature.properties.name){
    featurename=undefined;
  }else{
    featurename=e.target.feature.properties.name;
  }
  filterclick(sum(e.target.feature));
  compare(dataset); 
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
  for (var i = 0; i < 11; i++) {
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