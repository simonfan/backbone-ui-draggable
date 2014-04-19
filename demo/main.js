define(['backbone-ui-draggable', 'jquery', 'backbone', 'model-dock', 'jquery-ui', './square-model.js', './limits.js'],

function (draggable            ,  $      ,  Backbone ,  modelDock  , undefined  ,  squareModel    ,  limits   ) {


	// the draggable objet
	var d = window.d = draggable({
		el: $('#draggable'),

		map: {
			left: ['->css:left', '[data-attribute="left"]'],
			top: ['->css:top', '[data-attribute="top"]'],
			status: '[data-attribute="status"]',
			value: '[data-attribute="value"]',
		},

		model: squareModel
	});

	// listen for some complex position
	d.when({
		left: {
			$gt: 200,
			$lt: 320
		},

		top: {
			$gt: 0,
			$lt: 255
		}
	}, function (draggable) {

		var top = draggable.model.get('top'),
			inverse = 255 - top;

		draggable.$el.css('background-color', 'rgb(255,' + parseInt(top, 10) + ',' + parseInt(inverse, 10) + ')');

	})



	// jquery-ui comparative
	$('#jq-draggable').draggable({
		containment: 'parent'
	})



	// draggable enabling contrl
	var control = $('#draggable-status').change(function (e) {

		var status = $('#draggable-status').val();

		if (status === 'enabled') {
			d.enable();
		} else {
			d.disable();
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
