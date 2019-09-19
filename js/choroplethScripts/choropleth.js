var filterbymouth,filterbytri,alpha=0,left=60,right=100,database,interOn;
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,opcoes=[];
var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var mapRange = L.map('vis2').setView([-8.305448,-37.822426], 8);

map.doubleClickZoom.disable();
var selecionados=[];
var featurename;
var dataset,max;
var medias=[];
var GeoLayer,LayerRange,layerTuto1,layerTuto2,layerTuto3,layerTuto4;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapRange);

d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    //inicio(dataset);
    //inicioRange(dataset);
    //inicioDotMap(dataset);
    //inicioMedia(dataset);
  });
});
function cmp(dist1,dist2){
  var count=0;
  dist1.forEach(function(d,i){
    if(dist2[i]<dist1[i]){
      count++;
    }
  });
  return (count/dist1.length);
}
//Escala de cores para o mapa
function colorN(d){
  var cbf = palette('cb-BrBG', 11);
  //cbf.reverse();
  if(d>=1.0){
    cor= cbf[10];   
  }else if (d>=0.9) {
    cor= cbf[9];  
  }else if(d>=0.8){
    cor= cbf[8];  
  }else if(d>=0.7){
    cor= cbf[7];  
  }else if(d>=0.6){
    cor= cbf[6];  
  }else if(d>=0.5){
    cor= cbf[5];  
  }else if(d>=0.4){
    cor= cbf[4];  
  }else if(d>=0.3){
    cor= cbf[3];  
  }else if(d>=0.2){
    cor= cbf[2];  
  }else if (d>=0.1) {
    cor= cbf[1];  
  }else{
    cor= cbf[0];  
  }
  return cor;
}
function whenClicked(e) {              
  var slider = $("#example_id").data("ionRangeSlider");
  var elem = document.getElementById("#example_id");
  if(featurename==e.target.feature.properties.name){
    featurename=undefined;
    inicio(dataset);
    if(elem!=null){
      slider.update({
        disable:false
      });
    }
  }else{
    featurename=e.target.feature.properties.name;
    compare(dataset);
    if(elem!=null){
      slider.update({
        disable:true
      });
    }
  }
}
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
  for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));

  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+(grades[i]*100)+'%</br>';
  }
  return div;
};

legend.addTo(map);
var legendRange = L.control({position: 'bottomright'});
legendRange.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));
  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+(grades[i]*100)+'%</br>';
  }
  return div;
};
legendRange.addTo(mapRange);

function comparando(e){
  var exists=false;
    selecionados.forEach(function(d,i){
      if(e.target.feature.properties.name==d.target.feature.properties.name){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      layer.setStyle({
        weight: 1.5,
        color: 'black',
        fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados.push(e);
      if(selecionados.length==2){
        GeoLayer.clearLayers();
        var newdata=[];
        selecionados.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare(newdata);
      }
    }else if(exists==true && selecionados.length==2){
      selecionados=[];
      inicio(dataset);
    }else if(exists){
      var filtered = selecionados.filter(function(el) { return el.target.feature.properties.name != e.target.feature.properties.name; }); 
      selecionados=filtered;
      GeoLayer.resetStyle(e.target);
    }
}

function findP(array,id){
  var p;
  array.forEach(function(d,i){
    if(d[1]==id){
      p=d;
    }
  });
  return p;
}