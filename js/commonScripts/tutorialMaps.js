var mapVis01 = L.map('vis01').setView([-8.305448,-37.822426], 8);
var mapVis02 = L.map('vis02').setView([-8.305448,-37.822426], 8);
var mapVis03 = L.map('vis03').setView([-8.305448,-37.822426], 8);
var mapVis04 = L.map('vis04').setView([-8.305448,-37.822426], 8);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapVis01);

 var infoVis01=L.control();
	infoVis01.onAdd = function (mymap) {
	  this._div = L.DomUtil.create('div', 'info');
	  this.update();
	  return this._div;
	};

var legendVis01 = L.control({position: 'bottomright'});
legendVis01.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));
  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+(grades[i]*100)+'%</br>';
  }
  return div;
};

legendVis01.addTo(mapVis01);

function Vis01TutorialFunction(dataset,interOn){
	if(layerTuto1!= null){
    	layerTuto1.clearLayers();
  	}
  	layerTuto1=L.geoJson(dataset,
    	{style: function(feature){
      		//Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      		if(interOn==true){
        		var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
        		var prob= probArea.cdfintervalo().toFixed(2);
      		}else{
          		var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
          		var prob= probArea.cdf().toFixed(2);
      		}
			if(opcoes.includes(feature.properties.name)){
		        return {
		          weight: 3.0,
		          opacity: 1,
		          fillColor: "#"+colorN(prob),
		          dashArray: '3',
		          color: 'blue',
		          fillOpacity: 0.9
		        };
		    }else{
        		return {
		            weight: 0.5,
		            opacity: 1,
		            fillColor: "#"+colorN(prob),
		            color: 'black',
		            fillOpacity: 0.9
          		};
      		}
    },
    onEachFeature: function (feature, layer) {
        if(interOn==true){
          var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
          var prob= probArea.cdfintervalo().toFixed(2);
        }else{
            var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
            var prob= probArea.cdf().toFixed(2);
        }
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+": "+Math.floor(prob*100)+"%");
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto1.resetStyle(e.target);
            this.closePopup();
        });
      }
	}).addTo(mapVis01);;
	infoVis01.update = function (props) {
	    this._div.innerHTML= infoprops(props);
	};
	infoVis01.addTo(mapVis01);
}
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapVis02);

var infoVis02=L.control();
infoVis02.onAdd = function (mymap) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

var legendVis02 = L.control({position: 'bottomright'});
legendVis02.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));
  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+(grades[i]*100)+'%</br>';
  }
  return div;
};

legendVis02.addTo(mapVis02);

function Vis02TutorialFunction(dataset,interOn){
	if(layerTuto2!= null){
    	layerTuto2.clearLayers();
  	}
  	layerTuto2=L.geoJson(dataset,
    	{style: function(feature){
      		//Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      		if(interOn==true){
        		var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
        		var prob= probArea.cdfintervalo().toFixed(2);
      		}else{
          		var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
          		var prob= probArea.cdf().toFixed(2);
      		}
			if(opcoes.includes(feature.properties.name)){
		        return {
		          weight: 3.0,
		          opacity: 1,
		          fillColor: "#"+colorN(prob),
		          dashArray: '3',
		          color: 'blue',
		          fillOpacity: 0.9
		        };
		    }else{
        		return {
		            weight: 0.5,
		            opacity: 1,
		            fillColor: "#"+colorN(prob),
		            color: 'black',
		            fillOpacity: 0.9
          		};
      		}
    },
    onEachFeature: function (feature, layer) {
        if(interOn==true){
          var probArea= new distribuicaoIntervalo(getDis(feature.properties.name),left,right);
          var prob= probArea.cdfintervalo().toFixed(2);
        }else{
            var probArea= new distribuicaoTeste(getDis(feature.properties.name),alpha);
            var prob= probArea.cdf().toFixed(2);
        }
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        layer.bindPopup("Probabilidade em "+feature.properties.name+": "+Math.floor(prob*100)+"%");
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
	}).addTo(mapVis02);;
	infoVis02.update = function (props) {
	    this._div.innerHTML= infoprops(props);
	};
	infoVis02.addTo(mapVis02);
}

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapVis03);

