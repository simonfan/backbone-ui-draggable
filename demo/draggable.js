define(['backbone-ui-draggable', 'jquery', './square-model.js'],

function (draggable            ,  $      ,  squareModel       ) {


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

	});


	return d;

});
