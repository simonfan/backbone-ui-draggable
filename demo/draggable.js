define(['backbone-ui-draggable', 'jquery', './square-model.js'],

function (draggable            ,  $      ,  squareModel       ) {


	var dragg = draggable.extend({


		map: {
			left: ['->css:left', '[data-attribute="left"]'],
			top: ['->css:top', '[data-attribute="top"]'],
			'draggableStatus': '[data-attribute="draggableStatus"]',
		},

		beforeMoveY: function (delta) {}
	});


	// the draggable objet
	var d = window.d = dragg({
		el: $('#draggable'),

		model: squareModel
	});

	return d;

});