var infoVis03=L.control();
infoVis03.onAdd = function (mymap) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

var legendVis03 = L.control({position: 'bottomright'});
legendVis03.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorD(grades[i])+'; background:'+colorD(grades[i])+'"></i>'+grades[i]+'</br>';
  }
  return div;
};
legendVis03.addTo(mapVis03);

function Vis03TutorialFunction(dataset){
  if(layerTuto3!= null){
    layerTuto3.clearLayers();
    pontos.clearLayers();
  }
  var dots = [];
  layerTuto3 =L.geoJson(dataset,
    {onEachFeature: function (feature, layer) {
        //cidades.push(feature.properties.name);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var novaDist= dotMapPrep(getDis(feature.properties.name));  
        var bounds = layer.getBounds();
        var width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        var height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        var area= (turf.area(feature.geometry)/10000000);      
        area= area/2;
        var zoom= mapDot.getZoom();
        if(area<0){
          area= (area*-1);
        }
        novaDist.forEach(function(d,i){
          var nump= area*d[1];
          var cont=0;
          var cor= colorD(d[0]);
          for (var i=0; i < nump; i++) {
            var p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(p, L.geoJSON(layer.toGeoJSON()), true).length > 0) {

              var markerCircle=L.circleMarker(p, {radius: 4, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer});
              markerCircle.bindPopup(" "+d[0]);
              dots.push(markerCircle);
            }
          }
        });
  }});
  pontos = L.layerGroup(dots);
  pontos.addTo(mapVis03);
  infoVis03.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoVis03.addTo(mapVis03);
}

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWRjbGV5OTQ1MiIsImEiOiJjamdvMGdmZ2owaTdiMndwYTJyM2tteTl2In0.2q25nBNRxzFxeaYahFGQ6g'
}).addTo(mapVis04);

var infoVis04=L.control();
infoVis04.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
var legendVis04 = L.control({position: 'bottomright'});
legendVis04.onAdd = function (mapMedia) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorM(grades[i])+'; background:'+colorM(grades[i])+'"></i>'+grades[i]+'</br>';
  }
  return div;
};
legendVis04.addTo(mapVis04);

function Vis04TutorialFunction(dados){
  var maximo=0;
  if(layerTuto4!= null){
    layerTuto4.clearLayers();
  }
  layerTuto4= L.geoJson(dados,
    {style: function(feature){
      //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      if(mesmedia!=undefined){
            var distdataMes=[];
            database.forEach(function(d,i){
              if (d.name==feature.properties.name && d.Mês==mesmedia){
                  distdataMes.push(SomaDias(d));
              }
            });
            var probArea= new distribuicaoTeste(distdataMes,0);
      }else{
        var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
      }
      var media= probArea.media().toFixed(2);
      if(opcoes.includes(feature.properties.name)){
        return {
          weight: 3.0,
          opacity: 1,
          fillColor: colorM(media),
          dashArray: '3',
          color: 'blue',
          fillOpacity: 0.9
        };
      }else{      
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorM(media),
            color: 'black',
            fillOpacity: 0.9
        };
      }

      },onEachFeature: function (feature, layer) {
          //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(mesmedia!=undefined){
            var distdataMes=[];
            database.forEach(function(d,i){
              if (d.name==feature.properties.name && d.Mês==mesmedia){
                  distdataMes.push(SomaDias(d));
              }
            });
            var probArea= new distribuicaoTeste(distdataMes,0);
          }else{
            var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          }
          var media= probArea.media().toFixed(2);
          layer.bindPopup(""+feature.properties.name+": "+media);
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              LayerMedia.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(mapVis04);
  if(mesmedia!=undefined){
    infoVis04.update = function (props) {
      this._div.innerHTML= '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o mês de '+mesmedia+' no período.');
    }
  }else{
    infoVis04.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoVis04.addTo(mapVis04);
}