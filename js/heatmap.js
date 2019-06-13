var map = L.map('vis6').setView([-8.055213,-34.9724667], 9);
var to,fro,latg,lngg,to2,fro2,dataset,heat;
var medias=[],lat,lng,intensity;
var addressPoints=[];
var meses=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var cidades=[];
var filterbymouth,filterbytri;
var featurename;
var GeoLayer;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

function probDA(v){
  for (var i = (medias.length-1); i>=0 ; i--) {
    var percent= (1/medias.length);
    if(v>=medias[i]){
      return (percent*(i+1));
    }
  }
}

function filterclick(v){
  if(v==math.max(medias)){
    medias=[];
    for (var i = 0; i < dataset.features.length; i++){
      medias.push(sum(dataset.features[i]));
      medias.sort(function(a, b){return a - b});
    }
  }else{
    for (var i = 0; i < medias.length; i++) {
      if(v<medias[i]){
        medias.splice(i, (medias.length-i));
      }
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

d3.json("./data/rmr.json",function(error,dados){
	dataset=dados;
  inicio(dataset);
  cidades.forEach(function(item){
    $('select').append($('<option>', {
      value: item,
      text: item
    }));
  });
}); 

// criação da div que contém o Título e Subtítulo do Mapa. 
var info = L.control();
info.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};