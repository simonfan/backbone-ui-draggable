define(["require","exports","module"],function(e,t,n){t.min=function(t,n){return isNaN(t)?n:isNaN(n)?t:t<n?t:n},t.max=function(t,n){return isNaN(t)?n:isNaN(n)?t:t>n?t:n},t.fitValueWithin=function(t,n,r){return isNaN(n)||(t=t>n?t:n),isNaN(r)||(t=t<r?t:r),t},t.numberify=function(t){return parseInt(t,10)}});