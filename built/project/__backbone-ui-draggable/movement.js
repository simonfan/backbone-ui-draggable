define(["require","exports","module","lodash","./helpers"],function(e,t,n){var r=e("lodash"),i=e("./helpers");t.xAllowedDelta=function(t){var n=this.model,r=parseFloat(n.get("left")),s=r+t,o=parseFloat(this.$el.width()),u=parseFloat(n.get("minLeft")),a=parseFloat(n.get("minRight")),f=i.max(u,a-o),l=parseFloat(n.get("maxLeft")),c=parseFloat(n.get("maxRight")),p=i.min(l,c-o),d=i.fitValueWithin(s,f,p);return d-r},t.moveX=function(t,n){if(t){n=n||{};if(this.axis.indexOf("x")===-1)return t;var i=this.model,s=n.force?t:this.xAllowedDelta(t);i.set("left",parseFloat(i.get("left"))+s),i.set(this.valueAttribute,this.toValue(i));if(!n.silent&&s!==0){var o=r.assign({axis:"x",delta:s,direction:s>0?"right":"left"},n);this.trigger("move",this,o).trigger("move-x",this,o)}return t-s}return 0},t.yAllowedDelta=function(t){var n=this.model,r=parseFloat(n.get("top")),s=r+t,o=parseFloat(this.$el.height()),u=parseFloat(n.get("minTop")),a=parseFloat(n.get("minBottom")),f=i.max(u,a-o),l=parseFloat(n.get("maxTop")),c=parseFloat(n.get("maxBottom")),p=i.min(l,c-o),d=i.fitValueWithin(s,f,p);return d-r},t.moveY=function(t,n){if(t){n=n||{};if(this.axis.indexOf("y")===-1)return t;var i=this.model,s=this.yAllowedDelta(t);i.set("top",parseFloat(i.get("top"))+s),i.set(this.valueAttribute,this.toValue(i));if(!n.silent&&s!==0){var o=r.assign({axis:"y",delta:s,direction:s>0?"bottom":"top"},n);this.trigger("move",this,o).trigger("move-y",this,o)}return t-s}return 0},t.moveToLeft=function(t,n){return-1*this.moveX(-1*t,n)},t.moveToRight=function(t,n){return this.moveX(t,n)},t.moveToTop=function(t,n){return-1*this.moveY(-1*t,n)},t.moveToBottom=function(t,n){return this.moveY(t,n)}});