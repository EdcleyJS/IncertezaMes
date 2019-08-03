var meses=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var to,fro,latg,lngg,to2,fro2,dataset,heat,alpha=0,left=60,right=100,interOn;
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado;
var medias=[],lat,lng,intensity;
var filterbymouth,filterbytri;
var dim,Oe,Le,No,Su,zoom;
var addressPoints=[];
var featurename;
var cidades=[];
var GeoLayer;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

function distrib(feature){
  return [[Number(feature.properties.Janeiro)],[Number(feature.properties.Fevereiro)],[Number(feature.properties.Março)],[Number(feature.properties.Abril)],[Number(feature.properties.Maio)],[Number(feature.properties.Junho)],[Number(feature.properties.Julho)],[Number(feature.properties.Agosto)],[Number(feature.properties.Setembro)],[Number(feature.properties.Outubro)],[Number(feature.properties.Novembro)],[Number(feature.properties.Dezembro)]];
}

function cmp(dist1,dist2){
  var count=0;
  dist1.forEach(function(d,i){
    if(dist2[i]<dist1[i]){
      //console.log(""+dist2[i]+" < "+dist1[i]);
      count++;
    }
  });
  //console.log(count);
  return (count/dist1.length);
}

map.on('moveend', function() {
  if(featurename!=undefined || featurename!='off'){
    inicio(dataset);
  }else{
    compare(dataset);
  }
});

d3.json("./data/dados.json",function(error,data){
  database=data;
});

d3.json("./data/pe.json",function(error,dados){
	dataset=dados;
  inicio(dataset);
  cidades.forEach(function(item){
    $('#cidadesfiltro').append($('<option>', {
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

// criação da div que contém a legenda do Mapa.
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  div.innerHTML +='<i style="color:#7f7fff; background:#7f7fff"></i>'+"0.14</br>";
  div.innerHTML +='<i style="color:#6666ff; background:#6666ff"></i>'+"0.28</br>";
  div.innerHTML +='<i style="color:#00ecff; background:#00ecff"></i>'+"0.42</br>";
  div.innerHTML +='<i style="color:#4cffb3; background:#4cffb3"></i>'+"0.56</br>";
  div.innerHTML +='<i style="color:#00e584; background:#00e584"></i>'+"0.70</br>";
  div.innerHTML +='<i style="color:#ebff4c; background:#ebff4c"></i>'+"0.84</br>";
  div.innerHTML +='<i style="color:#ff4000; background:#ff4000"></i>'+"1.00</br>";
  return div;
};
legend.addTo(map);