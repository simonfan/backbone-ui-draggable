define(['backbone-ui-draggable', 'jquery'], function (draggable, $) {
	draggable({
		el: $('#draggable'),

		map: {
			left: ['->css:left', '[data-attribute="left"]'],
			top: ['->css:top', '[data-attribute="top"]'],
			status: '[data-attribute="status"]',
			value: '[data-attribute="value"]',
		}
	});

	$('#jq-draggable').draggable({
		containment: 'parent'
	});
});
