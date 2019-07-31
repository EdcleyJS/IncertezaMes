var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var cidades=[];
var filterbymouth,filterbytri,featurename,GeoLayer,marker;
var markers = L.layerGroup();
var medias=[],lat,lng,intensity,alpha=0,left=60,right=100;
var Icon1 = L.icon({iconUrl: './data/1.png',iconSize: [43, 55],popupAnchor: [-3, -76]});
var Icon2 = L.icon({iconUrl: './data/2.png',iconSize: [43, 55],popupAnchor: [-3, -76]});
var Icon3 = L.icon({iconUrl: './data/3.png',iconSize: [43, 55], popupAnchor: [-3, -76]});
var Icon4 = L.icon({iconUrl: './data/4.png',iconSize: [43, 55],popupAnchor: [-3, -76] });
var Icon5 = L.icon({iconUrl: './data/5.png', iconSize: [43, 55], popupAnchor: [-3, -76] });
var Icon6 = L.icon({iconUrl: './data/6.png',iconSize: [43, 55],popupAnchor: [-3, -76] });
var Icon7 = L.icon({iconUrl: './data/7.png', iconSize: [43, 55], popupAnchor: [-3, -76] });

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

d3.json("./data/pe.json",function(error,dados){
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

// criação da div que contém a legenda do Mapa.
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/7.png" style="height:100%; width:100%"></i>'+"0.14</br>";
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/6.png" style="height:100%; width:100%"></i>'+"0.28</br>";
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/5.png" style="height:100%; width:100%"></i>'+"0.42</br>";
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/4.png" style="height:100%; width:100%"></i>'+"0.56</br>";
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/3.png" style="height:100%; width:100%"></i>'+"0.70</br>";
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/2.png" style="height:100%; width:100%"></i>'+"0.86</br>";
  div.innerHTML +='<i style="color:#7f7fff; background:"><img src="./data/1.png" style="height:100%; width:100%"></i>'+"1.00</br>";
  return div;
};
legend.addTo(map);