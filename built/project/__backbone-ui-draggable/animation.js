define(["require","exports","module","lodash"],function(e,t,n){var r=e("lodash");t.animateX=function(t,n){var i=this.xAllowedDelta(t);n=n||{},n=r.isObject(n)?n:{duration:arguments[1],easing:arguments[2],complete:arguments[3]};var s=this.$el.position().left;return n.step=r.bind(function(e,t){this.moveX(e-s,{force:!0}),s=e},this),this.$el.animate({left:+this.model.get("left")+i},n),t-i},t.animateY=function(t,n){var i=this.yAllowedDelta(t);n=n||{},n=r.isObject(n)?n:{duration:arguments[1],easing:arguments[2],complete:arguments[3]};var s=this.$el.position().top;return n.step=r.bind(function(e,t){this.moveY(e-s,{force:!0}),s=e},this),this.$el.animate({top:+this.model.get("top")+i},n),t-i},t.animateToLeft=function(t,n){return-1*this.animateX(-1*t,n)},t.animateToRight=function(t,n){return this.animateX(t,n)},t.animateToTop=function(t,n){return-1*this.animateY(-1*t,n)},t.animateToBottom=function(t,n){return this.animateY(t,n)}});