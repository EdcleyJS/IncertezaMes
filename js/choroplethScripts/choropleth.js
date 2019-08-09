var filterbymouth,filterbytri,alpha=0,left=60,right=100,database,interOn;
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado;
var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
map.doubleClickZoom.disable();
var selecionados=[];
var featurename;
var dataset,max;
var medias=[];
var GeoLayer;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(map);

d3.json("./data/dados.json",function(error,data){
  database=data;
  d3.json("./data/pe.json",function(error,dados){
    dataset=dados;
    inicio(dataset);
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
  var cbf = palette('cb-RdYlGn', 11);
  cbf.reverse();
  if(d>0.9){
    cor= cbf[10];   
  }else if (d>0.81) {
    cor= cbf[9];  
  }else if(d>0.72){
    cor= cbf[8];  
  }else if(d>0.63){
    cor= cbf[7];  
  }else if(d>0.54){
    cor= cbf[6];  
  }else if(d>0.45){
    cor= cbf[5];  
  }else if(d>0.36){
    cor= cbf[4];  
  }else if(d>0.27){
    cor= cbf[3];  
  }else if(d>0.18){
    cor= cbf[2];  
  }else if (d>0.09) {
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
  for (var i = 11; i > 0; i--) {
    grades.push(0.09*i);
  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+"<"+grades[i].toFixed(2) +'</br>';
  }
  return div;
};
legend.addTo(map);

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