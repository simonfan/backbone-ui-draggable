define(['backbone-ui-draggable', 'jquery', 'backbone'], function (draggable, $, Backbone) {
	draggable({
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
});
