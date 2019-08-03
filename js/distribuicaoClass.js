class distribuicao {
  constructor(feature,alpha) {
    this.feature=feature;
    this.alpha=alpha;
    this.dist= distrib(feature);
    this.dist= this.dist.sort(function(a, b){return a - b});
    this.cdf= function cdf(){
                var prob= d3.bisectRight(this.dist, alpha)/this.dist.length;
                return prob;
              }
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
    }
  }
}