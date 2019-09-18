var filterbymouth,filterbytri,featurename,LayerDotMap,marker,interOn,pontos,pontos2;
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado;
var medias=[],lat,lng,intensity,alpha=0,left=60,right=100,database;
var grades=[0,30,60,90,120,150,180,210,240,250,280];
var mapDot = L.map('vis3').setView([-8.305448,-37.822426], 8);
var myRenderer = L.canvas({ padding: 0.5 });
var markers = L.layerGroup();
var cidades=[];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapDot);

/*d3.json("./data/dados.json",function(error,data){
  database=data;
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
});*/
function colorD(media){
  var cbf = palette('cb-RdYlGn', 11);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}


function cmp(dist1,dist2){
  var count=0;
  dist1.forEach(function(d,i){
    if(dist2[i]<dist1[i]){
      count++;
    }
  });
  return (count/dist1.length);
}

// criação da div que contém o Título e Subtítulo do Mapa. 
var infoDot = L.control();
infoDot.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

// criação da div que contém a legenda do Mapa.
/*var legend = L.control({position: 'bottomright'});
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
legend.addTo(map);*/
// criação da div que contém a legenda do Mapa.
var legendDot = L.control({position: 'bottomright'});
legendDot.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorD(grades[i])+'; background:'+colorD(grades[i])+'"></i>'+">"+grades[i]+'</br>';
  }
  return div;
};
legendDot.addTo(mapDot);