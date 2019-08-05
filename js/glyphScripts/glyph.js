var map = L.map('vis6').setView([-8.305448,-37.822426], 8);
var florestaPolygon = turf.polygon([[ [ -38.178669080213865, -8.27666562941522 ], [ -38.194242008761648, -8.318607237933634 ], [ -38.167760598772588, -8.397873425518128 ], [ -38.082106653499238, -8.421132233665617 ], [ -38.046427403901532, -8.456592281608437 ], [ -38.022388760333001, -8.45023140375622 ], [ -37.966651228771127, -8.458582453417421 ], [ -37.930649775466748, -8.438270703829858 ], [ -37.894040435317777, -8.392876510742326 ], [ -37.871842733655171, -8.407577559157005 ], [ -37.801372029895219, -8.372898409633875 ], [ -37.787705648796589, -8.413513898547535 ], [ -37.852922570720011, -8.594982429395543 ], [ -37.932037251318036, -8.617625585052679 ], [ -37.975094824966163, -8.657535727591721 ], [ -38.024733524032847, -8.652310121514859 ], [ -38.065455416234443, -8.684415957230613 ], [ -38.153628779844261, -8.695844462651792 ], [ -38.190323481843166, -8.676924002041005 ], [ -38.259873603583912, -8.707893413949876 ], [ -38.268789966183931, -8.753862222563498 ], [ -38.305306778684837, -8.754417647456421 ], [ -38.374533208340836, -8.78992522996532 ], [ -38.457484608128141, -8.840667219116824 ], [ -38.46980712060207, -8.86574227558549 ], [ -38.512406703706347, -8.830585950281316 ], [ -38.570428631076425, -8.830369085964492 ], [ -38.607585714109341, -8.893264037505276 ], [ -38.61027693892953, -8.957328346026316 ], [ -38.635376999249047, -8.986729251253905 ], [ -38.674382300602645, -8.971756387247408 ], [ -38.693628089164918, -8.918704407582311 ], [ -38.662098593874987, -8.898494845260871 ], [ -38.663738217144953, -8.806613105610268 ], [ -38.652628549268108, -8.728678370610281 ], [ -38.629464065614115, -8.683715765769932 ], [ -38.629016407381243, -8.621084180690332 ], [ -38.549452400307985, -8.288317969798412 ], [ -38.499520604991858, -8.320193811994784 ], [ -38.517425909078376, -8.400506571221229 ], [ -38.51501390936437, -8.438503593166217 ], [ -38.468979912492898, -8.402003408230655 ], [ -38.44992801236782, -8.367120861738329 ], [ -38.417533358477669, -8.341517413098074 ], [ -38.40660956787724, -8.305795862988646 ], [ -38.367676348084956, -8.280788079406307 ], [ -38.314321450674356, -8.291694394380727 ], [ -38.264809502056835, -8.253908663653872 ], [ -38.206693885114646, -8.285449582132458 ], [ -38.178669080213865, -8.27666562941522 ] ] ]);
var petrolandiaPolygon = turf.polygon([[ [ -38.065455416234443, -8.684415957230613 ], [ -38.236109804523835, -8.855458314849329 ], [ -38.214266521182935, -8.887408081317858 ], [ -38.205605722526059, -8.950048730664319 ], [ -38.21256696259519, -8.979555709128645 ], [ -38.204986892730858, -9.103970844678713 ], [ -38.312873328141563, -9.148366728241854 ], [ -38.326185463588217, -9.080956265419275 ], [ -38.289675737745085, -9.036333954148631 ], [ -38.323540025052068, -8.99000918487593 ], [ -38.362441818934769, -9.000941238447353 ], [ -38.403515304687517, -9.037233152088277 ], [ -38.449099651327799, -9.026358847582685 ], [ -38.503512718037484, -8.981411130119511 ], [ -38.519811095505588, -8.94758278511739 ], [ -38.479318185086129, -8.901743715400073 ], [ -38.46980712060207, -8.86574227558549 ], [ -38.457484608128141, -8.840667219116824 ], [ -38.374533208340836, -8.78992522996532 ], [ -38.305306778684837, -8.754417647456421 ], [ -38.268789966183931, -8.753862222563498 ], [ -38.259873603583912, -8.707893413949876 ], [ -38.190323481843166, -8.676924002041005 ], [ -38.153628779844261, -8.695844462651792 ], [ -38.065455416234443, -8.684415957230613 ] ]]);
var ibimirim = turf.polygon([[[-37.368543093289077, -8.418407570253123 ], [ -37.390514421203534, -8.510886192643625 ], [ -37.411686848968884, -8.814909184211444 ], [ -37.470805728001892, -8.78375406499805 ], [ -37.556047219003915, -8.81976987597892 ], [ -37.592306055579968, -8.832492711769191 ], [ -37.652813658723346, -8.788344743415109 ], [ -37.658567514878882, -8.730792294528726 ], [ -37.671203171289278, -8.714587175857446 ], [ -37.754240146965174, -8.709783527187994 ], [ -37.804479971773219, -8.69362505365325 ], [ -37.853783407178462, -8.695646382474536 ], [ -37.88221183500815, -8.669186309800295 ], [ -37.852922570720011, -8.594982429395543 ], [ -37.787705648796589, -8.413513898547535 ], [ -37.691216997066704, -8.395519532800165 ], [ -37.599383908040863, -8.31815060266814 ], [ -37.618735878657844, -8.368299919705464 ], [ -37.619175779338718, -8.412932415798309 ], [ -37.580131478884596, -8.404745125487125 ], [ -37.539771027810609, -8.43117914839894 ], [ -37.434791348741726, -8.455079891723585 ], [ -37.383501155353997, -8.413325326902282 ], [ -37.368543093289077, -8.418407570253123]]]);

var cidades=[];
var filterbymouth,filterbytri,featurename,GeoLayer,marker,interOn,pontos;
var mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado;
var markers = L.layerGroup();
var medias=[],lat,lng,intensity,alpha=0,left=60,right=100,database;
var myRenderer = L.canvas({ padding: 0.5 });
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

d3.json("./data/dados.json",function(error,data){
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
});

//Escala de cores para o mapa
function colorN(d){
  var cbf = palette('cb-RdYlGn', 11);
  cbf.reverse();
  for (var i =10; i>=0 ; i--) {
    if(d>(0.09*i)){
      return cbf[i];
    }else if(d==0){
      return cbf[0];
    }
  }
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
var info = L.control();
info.onAdd = function (mymap) {
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
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  for (var i = 11; i > 0; i--) {
    grades.push(0.09*i);
  }
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="color:#'+colorN(grades[i])+'; background:#'+colorN(grades[i])+'"></i>'+">"+grades[i].toFixed(2) +'</br>';
  }
  return div;
};
legend.addTo(map);