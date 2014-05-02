define(['jquery', 'jquery-ui', './limits.js', './draggable.js', 'bb-model-view'],

function ($     ,  undefined  , limits      ,  d              , modelView   ) {




	// jquery-ui comparative
	$('#jq-draggable').draggable({
		containment: 'parent'
	})

	// animation control
	$('#animate-y').click(function () {
		var delta = $('#animation').val();

		d.animateY(delta);
	});

	$('#animate-x').click(function () {
		var delta = $('#animation').val();

		d.animateX(delta);
	});



	// draggable event display


	var eventDisplay = modelView.extend({
		initialize: function initialize(options) {
			modelView.prototype.initialize.call(this, options);

			this.listenTo(options.draggable, 'move', function (draggable, eventData) {

				this.modeld.set(eventData);

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
