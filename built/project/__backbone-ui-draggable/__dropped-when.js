define(["require","exports","module","object-query"],function(e,t,n){var r=e("object-query");n.exports=function(t,n,i){var s=r(t),o=this.model;console.log(t),o.on("change",function(){console.log(s(o.toJSON())),console.log(o.toJSON()),s(o.toJSON())&&n.apply(i,[this])},this)}});