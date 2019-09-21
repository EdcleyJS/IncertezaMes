var novaDist,bounds,width,height,area,nump,cont,cor,p,markerCircle;
var mapVis03 = L.map('vis03').setView([-8.305448,-37.822426], 8);
var mapDot = L.map('vis3').setView([-8.305448,-37.822426], 8);
var gradesDot=[0,15,30,45,60,75,90,105,120,135,150];
var myRenderer = L.canvas({ padding: 0.5 });
var LayerDotMap,pontos,pontos2;
var database,dots=[];
//-- MAPA DE PONTOS DA ETAPA DE PERGUNTAS AO USUÁRIO. --
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapDot);
//-- DIV INFO DO MAPA CONTROLADO --
var infoDot = L.control();
infoDot.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendDot = L.control({position: 'bottomright'});
legendDot.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (gradesDot.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorD(gradesDot[i])+'; background:'+colorD(gradesDot[i])+'"></i>'+gradesDot[i]+'</br>';
  }
  return div;
};
legendDot.addTo(mapDot);
//-- FUNÇÃO QUE DESENHA E CONTROLA OS PONTOS NO MAPA --
function inicioDotMap(dataset){
  if(LayerDotMap!= null){
    LayerDotMap.clearLayers();
    pontos2.clearLayers();
  }
  //dots = [];
  LayerDotMap =L.geoJson(dataset,
    {
      style: function(feature){
        if(opcoes.includes(feature.properties.name)){
          return {
            weight:1.5,
            opacity: 1,
            fillOpacity: 0,
            color: 'blue'
          };
        }else{
          return{
            weight:0.8,
            opacity: 0.5,
            fillOpacity: 0,
            dashArray: '5',
            color: 'black',
          };
        }
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(""+feature.properties.name);
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
        /*novaDist= dotMapPrep(getDis(feature.properties.name));  
        bounds = layer.getBounds();
        width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        area= (turf.area(feature.geometry)/100000000);      
        area= area/2;
        novaDist.forEach(function(d,i){
          nump= area*d[1];
          cont=0;
          cor= colorD(d[0]);
          while(nump<cont) {
            p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
              var markerCircle=L.circleMarker(p, {radius: 4, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer});
              markerCircle.bindPopup(" "+d[0]);
              dots.push(markerCircle);
            }
          }
        });*/
  }}).addTo(mapDot);
  pontos2 = L.layerGroup(dots);
  pontos2.addTo(mapDot);
  infoDot.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoDot.addTo(mapDot);
}
//-- MAPA DE PONTOS DA ETAPA DE TUTORIAL DO USUÁRIO. --
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapVis03);
//-- DIV INFO DO MAPA CONTROLADO --
var infoVis03=L.control();
infoVis03.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVis03 = L.control({position: 'bottomright'});
legendVis03.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (gradesDot.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorD(gradesDot[i])+'; background:'+colorD(gradesDot[i])+'"></i>'+gradesDot[i]+'</br>';
  }
  return div;
};
legendVis03.addTo(mapVis03);
var dots;
var tentativa=[];
//-- FUNÇÃO QUE DESENHA E CONTROLA OS PONTOS NO MAPA --
function Vis03TutorialFunction(dataset){
  if(layerTuto3!= null){
    layerTuto3.clearLayers();
    pontos.clearLayers();
  }
  //dots = [];
  layerTuto3 =L.geoJson(dataset,
    {
      style: function(feature){
        if(opcoes.includes(feature.properties.name)){
          return {
            weight:1.5,
            opacity: 1,
            fillOpacity: 0,
            color: 'blue'
          };
        }else{
          return{
            weight:0.8,
            opacity: 0.5,
            fillOpacity: 0,
            dashArray: '5',
            color: 'black',
          };
        }
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(""+feature.properties.name);
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
        /*novaDist= dotMapPrep(getDis(feature.properties.name));
        tentativa.push(novaDist,layer);
        bounds = layer.getBounds();
        width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        area= (turf.area(feature.geometry)/100000000);      
        area= area/2;
        novaDist.forEach(function(d,i){
          nump= area*d[1];
          cont=0;
          cor= colorD(d[0]);
          while(cont<nump) {
            p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
              markerCircle=L.circleMarker(p, {radius: 5, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer});
              markerCircle.bindPopup(" "+d[0]);
              dots.push(markerCircle);
            }
            cont+=1;
          }
        });*/
  }}).addTo(mapVis03);
  pontos = L.layerGroup(dots);
  pontos.addTo(mapVis03);
  infoVis03.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoVis03.addTo(mapVis03);
}
function InicioDot(){
  L.geoJson(dataset,{
    onEachFeature: function (feature, layer) {
        novaDist= dotMapPrep(getDis(feature.properties.name));
        //console.log(Math.max.apply(Math, getDis(feature.properties.name)));
        bounds = layer.getBounds();
        width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        area= (turf.area(feature.geometry)/10000000);      
        //area= area/3;
        novaDist.forEach(function(d,i){
          nump= area*d[1];
          cont=0;
          cor= colorD(d[0]);
          for(i=0; i<nump;i++) {
            p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
              markerCircle=L.circleMarker(p, {radius: 2, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer});
              markerCircle.bindPopup(" "+d[0]);
              dots.push(markerCircle);
            }
          }
        });
    }
  });
}
