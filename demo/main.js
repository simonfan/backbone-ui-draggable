define(['backbone-ui-draggable', 'jquery', 'backbone', 'model-dock', 'jquery-ui'],

function (draggable            ,  $      ,  Backbone ,  modelDock  , undefined  ) {


	// the draggable objet
	var d = window.d = draggable({
		el: $('#draggable'),

		map: {
			left: ['->css:left', '[data-attribute="left"]'],
			top: ['->css:top', '[data-attribute="top"]'],
			status: '[data-attribute="status"]',
			value: '[data-attribute="value"]',
		},

		model: new Backbone.Model({
			minX: 20,
			maxX: 1000,

			minY: -40,
			maxY: 300
		})
	});



	// jquery-ui comparative
	$('#jq-draggable').draggable({
		containment: 'parent'
	})



	// draggable event display


	var eventDisplay = modelDock.extend({
		initialize: function initialize(options) {
			modelDock.prototype.initialize.call(this, options);

			this.listenTo(options.draggable, 'move', function (draggable, eventData) {

				this.model.set(eventData);

			}, this);
		},
	})


	var e = eventDisplay({

		draggable: d,

		el: $('#event-data'),

		map: {
			axis: '[data-attribute="axis"]',
			delta: '[data-attribute="delta"]',
			direction: '[data-attribute="direction"]'
		}
	});

});
