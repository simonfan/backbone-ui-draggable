//     BackboneUiDraggable
//     (c) simonfan
//     BackboneUiDraggable is licensed under the MIT terms.

define("backbone-ui-draggable",["require","exports","module","model-dock","jquery"],function(e,t,i){{var a=e("model-dock");e("jquery"),i.exports=a.extend({initialize:function(e){this.initializeModelDock(e)},initializeUIDraggable:function(){},map:{left:["->css:left",'[data-attribute="left"]'],top:["->css:top",'[data-attribute="top"]']}})}});