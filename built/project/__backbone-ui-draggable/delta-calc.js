define(["require","exports","module","lodash","./helpers"],function(e,t,n){var r=e("lodash"),i=e("./helpers");t.xAllowedDelta=function(t){var n=this.model,r=parseFloat(n.get("left")),s=r+t,o=parseFloat(this.$el.width()),u=parseFloat(n.get("minLeft")),a=parseFloat(n.get("minRight")),f=i.max(u,a-o),l=parseFloat(n.get("maxLeft")),c=parseFloat(n.get("maxRight")),p=i.min(l,c-o),d=i.fitValueWithin(s,f,p);return d-r},t.yAllowedDelta=function(t){var n=this.model,r=parseFloat(n.get("top")),s=r+t,o=parseFloat(this.$el.height()),u=parseFloat(n.get("minTop")),a=parseFloat(n.get("minBottom")),f=i.max(u,a-o),l=parseFloat(n.get("maxTop")),c=parseFloat(n.get("maxBottom")),p=i.min(l,c-o),d=i.fitValueWithin(s,f,p);return d-r}});