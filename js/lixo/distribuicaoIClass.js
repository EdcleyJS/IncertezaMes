class distribuicaoIntervalo {
  constructor(feature,left,right) {
    this.feature=feature;
    this.left=left;
    this.right=right;
    this.dist= distrib(feature);
    this.dist= this.dist.sort(function(a, b){return a - b});
    this.cdfintervalo= function cdfintervalo(){
                var prob= (d3.bisectRight(this.dist, right) - d3.bisectLeft(this.dist, left))/this.dist.length;
                return prob;
              };
    this.media= function media(){
      var sum=0;
      this.dist.forEach(function(d,i){
        sum+=Number(d);
      });
      var media= sum/this.dist.length;
      return media;
    };
    this.variancia= function variancia(){
      var sum=0,aux;
      this.dist.forEach(function(d,i){
        sum+=Number(d);
      });
      var media= sum/this.dist.length;
      sum=0;
      this.dist.forEach(function(d,i){
        aux= Number(d- media);
        aux= aux*aux;
        sum+= aux;
      });
      var variancia= sum/this.dist.length;
      return variancia;
    };
    this.desvio = function desviopadrao(){
      var sum=0,aux;
      this.dist.forEach(function(d,i){
        sum+=Number(d);
      });
      var media= sum/this.dist.length;
      sum=0;
      this.dist.forEach(function(d,i){
        aux= Number(d- media);
        aux= aux*aux;
        sum+= aux;
      });
      var variancia= sum/this.dist.length;
      return Math.sqrt(variancia);
    };
  }
}