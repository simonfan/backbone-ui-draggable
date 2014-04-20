define(['jquery', 'jquery-ui', './limits.js', './draggable.js', 'model-dock'],

function ($     ,  undefined  , limits      ,  d              , modelDock   ) {




	// jquery-ui comparative
	$('#jq-draggable').draggable({
		containment: 'parent'
	})



	// draggable enabling contrl
	var control = $('#draggable-status').change(function (e) {

		var status = $('#draggable-status').val();

		if (status === 'enabled') {
			d.enableDraggable();
		} else {
			d.disableDraggable();
		}

	});

	// animation control
	var animationControl = $('#animate').click(function () {
		var top = $('#animation-top').val(),
			left = $('#animation-left').val();

		d.animate({
			top: top,
			left: left
		}, 400);
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
