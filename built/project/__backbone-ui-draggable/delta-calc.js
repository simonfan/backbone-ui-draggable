define(["require","exports","module","lodash","./helpers"],function(e,t,n){var r=e("lodash"),i=e("./helpers"),s=parseFloat;t.xAllowedDelta=function(t){var n=this.modeld,r=s(n.get("left")),o=r+s(t),u=s(this.$el.width()),a=s(n.get("minLeft")),f=s(n.get("minRight")),l=i.max(a,f-u),c=s(n.get("maxLeft")),p=s(n.get("maxRight")),d=i.min(c,p-u),v=i.fitValueWithin(o,l,d);return v-r},t.yAllowedDelta=function(t){var n=this.modeld,r=s(n.get("top")),o=r+s(t),u=s(this.$el.height()),a=s(n.get("minTop")),f=s(n.get("minBottom")),l=i.max(a,f-u),c=s(n.get("maxTop")),p=s(n.get("maxBottom")),d=i.min(c,p-u),v=i.fitValueWithin(o,l,d);return v-r}});